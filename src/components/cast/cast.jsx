import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CastWrapper = styled.div`
  padding: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    font-size: 16px;
    margin-right: 20px;
    margin-bottom: 20px;
    flex: 0 0 calc(33.3333% - 40px);
  }

  img {
    width: 150px;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          api_key: 'd89da14cf20732d29d9230587b122e3f',
        },
      })
      .then(response => {
        setCast(response.data.cast);
      })
      .catch(error => {
        console.error('Error fetching cast:', error);
      });
  }, [movieId]);

  return (
    <CastWrapper>
      <h1>Cast</h1>
      <ul>
        {cast.map((actor, index) => (
          <li key={`${actor.id}-${index}`}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </CastWrapper>
  );
};

export default Cast;