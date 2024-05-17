import React from 'react'
import { useState,useEffect } from 'react';
import reviewData from '../ReviewData/reviews_data.json'
import ReviewModal from './ReviewModal';
export default function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        setReviews(reviewData);
    setLoading(false);
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
    
  return (
    <>
      <div>
      {reviews.map((review, index) => (
       <ReviewModal review={review} index={index}></ReviewModal>
      ))}
    </div>
    </>
  )
}
