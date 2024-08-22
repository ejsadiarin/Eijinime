import TopAiringAnime from "./components/TopAiringAnimes";
import RecentEpisodes from "./components/RecentEpisodes";

function App() {
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-lg">Eijinime</h1>
      </div>
      <TopAiringAnime />
    </>
  );
}

export default App;
