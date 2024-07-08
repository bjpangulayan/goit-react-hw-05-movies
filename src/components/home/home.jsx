import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeWrapper = styled.div`
  padding: 20px;

  h1 {
    font-size: 23px;
    margin-bottom: 10px;
    color: #333;
    text-align: center; /* Center the h1 element */
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  li {
    font-size: 18px;
    margin-bottom: 20px;
    width: calc(33.33% - 20px);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.07);
    }

    a {
      text-decoration: none;
      color: #333;
      display: block;
      text-align: center;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 5px;
      margin-bottom: 10px;
      display: block;
    }

    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title {
      font-weight: bold;
    }

    .genre {
      font-style: italic;
      color: #777;
    }
  }
`;

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch genres
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: '23f77f1a7852117720a48008d2ea32a0',
        },
      })
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });

    // Fetch popular movies
    axios
      .get('https://api.themoviedb.org/3/trending/all/day', {
        params: {
          api_key: '23f77f1a7852117720a48008d2ea32a0',
        },
      })
      .then(response => {
        const moviesWithFullPosterPaths = response.data.results.map(movie => ({
          ...movie,
          fullPosterPath: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }));
        setPopularMovies(moviesWithFullPosterPaths);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });
  }, []);

  const getGenreNames = genreIds => {
    return genreIds
      .map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre ? genre.name : '';
      })
      .filter(Boolean) // Remove any empty strings
      .join(', ');
  };

  return (
    <HomeWrapper>
      <h1>Popular Movies</h1>
      <ul>
        {popularMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img src={movie.fullPosterPath} alt={movie.title} />
              <span className="title">{movie.title}</span>
              <span className="genre">{getGenreNames(movie.genre_ids)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </HomeWrapper>
  );
};

export default Home;