import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { getOrders } from '../store';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    this.props.loadOrders(this.props.user.id);
  }

  render() {
    const { orders } = this.props;
    let totalCost = 0;
    return (
      <div>
        <h1>Orders</h1>
        <div className="orders-container">
          {
            orders.map(order => (
              <div key={order.id}>
                <div className="order">
                  <div className="order-info">
                    <div className="order-id">
                      <h2>Order ID {order.id}</h2>
                    </div>
                    <div className="order-date">
                      <h2>Order Date {order.createdAt}</h2>
                    </div>
                  </div>
                  <div className="product-info">
                    {
                      order.products.map(product => {
                        totalCost = totalCost + product.product_order.quantity * product.product_order.quantity.price;
                        return (
                          <div key={product.id} className="cart-product">
                            <Link to={`/products/${product.id}`}><h4>Name: {product.title}</h4></Link>
                            <h4>Quantity: {product.product_order.quantity}</h4>
                            <h4>Price: {product.product_order.price} coins ; Subtotal: {product.product_order.price * product.product_order.quantity} coins</h4>
                          </div>
                        )
                    })}
                  </div>
                  <div className="order-total">
                    <h3>Total Cost: {order.coreyPromo ? totalCost / 2 : totalCost} coins {order.coreyPromo ? '(Promo Applied)' : '(No Promo Code Found)'}</h3>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    user: state.user,
    orders: state.orders
   }
}

const mapDispatch = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(getOrders(userId))
  }
}

 export default connect(mapState, mapDispatch)(Orders)
