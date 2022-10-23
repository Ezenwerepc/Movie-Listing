import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';


function App(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addMovieIsShown, setAddMovieIsShown] = useState(false)
  

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://my-database-78a03-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].release,
          
        });
      }

      //const transformedMovies = data.results.map((movieData) => {
        //return {
          //id: movieData.episode_id,
          //title: movieData.title,
          //openingText: movieData.opening_crawl,
          //releaseDate: movieData.release_date,
        //};
      //});
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  async function addMovieHandler(movie) {
  const response = await fetch('https://my-database-78a03-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST', 
      body:JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
  });
  const data = await response.json();
  console.log(data);
  }
  
  const hideAddMovieHandler = (props) => {
    setAddMovieIsShown(!addMovieIsShown);
  }

  const addNewMovieHandler = () => {
    setAddMovieIsShown(true)
    
  }
    
  

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        {addMovieIsShown&& <AddMovie onAddMovie={addMovieHandler} onClose={hideAddMovieHandler}/>}

      </section>
      <section>
       <button onClick={fetchMoviesHandler}>Fetch Movies</button>
       {!addMovieIsShown && <button onClick={addNewMovieHandler}> AddNew Movie</button>}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
