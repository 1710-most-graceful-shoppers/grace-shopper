import React from 'react';

const Reviews = (props) => {
  let {reviews} = props;
  return (
    <div>
    {reviews.map(review => (
      <div key={review.id}>
        <h4>{review.user.email} said: I give this product {review.rating} stars out of 5! {review.text}</h4>
      </div>
    ))}
    </div>
  )
}

export default Reviews;
