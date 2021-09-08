/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router';
import Cast from '../Components/show/Cast';
import Details from '../Components/show/Details';
import Seasons from '../Components/show/Seasons';
import ShowMainData from '../Components/show/ShowMainData';
import { useShow } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './show.styled';
// useEffect comes with a callback function and an array and this callback function is
// triggered only wwhen there is some change in array
// it also comes with a return fn , which would be triggred only before the calling of next callback fn

// useparams is a custom hook built on react hook ,
//  params is used to finde params asigned after : in url , ex here is :i

const Show = () => {
  const { id } = useParams();

  const { show, Loading, error } = useShow(id);

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
