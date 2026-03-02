export interface HomeTour {
  id: string;
  title: string;
  description: string | null;
  region: string;
  types: string[];
  season: string;
  durationDays: number;
  durationNights: number;
  photoUrl: string | null;
  isCustom: boolean;
  isDescriptionFilled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HomeSearchResult {
  dayCount: number;
  destination: string;
  tours: HomeTour[];
}
