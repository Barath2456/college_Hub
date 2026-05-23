export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  placementPercentage: number;
  image: string;
  type: string;
  established: number;
  accreditation: string;
  courses: Course[];
  placements: PlacementStats;
  reviews: Review[];
  description: string;
}

export interface Course {
  name: string;
  duration: string;
  fees: number;
  seats: number;
}

export interface PlacementStats {
  averagePackage: number;
  highestPackage: number;
  topRecruiters: string[];
  year: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type LocationOption = {
  value: string;
  label: string;
};

export type FeesRangeOption = {
  value: string;
  label: string;
  min: number;
  max: number | null;
};
