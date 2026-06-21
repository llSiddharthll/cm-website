"use client";

import {
  Settings, Sparkles, BookOpen, Star, MapPin, PanelBottom, LayoutGrid,
  FolderTree, Grid3x3, Briefcase, Film, Clapperboard, Newspaper, Users,
  BriefcaseBusiness, MessageSquareQuote, HelpCircle, Building2, Gem,
  ListOrdered, BarChart3, Wallet, Trophy, Wrench, BadgeCheck, Megaphone,
  HeartHandshake, Inbox, Mail, FileText, LayoutPanelTop, Circle, type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Settings, Sparkles, BookOpen, Star, MapPin, PanelBottom, LayoutGrid,
  FolderTree, Grid3x3, Briefcase, Film, Clapperboard, Newspaper, Users,
  BriefcaseBusiness, MessageSquareQuote, HelpCircle, Building2, Gem,
  ListOrdered, BarChart3, Wallet, Trophy, Wrench, BadgeCheck, Megaphone,
  HeartHandshake, Inbox, Mail, FileText, LayoutPanelTop,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = MAP[name] || Circle;
  return <Cmp className={className} />;
}
