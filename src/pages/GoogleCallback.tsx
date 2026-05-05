import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../utils/storage';
import { supabase } from '../lib/supabaseClient';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * Google OAuth Callback Page
 * Handles the redirect from Supabase OAuth flow.
 *
 * Why we don't read window.location.hash directly:
 * The Supabase client (detectSessionInUrl: true by default) immediately parses
 * the OAuth hash on initialization and clears it via history.replaceState before
 * React's useEffect fires.  We therefore ask Supabase for the already-processed
 * session instead of re-parsing the (now-empty) hash.
 */
export default function GoogleCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for an error in the hash/query before Supabase clears it.
        // We capture it synchronously at render time to survive the replaceState.
        const rawHash = new URLSearchParams(window.location.hash.substring(1));
        const rawQuery = new URLSearchParams(window.location.search);
        const errorParam = rawHash.get('error') ?? rawQuery.get('error');
        const errorDescription = rawHash.get('error_description') ?? rawQuery.get('error_description');

        if (errorParam) {
          throw new Error(errorDescription || errorParam);
        }

        // Supabase parses the OAuth hash asynchronously during initialisation
        // (detectSessionInUrl: true). If it hasn't finished yet, wait up to 5 s
        // for the SIGNED_IN event before giving up.
        let supabaseSession = (await supabase.auth.getSession()).data?.session;

        if (!supabaseSession) {
          supabaseSession = await new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(null), 5000);
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
              if (event === 'SIGNED_IN' && session) {
                clearTimeout(timeout);
                subscription.unsubscribe();
                resolve(session);
              }
            });
          });
        }

        if (!supabaseSession?.access_token || !supabaseSession?.refresh_token) {
          throw new Error('No authentication tokens received');
        }

        const { access_token: accessToken, refresh_token: refreshToken, expires_in, expires_at } = supabaseSession;

        console.log('Supabase OAuth tokens received, extracting user info...');

        // Decode Supabase JWT to get user info (already verified by Supabase)
        const payload = JSON.parse(atob(accessToken.split('.')[1]));

        const user = {
          id: payload.sub,
          email: payload.email,
          fullName: payload.user_metadata?.full_name || payload.user_metadata?.name,
          avatar: payload.user_metadata?.avatar_url || payload.user_metadata?.picture,
          emailVerified: payload.user_metadata?.email_verified,
        };

        const session = {
          accessToken,
          refreshToken,
          expiresIn: expires_in ?? 3600,
          expiresAt: expires_at ?? Math.floor(Date.now() / 1000) + 3600,
        };

        // Store session (no need to call backend - already authenticated)
        storageService.setSession(session, user);

        console.log('Successfully authenticated with Google!', user);

        // Get the return URL or default to home
        const returnUrl = sessionStorage.getItem('google_auth_return') || '/';
        sessionStorage.removeItem('google_auth_return');

        // Redirect back with full reload to initialize auth context
        window.location.href = returnUrl;
      } catch (err) {
        console.error('Google auth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');

        // Redirect to home after a delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Authentication Failed
              </h2>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#2b1b14] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing sign in...
        </h2>
        <p className="text-sm text-gray-600">
          Verifying your account with our server...
        </p>
      </div>
    </div>
  );
}
