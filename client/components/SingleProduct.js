
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateCart, updateSessionCart, getSingleProduct} from '../store';

class SingleProduct extends Component {

  constructor(props){
    super(props);
    this.state = {
      reviewInput: '',
      reviewRating: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    this.props.getProduct(id)
  }

  handleChange(evt){
    if (evt.target.name === 'reviewInput') {
      this.setState({
        reviewInput: evt.target.value
      })
    } else if (evt.target.name === 'reviewRating'){
      this.setState({
        reviewRating: evt.target.value
      })
    }
  }

    render(){
      const {products, addMe, userId, averageRating, isLoggedIn} = this.props;
      const product = products[0];

      return product ? (
        <div>
          <div className="single-view-container">
            <div className="single-info-card">
              <div className="single-info-card-top">
                <div className="single-info-card-name">
                  <h1>{product.title}</h1>
                </div>
                <div className="single-info-card-price">
                  <h1>{product.price} Coins</h1>
                </div>
              </div>
              <hr />
              <div className="single-info-card-middle">
                <img src={product.imageUrl} />
              </div>
              <hr />
              <div className="single-info-card-text">
                <p>
                  {product.description}
                </p>
              </div>
              <div className="single-info-card-bottom">
                <div className="single-info-card-rating">
                  <h3>{product.reviews ? averageRating(product.reviews) : null}</h3>
                </div>
                <div className="single-info-card-action">
                  <button className="product-add" onClick={() => {addMe(userId, product.id)}}>Add to cart!</button>
                </div>
              </div>
            </div>
            <div className="single-info-card">
              <div className="single-info-card-top">
                <div className="single-info-card-name">
                  <h1>Reviews</h1>
                </div>
              </div>
              <hr />
              <div className="single-info-card-middle">
                {
                  product.reviews.map(review => (
                    <div className="review-container" key={review.id}>
                      <div className="review-info-top">
                        <div className="review-info-email">
                          <p>
                            {review.user.email}
                          </p>
                        </div>
                        <div className="review-info-rating">
                          <p>
                            {review.rating} {review.rating > 1 ? 'Stars' : 'Star'}
                          </p>
                        </div>
                      </div>
                      <p>{review.text}</p>
                      <hr />
                    </div>
                  ))
                }
              </div>
              <hr />
              <textarea className="review-textarea" name="reviewInput" onChange={this.handleChange} rows="14" cols="60" placeholder={isLoggedIn ? 'Leave feedback here:' : 'Log in or sign up to leave feedback'} />
              <div className="single-info-card-bottom">
                <div className="single-info-card-rating">
                  <p>Rating:</p>
                  <select onChange={this.handleChange} name="reviewRating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="single-info-card-action">
                  <button className="product-add" hidden={!isLoggedIn}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null
    }

  }

const mapState = (state, ownProps) => {
  return {
    products: state.products,
    productId: ownProps.match.params.productId,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }};

const mapDispatch = (dispatch) => {
  return {
    addMe: (userId, productId) => {userId ? dispatch(updateCart(userId, productId, 1)) : dispatch(updateSessionCart(productId, 1))},
    getProduct: (id) => dispatch(getSingleProduct(id)),
    averageRating: (reviews) => {
      let total = null;
      for (let i = 0; i < reviews.length; i++){
        total += reviews[i].rating;
      }
      if (total){
        return (total / reviews.length).toFixed(1) + ' Stars'
      } else {
        return 'No Ratings'
      }
    }
  }
};

export default connect(mapState, mapDispatch)(SingleProduct);
