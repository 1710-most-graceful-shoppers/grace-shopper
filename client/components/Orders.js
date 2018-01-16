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
    this.props.loadUserOrders(this.props.user.id);
  }

  render() {
    const { orders, isAdmin } = this.props;
    return (
      <div>
        <h1>Orders</h1>
        <div className="orders-container">
          {
            orders.map(order => {
              let totalCost = 0;
              return (
                <div key={order.id}>
                  <div className="order">
                    <div className="order-info">
                      <div className="order-id">
                        <h3>Order ID {order.id}</h3>
                      </div>
                      <div className="order-date">
                        <h3>Order Date {order.createdAt.slice(0, 10)}</h3>
                      </div>
                    </div>
                    <div className="product-info">
                      {
                        order.products.map(product => {
                          console.log(totalCost)
                          totalCost += product.product_order.quantity * product.product_order.price;
                          return (
                            <div key={product.id} className="cart-product">
                              <Link to={`/products/weapons/${product.id}`}><h4>Name: {product.title}</h4></Link>
                              <h4>Quantity: {product.product_order.quantity} ; Price: {product.product_order.price} coins ; Subtotal: {product.product_order.price * product.product_order.quantity} coins</h4>
                            </div>
                          )
                        })}
                    </div>
                    <div className="order-total">
                      <h3>Total Cost: {order.coreyPromo ? totalCost / 2 : totalCost} coins {order.coreyPromo ? '(Promo Applied)' : '(No Promo Code Found)'}</h3>
                    </div>
                  </div>
                </div>
              )
            })
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
    isAdmin: !!state.user.isAdmin,
    orders: state.orders
   }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserOrders: (userId) => dispatch(getOrders(userId))
  }
}

 export default connect(mapState, mapDispatch)(Orders)
