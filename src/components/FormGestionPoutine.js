import React from 'react';

class FormGestionPoutine extends React.Component {
    constructor(props) {
        super(props);
        //State: les champs input.
        this.state = {
            id: null,
            nom: "",
            description: ""
        }
    }

    handleSubmit = (event) => {
        // Lance la fonction sauvegarder reçue en paramêtre
        this.props.sauvegarder();
        // Annule l'action par défaut du formulaire
        event.preventDefault();
    }

    handleChange = () => {
        this.props.changerPoutineSelect({
            id: this.props.poutineSelect.id,
            nom: document.getElementById('nom').value,
            description: document.getElementById('description').value
        });
    };

    nouvellePoutine = () => {
        //Mettre id null pour pouvoir Ajouter.
        this.props.changerPoutineSelect({
            id: null,
            nom: document.getElementById('nom').value,
            description: document.getElementById('description').value
        });
        // Lance la fonction nouveau reçue en paramêtre
        this.props.nouveau();
    }

    supprimerPoutine = () => {
        if (this.props.poutineSelect.id == null)
        {
            return;
        }
        // Lance la fonction supprimer reçue en paramêtre
        this.props.supprimer(this.props.poutineSelect.id);
    }

    render() {
        return (
            // Lance la fonction handleSubmit quand le formulaire est soumis (quand le bouton enregistrer est cliquer)
            <form onSubmit={this.handleSubmit}>
                
                <table>
                        <tbody>
                            <tr>
                                <td><label>Nom :</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        // La valeur du input est le nom de poutineSelect reçu en paramêtre
                                        value={this.props.poutineSelect.nom}
                                        // À chaque changement, on lance la fonction handleChange
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label>Description :</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        // La valeur du input est la description de poutineSelect reçue en paramêtre
                                        value={this.props.poutineSelect.description}
                                        // À chaque changement, on lance la fonction handleChange
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td id="ligneBoutons">
                                    {/* Sur clique de bouton, lance la fonction appropriée */}
                                    <input type="button" value="Nouvelle" onClick={this.nouvellePoutine}/>
                                    <input type="button" value="Supprimer" onClick={this.supprimerPoutine}/>
                                    <input type="submit" value="Enregistrer" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                
            </form>
        );
    }
}

export default FormGestionPoutine;