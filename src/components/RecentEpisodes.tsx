import { ANIME } from "@consumet/extensions";
import { useEffect, useState } from "react";
import { EpisodeInfo } from "../types/AnimeInfo";

const RecentEpisodes: React.FC = () => {
  const [recentEpisodes, setRecentEpisodes] = useState<EpisodeInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const gogoanime = new ANIME.Gogoanime();

  useEffect(() => {
    const fetchRecentEpisodes = async (page?: number) => {
      try {
        const response = await gogoanime.fetchRecentEpisodes();
        setRecentEpisodes(response.results);
        setCurrentPage(response.currentPage);
        setHasNextPage(response.hasNextPage);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching recent anime episodes: ", error);
        setLoading(false);
      }
    };

    fetchRecentEpisodes();
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((currentPage?: number) => currentPage + 1);
      setLoading(true);
    }
  };

  return (
    <div className="flex flex-row">
      <h1>Recent Episodes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {recentEpisodes.map((eps: EpisodeInfo) => (
            <li key={eps.episodeId}>
              <h2>{eps.title.toString()}</h2>
              <img src={eps.image} alt="episode image" />
              <a href={eps.url} target="_blank" rel="noopener noreferrer">
                Watch
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentEpisodes;
