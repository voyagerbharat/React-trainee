import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

// useEffect comes with a callback function and an array and this callback function is
// triggered only wwhen there is some change in array
// it also comes with a return fn , which would be triggred only before the calling of next callback fn

// useparams is a custom hook built on react hook ,
//  params is used to finde params asigned after : in url , ex here is :i

const Show = () => {
  const [show, setShow] = useState(null);
  const { id } = useParams();
  const [Loading, isLoading] = useState(true);
  const [error, setError] = useState(null);

  // what if switch pages in between data is being loaded it would show some error
  // so we would use another varaiable which would keep a check on if data is unmounted or not

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isMounted) {
            isLoading(false);
            setShow(results);
          }
        }, 2000);
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          isLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(show);

  if (Loading) {
    return <div>Data is being Loaded</div>;
  }
  if (error) {
    return <div> there is some error : {error}</div>;
  }

  return <div>This is boom bro</div>;
};

export default Show;
