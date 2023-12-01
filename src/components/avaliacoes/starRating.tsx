import React from 'react';

interface StarRatingProps {
  count: number;
  value?: number;
  onChange?: (value: number) => void;
  starStyle?: React.CSSProperties; // Adicione uma propriedade para o estilo da estrela
}

const StarRating: React.FC<StarRatingProps> = ({ count, value = 0, onChange, starStyle }) => {
  const stars = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((starValue) => (
        <span
          key={starValue}
          style={{
            cursor: 'pointer',
            color: starValue <= value ? 'gold' : 'gray',
            marginRight: '5px',
            ...starStyle, // Adicione o estilo da estrela aqui
          }}
          onClick={() => onChange && onChange(starValue)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
