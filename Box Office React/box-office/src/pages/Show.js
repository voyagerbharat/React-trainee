import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

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

  const [state, dispatch] = useReducer(reducer, initialState); // returs array of 2 elements
  console.log(state);
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

  // console.log(show);

  if (state.Loading) {
    return <div>Data is being Loaded</div>;
  }
  // if (error) {
  //   return <div> there is some error : {error}</div>;
  // }

  return <div>This is boom bro</div>;
};

export default Show;
