import React, { Component } from "react";

class Evenement extends Component {constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      quantity: 0,
    };
  }
  componentDidMount() {
    this.setState({ name: this.props.name });
    this.setState({ price: this.props.price });
    this.setState({ quantity: this.props.quantity });
  }

  render() {
    const {
      name,
      price,
      quantity
    } = this.state;

    return (
      <tr>
        <td>{name}</td><td>${price}</td><td>{quantity}</td>
      </tr>
    );
  }
}

export default Evenement;