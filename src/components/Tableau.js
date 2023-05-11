import React from "react";
import LigneTableau from "./LigneTableau";

class Tableau extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // On construit un tableau de composante LigneTableau avec en paramêtre une poutine, une clé et la fonction changerPoutineSelect
        const lignesTableau = this.props.poutines.map(poutine => 
            (<LigneTableau poutine={poutine} key={poutine.id} changerPoutineSelect={this.props.changerPoutineSelect}/>)
        );

        return (
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Nom</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {lignesTableau}
                </tbody>
            </table>
        );
    }
}

export default (Tableau);