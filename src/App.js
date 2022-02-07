import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=68b3cc02a3c9d55c9fa55eac7541284e ";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=7ecd0b11bc4cd387a22b43cb37086584&query=";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [pesquisarTermo, setPesquisarTermo] = useState("");

  const getFilmes = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setFilmes(data.results));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (pesquisarTermo) {
      getFilmes(`${SEARCH_API}${pesquisarTermo}`);
      setPesquisarTermo("");
    }
  };

  const handleOnChange = (event) => {
    setPesquisarTermo(event.target.value);
  };

  useEffect(() => {
    getFilmes(FEATURED_API);
  }, []);

  return (
    
    <>
    
  
      <header>
      <div className = "TMDB">
      <img src={require('./Vector.png')} />
      </div>
        <form onSubmit={handleOnSubmit}>
          <input
            type="search"
            className="search"
            placeholder="Pesquisar..."
            value={pesquisarTermo}
            onChange={handleOnChange}
          />
          
        </form>
        
      </header>
      
      <div className="movie-container">
        {filmes.length > 0 &&
          filmes.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      
    </>
  );
}

export default App;