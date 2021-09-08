import React from 'react';
import ShowCard from './showCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexedGrid } from '../styled';
import { useShows } from '../../misc/custom-hooks';

const ShowGrid = ({ data }) => {
  // eslint-disable-next-line no-unused-vars
  const [starredShows, staredDispatched] = useShows();
  return (
    <FlexedGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);
        const onStarClick = () => {
          if (isStarred) {
            staredDispatched({ type: 'Remove', showId: show.id });
          } else {
            staredDispatched({ type: 'ADD', showId: show.id });
          }
        };
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            summary={show.summary}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexedGrid>
  );
};

export default ShowGrid;
