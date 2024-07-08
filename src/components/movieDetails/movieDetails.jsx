import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MovieDetailsWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  img {
    width: 300px;
    height: auto;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .additional-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    a {
      text-decoration: none;
      padding: 10px;
      border: 1px solid #333;
      border-radius: 5px;
      color: #333;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #333;
        color: white;
      }
    }
  }
`;

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: '23f77f1a7852117720a48008d2ea32a0',
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, vote_average, genres, poster_path } = movieDetails;

  return (
    <MovieDetailsWrapper>
      <h1>{title}</h1>
      {poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      )}
      <p>User score: {vote_average && Math.floor(vote_average * 10)}%</p>
      <p>Overview: {overview}</p>
      <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>
      <div className="additional-info">
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>

      {/* Додаємо Outlet для вкладених маршрутів */}
      <Outlet />
    </MovieDetailsWrapper>
  );
};

export default MovieDetails;