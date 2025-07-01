export interface YogaCategory {
  id: number;
  name: string;
  description: string;
}

export interface YogaDifficulty {
  id: number;
  level: string;
}

export interface YogaPose {
  id: number;
  english_name: string;
  sanskrit_name_adapted: string;
  sanskrit_name: string;
  translation_name: string;
  description: string;
  benefits: string;
  images: {
    svg: string;
    png: string;
    svg_alt: string;
  };
  categories: YogaCategory[];
  difficulties: YogaDifficulty[];
}

export interface YogaDatabase {
  metadata: {
    total_poses: number;
    total_categories: number;
    total_difficulties: number;
    description: string;
  };
  categories: YogaCategory[];
  difficulties: YogaDifficulty[];
  poses: YogaPose[];
}

export interface FilterState {
  categories: number[];
  difficulties: number[];
}
