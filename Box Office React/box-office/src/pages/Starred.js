import React, { useEffect, useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/show/showGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();
  const [Shows, SetShows] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setTimeout(() => {
            SetShows(results);
            setisLoading(false);
          }, 1000);
        })
        .catch(err => {
          setError(err.message);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div className="ok">Data is being Loaded!</div>}
      {error && <div>Error Occured</div>}
      {!isLoading && !error && !Shows && <div>No Starred Shows</div>}
      {!isLoading && !error && Shows && <ShowGrid data={Shows} />}
    </MainPageLayout>
  );
};

export default Starred;
