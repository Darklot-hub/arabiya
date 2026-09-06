export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export type Goal = "conversation" | "business" | "travel" | "it" | "reading";
export type SkillName = "vocabulary" | "grammar" | "reading" | "listening" | "writing" | "speaking";

export interface SkillAssessment {
  score: number;
  answered: number;
  estimatedLevel: Level;
}

export interface User {
  id: string;
  name: string;
  email: string;
  level?: Level;
  goal?: Goal;
  progress: number;
}
export interface DiagnosticResult {
  estimatedLevel: Level;
  skills: Record<SkillName, SkillAssessment>;
  total: number;
}

export interface Lesson {
  _id: string;
  title: string;
  level: Level;
  goal: Goal;
  description: string;
  content: string;
  module: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Club {
  _id: string;
  title: string;
  type: "speaking" | "reading";
  description: string;
  schedule: string;
}
export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
}

export interface DiagnosticQuestion {
  id: string;
  skill: SkillName;
  prompt: string;
  options?: string[];
  type?: "choice" | "text";
  answer?: string;
  acceptedKeywords?: string[];
  minWords?: number;
  level?: Level;
  points?: number;
}
