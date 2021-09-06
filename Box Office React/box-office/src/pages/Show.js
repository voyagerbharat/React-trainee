/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import Cast from '../Components/show/Cast';
import Details from '../Components/show/Details';
import Seasons from '../Components/show/Seasons';
import ShowMainData from '../Components/show/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './show.styled';
// useEffect comes with a callback function and an array and this callback function is
// triggered only wwhen there is some change in array
// it also comes with a return fn , which would be triggred only before the calling of next callback fn

// useparams is a custom hook built on react hook ,
//  params is used to finde params asigned after : in url , ex here is :i

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { Loading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, Loading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  Loading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, Loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  ); // returs array of 2 elements

  // what if switch pages in between data is being loaded it would show some error
  // so we would use another varaiable which would keep a check on if data is unmounted or not

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isMounted) {
            dispatch({ type: 'FETCH_SUCCESS', show: results });
          }
        }, 2000);
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
          console.log(err);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (Loading) {
    return <div>Data is being Loaded</div>;
  }
  if (error) {
    return <div> there is some error : {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
