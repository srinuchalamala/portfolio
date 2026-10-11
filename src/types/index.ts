export type RoleType = 'admin' | 'editor';

export interface UserProfile {
  uid: string;
  email: string;
  role: RoleType;
  displayName?: string;
  photoURL?: string;
}

export interface Profile {
  id?: string;
  name: string;
  headline: string;
  subheadline: string;
  bio: string;
  shortBio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  whatsapp: string;
  resumeUrl: string;
  avatarUrl: string;
  statusBadge: string;
  yearsOfExperience: string;
  securitySpecialization: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: 'Full-Stack' | 'Cybersecurity' | 'Networking' | 'Open Source';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featuredImage: string;
  gallery?: string[];
  status: 'Completed' | 'In Progress' | 'Production';
  role: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  features?: string[];
  featured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl?: string;
  certificateImage: string;
  description: string;
  skills: string[];
  category: 'Cybersecurity' | 'Network Security' | 'Cloud & Systems' | 'Software Engineering';
  featured: boolean;
  sortOrder: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Apprenticeship' | 'Self-employed';
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  active: boolean;
  sortOrder: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  boardOrUniversity: string;
  score: string;
  scoreType: 'GPA' | 'Marks' | 'Percentage';
  startYear: string;
  endYear: string;
  current: boolean;
  details?: string;
  sortOrder: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category:
    | 'Programming'
    | 'Web Development'
    | 'Database & Cloud'
    | 'Tools & Platforms'
    | 'Cybersecurity & Networks'
    | 'Operating Systems'
    | 'Soft Skills'
    | 'Prompt Engineering';
  icon?: string;
  proficiencyLabel?: string;
  featured: boolean;
  sortOrder: number;
}

export interface Organization {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
  sortOrder: number;
}

export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  sortOrder: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  mediaUrl: string;
  resourceType: 'image' | 'video' | 'document';
  category: string;
  tags?: string[];
  featured: boolean;
  sortOrder: number;
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority?: 'normal' | 'high';
  notes?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  email: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  timestamp: string;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  whatsappNumber: string;
  whatsappPrefillMessage: string;
  maintenanceMode: boolean;
  sectionsVisibility: {
    hero: boolean;
    about: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    certifications: boolean;
    organizations: boolean;
    interests: boolean;
    gallery: boolean;
    resume: boolean;
    contact: boolean;
  };
  themePreference: 'dark' | 'light' | 'system';
  updatedAt?: string;
}
