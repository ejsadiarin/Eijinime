import React, { useEffect, useState } from "react";
import { ANIME } from "@consumet/extensions";
import { AnimeInfo } from "../types/AnimeInfo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        setAnimeList(data.results.slice(0, 4)); // NOTE: typeof data.results === 'IAnimeResult[]'
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
      // setDisplayedAnimeList(animeList.slice(currentPage * 4, currentPage * 4 + 4));
      setLoading(true);
    }
  };

  return (
    <div className="">
      <h1>Top Airing Anime</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Carousel
          orientation="horizontal"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
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
          </CarouselContent>
          <CarouselPrevious />
          {hasNextPage && <CarouselNext onClick={handleNextPage} />}
        </Carousel>
      )}
    </div>
  );
};

const TopAiringAnimeCard = (props: AnimeInfo) => {
  return (
    <CarouselItem key={props.id} className="pl-1 basis-1/4 ">
      <div>
        <h2>{props.title.toString()}</h2>
        <img
          src={props.image}
          alt={props.title.toString()}
          width="150"
          height="180"
        />
        <p>Genres: {props.genres?.join(", ")}</p>
        <p>Episode: {props.episodeNumber}</p>
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          Watch
        </a>
      </div>
    </CarouselItem>
  );
};

export default TopAiringAnime;
