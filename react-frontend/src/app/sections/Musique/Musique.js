import React, { Component } from "react";
import Evenement from "../Evenement/Evenement.js";

class Musique extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.state.products[0] = { name: "Musique 0", price: 0, quantity: 999};
    this.state.products[1] = { name: "Musique 1", price: 0, quantity: 999};
    this.state.products[2] = { name: "Musique 2", price: 0, quantity: 999};
  }
  
  render() {
    var { products } = this.state;
    var renderProducts = () => {
      if (products.length === 0) {
        return null;
      }
      return products.map(product => <Evenement {...product} key={product.name}/>);
    };
    return (
      <div>
        <div className="container">
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity on Hand</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Musique;