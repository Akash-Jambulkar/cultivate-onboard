export interface Document {
  id: string;
  name: string;
  category: string;
  status: "verified" | "pending" | "required";
  uploadedAt: string | null;
  fileName?: string;
  fileSize?: number;
}

export interface FeedbackItem {
  id: string;
  type: "manager" | "hr" | "anonymous";
  content: string;
  sentiment: "positive" | "neutral" | "negative";
  isAnonymous: boolean;
  createdAt: string;
  authorName?: string;
}

export interface Story {
  id: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  content: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  createdAt: string;
}

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  verified: boolean;
}
