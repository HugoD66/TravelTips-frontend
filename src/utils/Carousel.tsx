// components/Carousel.tsx
import React from 'react';
import './Carousel.css'; // Assurez-vous d'avoir vos styles ici

interface CarouselItemProps {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ name, imageUrl, description }) => (
  <div className="card">
    <img src={imageUrl} alt={name} className="card__background" />
    <div className="card__content">
      <h2 className="card__title">{name}</h2>
      <p className="card__description">{description}</p>
      <button className="card__button">Learn More</button>
    </div>
  </div>
);

interface CarouselProps {
  items: CarouselItemProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => (
  <div className="carousel-container">
    {items.map(item => (
      <CarouselItem key={item.id} {...item} />
    ))}
  </div>
);

export default Carousel;
