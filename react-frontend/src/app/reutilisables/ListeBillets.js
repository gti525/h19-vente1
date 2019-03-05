// import React, { Component } from "react";
// import Evenement from "../sections/Evenement/Evenement.js";
// import AjoutBillet from "./AjoutBillet.js";

// class ListeBillets extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ajoutBilletOuvert: false
//     }
//     this.ouvrirAchatBillet = this.ouvrirAchatBillet.bind(this);
//     this.fermerAchatBillet = this.fermerAchatBillet.bind(this);
//   }

//   ouvrirAchatBillet() {
//     this.setState({ ajoutBilletOuvert: true })
//   }

//   fermerAchatBillet() {
//     this.setState({ ajoutBilletOuvert: false })
//   }

//   render() {
//     const { evenements } = this.props;
//     const { ajoutBilletOuvert } = this.state;
//     return (
//       <div className="container">
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">Image</th>
//               <th scope="col">Nom</th>
//               <th scope="col">Date</th>
//               <th scope="col">Lieu</th>
//               <th scope="col">Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.renderEvenements(evenements)}
//           </tbody>
//         </table>
//         {ajoutBilletOuvert && <AjoutBillet fermerAchatBillet={this.fermerAchatBillet()}/>} {/*Si ajoutBilletOuvert === true, render le component AjoutBillet*/}
//       </div>
//     );
//   }

//   renderEvenements = (evenements) => {
//     return (
//       Object.keys(evenements).map((key) => (
//         <Evenement key={key} {...evenements[key]} ouvrirAchatBillet={this.ouvrirAchatBillet}/>
//       ))
//     );
//   }
// }

// export default ListeBillets;