import React, {Component} from 'react';
import {connect} from 'react-redux';
import {placeUserOrder, placeSessionOrder} from '../store';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {user, sessionCart, submitUserOrder, submitCartOrder, promoChange} = this.props;
    const onSubmit = user.id ? (e) =>  submitUserOrder(e, user.id) : (e) => submitCartOrder(e, sessionCart);

    return (
     <div>
      <form className="form" id="checkout-form" onSubmit={onSubmit}>
        <fieldset>
          <legend>Checkout information here!</legend>
          <div className="form-group">
            <label className="form-group-label">Shipping Information
                <textarea
                  className="form-group-label-input"
                  placeholder="Where you want dis?"
                  name="address"
                  rows="3"
                  cols="50"
                />
            </label>
            <label className="form-group-label">Email Address
              <input
                className="form-group-label-input"
                placeholder={user.email || 'New Email Here'}
                name="email"
              />
            </label>
            <label className="form-group-label">Payment Method
              <input
                className="form-group-label-input"
                placeholder="Gold? Galleons? Barter?"
                name="payment"
              />
            </label>
            <label className="form-group-label">Promo Code?
            <input
              onChange={promoChange}
              className="form-group-label-input"
              placeholder="Rhymes with schoolz"
              name="coreyPromo"
            />
          </label>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="form-group-submit"
              >Place your ORDER!
            </button>
          </div>
        </fieldset>
      </form>
     </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    sessionCart: state.sessionCart,
    userCart: state.userCart,
    promoChange: ownProps.promoChange
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitUserOrder: (e, userId) => {
      e.preventDefault();
      dispatch(placeUserOrder({
        address: e.target.address.value,
        email: e.target.email.value,
        payment: e.target.payment.value,
        coreyPromo: e.target.coreyPromo.value === 'CoreyRulezOmriDroolz',
        isSold: true
      }, userId));
    },
    submitCartOrder: (e, sessionCart) => {
      e.preventDefault();
      dispatch(placeSessionOrder({
        address: e.target.address.value,
        email: e.target.email.value,
        payment: e.target.payment.value,
        coreyPromo: e.target.coreyPromo.value === 'CoreyRulezOmriDroolz',
        isSold: true
      }, sessionCart));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
