import React from 'react';
import { Link } from 'react-router-dom';
import { ShowCardStyle } from '../showcard.styled';

const ShowCard = ({ id, image, name, summary }) => {
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';

  return (
    <ShowCardStyle>
      <div>
        <img className="img-wrapper" src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className="btns">
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button">Star me</button>
      </div>
    </ShowCardStyle>
  );
};

export default ShowCard;