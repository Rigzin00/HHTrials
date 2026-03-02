import { apiClient } from './apiClient';
import type { HomeTour, HomeSearchResult } from '../types/home';

export const homeService = {
  async search(from: string, to: string, destination: string): Promise<HomeSearchResult> {
    const params = new URLSearchParams({ from, to, destination });
    const res = await apiClient.get<{ success: boolean; data: HomeSearchResult }>(
      `/home/search?${params}`
    );
    return res.data;
  },

  async recommended(): Promise<HomeTour[]> {
    const res = await apiClient.get<{ success: boolean; data: { tours: HomeTour[] } }>(
      '/home/recommended'
    );
    return res.data.tours;
  },
};
