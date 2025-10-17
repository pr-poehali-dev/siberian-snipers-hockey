export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  goals: number;
  assists: number;
  games_played: number;
  image: string;
  is_captain: boolean;
  is_assistant: boolean;
  height?: string;
  weight?: string;
  birth_date?: string;
  nationality?: string;
}

export interface Match {
  id: number;
  date: string;
  opponent: string;
  is_home: boolean;
  score: string;
  status: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
}

export interface Stream {
  id: number;
  match_id?: number;
  title: string;
  stream_url: string;
  status: string;
  scheduled_time: string;
  thumbnail?: string;
}

export interface Standing {
  id: number;
  place: number;
  team: string;
  games: number;
  wins: number;
  losses: number;
  points: number;
  logo?: string;
}

export const API_URL = "https://functions.poehali.dev/90140830-0c8d-4493-bfe2-be85f46b2961";