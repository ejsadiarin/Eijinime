import { IAnimeInfo, ITitle, IAnimeEpisode } from "@consumet/extensions";
// NOTE: IAnimeInfo extends IAnimeResult

export type AnimeInfo = IAnimeInfo & {
  id: string;
  title: string | ITitle;
  url?: string;
  image?: string;
  cover?: string;
  rating?: number;
  releaseDate?: string;
  genres?: string[];
  description?: string;
  episodes?: IAnimeEpisode[];
  episodeNumber?: number;
};

export type EpisodeInfo = IAnimeInfo & {
  id: string;
  episodeId?: string;
  episodeNumber?: number;
  title: string | ITitle;
  image?: string;
  url?: string;
};
