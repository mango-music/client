import React from 'react';

const AdditionalRatingEntry = (props) => {
  const { music } = props;
  const src = `https://www.youtube.com/embed/${music.videoid}?autoplay=0`;
  return (
    <li>
      <div className="iframe-wrapper">
        <iframe
          title={music.videoid}
          type="text/html"
          src={src}
          frameBorder="0"
        />
      </div>
      <div className="stars">★★★★★</div>
      <p>{music.title}</p>
    </li>
  );
};

export default AdditionalRatingEntry;
