import React from 'react';

const GalleryItem = (props) => {
  return (
    <li>
      <img src={props.url} alt={props.title}/>
    </li>
  );
}

export default GalleryItem;