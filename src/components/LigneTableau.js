import React from "react";

class LigneTableau extends React.Component {

    nomClic = () => {this.props.changerPoutineSelect(this.props.poutine)};

    render() {
        return (
            <tr>
                {/* On donne la valeur du id reçu en paramêtre */}
                <td>{this.props.poutine.id}</td>
                {/* Sur un clique du nom, lance la fonction nomClic */}
                <td onClick={this.nomClic}>{this.props.poutine.nom}</td>
                {/* On donne la valeur de la description reçu en paramêtre*/}
                <td>{this.props.poutine.description}</td>
            </tr>
        );
    }
}

export default (LigneTableau);