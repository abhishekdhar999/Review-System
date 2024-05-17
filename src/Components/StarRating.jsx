import React from 'react'
// import StarRatingComponent from 'react-star-rating-component';
import ReactStars from 'react-rating-stars-component';
export default function StarRating({ rating }) {
  return (
    <>
      <ReactStars
      name="rate"
      starCount={5}
      value={rating / 2}
      starColor="#ffb400"
      emptyStarColor="#ddd"
    //   editing={false}
    edit={false}
    disabled
    />
    </>
  )
}
