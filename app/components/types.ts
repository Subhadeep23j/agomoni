export type Track = {
  id: string;
  title: string;
  artist: string;
  film?: string;
  year?: number;
  duration?: number;
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  subtitle: string;
  tracks: Track[];
};

export type PlaybackState =
  | "idle"
  | "loading"
  | "playing"
  | "paused"
  | "buffering"
  | "error";
