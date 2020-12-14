import React from 'react';
import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = (props) => {
  let title = "", images;
  if (props.images.length > 0) {
    images = props.images.map(image => <GalleryItem url={`http://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id}/>);
    title = props.title
  } else {
    images = <NotFound/>;
  }

  return (
    <div className="photo-container">
      <h2>{title}</h2>
      <ul>{images}</ul>
    </div>
  );
}

export default Gallery;