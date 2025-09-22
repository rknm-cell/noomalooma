export interface PlayMoment {
  id: string;
  timestamp: Date;
  text: string;
  emoji: string;
  color: string;
  mood: string;
  tags: string[];
}

export type ViewType = 'logging' | 'play-log';

export interface FloatingCloudOption {
  value: string;
  label: string;
  emoji?: string;
}
