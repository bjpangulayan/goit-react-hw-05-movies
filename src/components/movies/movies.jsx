import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MoviesWrapper = styled.div`
  padding: 20px;
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 44px;
    margin-bottom: 20px;
    text-align: center;
    color: #5154e7;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #5154e7;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #5292CE;
    }
  }
`;

const MoviesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MovieItem = styled.li`
  font-size: 18px;
  margin-bottom: 20px;
  width: calc(33.33% - 20px);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  a {
    text-decoration: none; /* Ensure text-decoration is set to none */
    color: #333;
    display: block;
    text-align: center;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
    display: block;
  }

  .title {
    font-weight: bold;
  }

  .genre {
    font-style: italic;
    color: #777;
  }

  span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: '23f77f1a7852117720a48008d2ea32a0',
            query: searchTerm,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

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
    <MoviesWrapper>
      <CenteredWrapper>
        <h1>Search Movies</h1>
        <SearchWrapper>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </SearchWrapper>
      </CenteredWrapper>
      <MoviesList>
        {searchResults.map(movie => (
          <MovieItem key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'замінний-шлях'
                }
                alt={movie.title}
              />
              <span className="title">{movie.title}</span>
              <span className="genre">{getGenreNames(movie.genre_ids)}</span>
            </Link>
          </MovieItem>
        ))}
      </MoviesList>
    </MoviesWrapper>
  );
};

export default Movies;