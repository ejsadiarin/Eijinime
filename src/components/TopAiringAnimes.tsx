import React, { useEffect, useState } from "react";
import { ANIME } from "@consumet/extensions";
import { AnimeInfo } from "../types/AnimeInfo";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

const TopAiringAnime: React.FC = () => {
  const [animeList, setAnimeList] = useState<AnimeInfo[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  //const [displayedAnimeList, setDisplayedAnimeList] = useState<AnimeInfo[]>([]);
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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const triggerFetchNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((currentPage?: number) => currentPage + 1);
      // setDisplayedAnimeList(animeList.slice(currentPage * 4, currentPage * 4 + 4));
      setLoading(true);
    }
  };

  return (
    <main className="flex flex-col">
      <h1>Top Airing Anime</h1>
      <Carousel orientation="horizontal" setApi={setApi}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {animeList.map((anime, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/3 ">
              <div className="pl-1">
                <TopAiringAnimeCard
                  key={index}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  genres={anime.genres}
                  episodeNumber={anime.episodeNumber}
                  url={anime.url}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-3">
          <Button onClick={() => api?.scrollTo(current - 1)}>Left</Button>
          <Button onClick={() => api?.scrollTo(current + 1)}>Right</Button>
        </div>
      </Carousel>
    </main>
  );
};

const TopAiringAnimeCard = (props: AnimeInfo) => {
  return (
    <Card>
      <CardContent className="flex aspect-square items-center justify-center p-6">
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
      </CardContent>
    </Card>
  );
};

export default TopAiringAnime;
