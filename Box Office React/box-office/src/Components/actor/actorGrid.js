import React from 'react';
import ActorCard from './actorCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexedGrid } from '../styled';

const ActorGrid = ({ data }) => {
  return (
    <FlexedGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          name={person.name}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
        />
      ))}
    </FlexedGrid>
  );
};

export default ActorGrid;
