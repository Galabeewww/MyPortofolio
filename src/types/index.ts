// TypeScript Type Definitions for MyPortofolio App

export interface ProjectImage {
  id: string;
  url: string;
  is_cover?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  full_description?: string;
  category: string;
  tech: string[] | string;
  features?: string[] | string;
  live_link?: string;
  github_link?: string;
  cover_image?: string;
  images?: ProjectImage[];
  created_at: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  logo_url?: string;
  logo?: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  period: string;
  start_date?: string;
  end_date?: string;
  is_present?: boolean;
  responsibilities?: string[] | string;
  tech?: string[] | string;
  created_at?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email?: string;
}
