export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'live' | 'development' | 'planned';
  url?: string;
  fullDescription?: string;
  features?: string[];
  team?: TeamMember[];
  screenshots?: Screenshot[];
  technologies?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Screenshot {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
}