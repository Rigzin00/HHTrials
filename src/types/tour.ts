export interface TourBaseInput {
  title: string;
  description?: string;
  region: string;
  types: string[];
  season: string;
  durationDays: number;
  durationNights: number;
  photoUrl: string;
  isCustom?: boolean;
}

export interface Tour extends TourBaseInput {
  id: string;
  isCustom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ToursListData {
  tours: Tour[];
  pagination: Pagination;
}

export interface TourResponseData {
  tour: Tour;
}
