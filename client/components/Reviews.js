import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//need information for the Review model
const Reviews = (props) => {
  let {reviews} = props;
  return (
    <ul>
    {reviews.map(review => (
      <li key={review.id}>{review}</li>
    ))}
    </ul>
  )
}

const mapState = (state) => {
  return {
    products: state.products
  }
}

export default withRouter(connect(mapState)(Reviews));
