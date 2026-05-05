import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { storageService } from '../utils/storage';
import { supabase } from '../lib/supabaseClient';
import type { User, SignUpRequest, SignInRequest, GoogleAuthRequest } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (data: SignUpRequest) => Promise<void>;
  signIn: (data: SignInRequest) => Promise<void>;
  signInWithGoogle: (data: GoogleAuthRequest) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage and listen for Supabase OAuth callbacks
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          try {
            // Try to get current user from API
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch {
            // API call failed (e.g. after Google OAuth the stored token may be a
            // Supabase JWT that the custom backend doesn't recognise). Fall back
            // to the user data stored locally during the OAuth callback.
            const storedUser = authService.getStoredUser();
            if (storedUser) {
              setUser(storedUser);
            } else {
              await authService.signOut();
              setUser(null);
            }
          }
        } else {
          // Try to get stored user
          const storedUser = authService.getStoredUser();
          if (storedUser) {
            setUser(storedUser);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // If auth fails, clear any stored data
        await authService.signOut();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen for Supabase auth events (handles OAuth redirects that land on any page)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          const { access_token: accessToken, refresh_token: refreshToken, expires_in, expires_at } = session;

          // Decode JWT to extract user info
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          const supabaseUser: User = {
            id: payload.sub,
            email: payload.email,
            fullName: payload.user_metadata?.full_name || payload.user_metadata?.name || '',
            avatar: payload.user_metadata?.avatar_url || payload.user_metadata?.picture,
            emailVerified: payload.user_metadata?.email_verified,
          };

          // Persist session to storage
          storageService.setSession(
            {
              accessToken,
              refreshToken: refreshToken ?? '',
              expiresIn: expires_in ?? 3600,
              expiresAt: expires_at ?? Math.floor(Date.now() / 1000) + 3600,
            },
            supabaseUser
          );

          setUser(supabaseUser);
          setIsLoading(false);

          // Clean up the OAuth hash/query from the URL without a page reload
          if (window.location.hash.includes('access_token') || window.location.search.includes('access_token')) {
            const returnUrl = sessionStorage.getItem('google_auth_return') || '/';
            sessionStorage.removeItem('google_auth_return');
            window.history.replaceState(null, '', returnUrl);
          }
        } catch (err) {
          console.error('Failed to process Supabase SIGNED_IN event:', err);
        }
      } else if (event === 'SIGNED_OUT') {
        storageService.clearSession();
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (data: SignUpRequest) => {
    const response = await authService.signUp(data);
    setUser(response.user);
  }, []);

  const signIn = useCallback(async (data: SignInRequest) => {
    const response = await authService.signIn(data);
    setUser(response.user);
  }, []);

  const signInWithGoogle = useCallback(async (data: GoogleAuthRequest) => {
    const response = await authService.signInWithGoogle(data);
    setUser(response.user);
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
