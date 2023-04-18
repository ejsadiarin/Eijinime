import { useEffect, useState } from 'react'
import './App.css'
import { ANIME } from '@consumet/extensions'


// react query ?

function App() {
  const gogoAnime = new ANIME.Gogoanime();
  const fetchTopAiring  = gogoAnime.fetchTopAiring().then(data => console.log);

  


  return (
    <div className="App">
      <h1>test</h1>
    </div>
  )
}

export default App
