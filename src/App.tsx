import { useEffect, useState } from 'react'
import './App.css'
import { ANIME, ITitle} from '@consumet/extensions'


// react query ?
type Anime = {
  id: string,
  title: string | ITitle,
  image: string | undefined,
  url: string | undefined,
}

function App() {
  const [topAiring, setTopAiring] = useState<Anime[]>([]);

  const gogoAnime = new ANIME.Gogoanime();
  
  useEffect(() =>{
    async function getTopAiringAnime() {
      const response = await gogoAnime.fetchTopAiring();

      const topAiringData = await Promise.all(response.results.map(async (obj) => {
        return {
        id: obj.id,
        title: obj.title,
        image: obj.image,
        url: obj.url,
        }
      }))
      setTopAiring(topAiringData);

    }

    getTopAiringAnime();
  }, [])

  return (
    <div className="App">
      <h1>Top Airing Anime</h1>
      {topAiring.map((anime) => (
        <ul>
          <li key={anime.id}>{anime.title}
          <img src={anime.image} alt={anime.title} />
          <a href={anime.url}>{anime.title}</a>
          </li>
        </ul>
      ))}

    </div>
  );
}

export default App
