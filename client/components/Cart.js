import React, {Component} from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {count: localStorage.getItem('count')};
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    if (!JSON.parse(localStorage.getItem('count'))) localStorage.setItem('count', 0);
    console.log('yes')
    localStorage.setItem('count', JSON.parse(localStorage.getItem('count'))+1);
    this.setState({count: localStorage.getItem('count')})
  }

  render() {
    return (
      <div>
      <button onClick={this.buttonClick}>Click to add to storage! Local Storage: {localStorage.count}</button>
      </div>
    )
  }
}

export default Cart;
