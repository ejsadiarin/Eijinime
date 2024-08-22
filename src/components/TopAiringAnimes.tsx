import React, { useEffect, useState } from "react";
import { ANIME, IAnimeInfo, ITitle, IAnimeEpisode } from "@consumet/extensions";
import { AnimeInfo } from "../types/AnimeInfo";

const TopAiringAnime: React.FC = () => {
  const [animeList, setAnimeList] = useState<AnimeInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const gogoanime = new ANIME.Gogoanime();

  useEffect(() => {
    const fetchAnime = async (page?: number) => {
      try {
        const data = await gogoanime.fetchTopAiring(page);
        setAnimeList(data.results); // NOTE: typeof data.results === 'IAnimeResult[]'
        setCurrentPage(data.currentPage);
        setHasNextPage(data.hasNextPage);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching top airing anime:", error);
        setLoading(false);
      }
    };

    fetchAnime(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((currentPage?: number) => currentPage + 1);
      setLoading(true);
    }
  };

  return (
    <div className="flex">
      <h1>Top Airing Anime</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {animeList.map((anime) => (
            <TopAiringAnimeCard
              id={anime.id}
              title={anime.title}
              image={anime.image}
              genres={anime.genres}
              episodeNumber={anime.episodeNumber}
              url={anime.url}
            />
          ))}
        </ul>
      )}
      {hasNextPage && <button onClick={handleNextPage}>Next Page</button>}
    </div>
  );
};

const TopAiringAnimeCard = (props: AnimeInfo) => {
  return (
    <li key={props.id} className="flex">
      <h2>{props.title.toString()}</h2>
      <img src={props.image} alt={props.title.toString()} />
      <p>Genres: {props.genres?.join(", ")}</p>
      <p>Episode: {props.episodeNumber}</p>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        Watch
      </a>
    </li>
  );
};

export default TopAiringAnime;
