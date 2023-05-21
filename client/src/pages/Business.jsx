import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCard, loadSingleCard } from '../features/cards/cardsSlice';
import PageTitle from '../components/PageTitle/PageTitle';
import { ImageContainer, Description, Info, FlexContainer } from './Business.styled';
import { selectBreakpoints } from '../features/theme/themeSlice';
import Map from '../components/Map/Map';

const Business = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const card = useSelector(selectCard(parseInt(id)));
  const breakpoints = useSelector(selectBreakpoints);
  const [src, setSrc] = useState(card?.imageUrl || process.env.PUBLIC_URL + '/images/card_stock_image.jpg');

  const handleImageLoadError = () => {
    setSrc(process.env.PUBLIC_URL + '/images/card_stock_image.jpg');
  };

  useEffect(() => {
    dispatch(loadSingleCard(id));
  }, []);

  return card ? (
    <div>
      <PageTitle title={card.title} subtitle={card.subtitle} backButton={true} />
      <FlexContainer tabletBreakPoint={breakpoints.tablet}>
        <div>
          <Description>{card.description}</Description>
          <ImageContainer>
            <img src={src} alt={card.imageAlt || 'Stock business image'} onError={handleImageLoadError} />
          </ImageContainer>
        </div>
        <Info>
          <ul>
            <li>
              <strong>Phone: </strong>
              {card.phone}
            </li>
            <li>
              <strong>Email: </strong>
              {card.email}
            </li>
            <li>
              <strong>Country: </strong>
              {card.country}
            </li>
            {card.state ? (
              <li>
                <strong>State: </strong>
                {card.state}
              </li>
            ) : null}
            <li>
              <strong>City: </strong>
              {card.city}
            </li>

            <li>
              <strong>Address: </strong>
              {card.address}
            </li>
            <li>
              <strong>Zip Code: </strong>
              {card.zip}
            </li>
            <li>
              <strong>Website: </strong>
              <a href={card.web} target="_blank" rel="noopener noreferrer">
                {card.title}
              </a>
            </li>
          </ul>
        </Info>
      </FlexContainer>
      <Map zip={card.zip} />
    </div>
  ) : null;
};

export default Business;
