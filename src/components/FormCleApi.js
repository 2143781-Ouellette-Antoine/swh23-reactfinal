import React from 'react';

class FormCleApi extends React.Component {

    handleSubmit = (event) => {
        // Lance la fonction sauvegarder reçue en paramêtre
        this.props.regenererCleApi(
            document.getElementById('codeUsager').value,
            document.getElementById('motDePasse').value
        );
        // Annule l'action par défaut du formulaire
        event.preventDefault();
    }

    render() {
        return (
            // Lance la fonction handleSubmit quand le formulaire est soumis (quand le bouton enregistrer est cliquer)
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Code usager :</label></td>
                            <td>
                                <input
                                    type="text"
                                    id="codeUsager"
                                    name="codeUsager"
                                    // La valeur du input est le codeUsager de poutineSelect reçu en paramêtre
                                    //value={}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td><label>Mot de passe :</label></td>
                            <td>
                                <input
                                    type="text"
                                    id="motDePasse"
                                    name="motDePasse"
                                    // La valeur du input est la description de poutineSelect reçue en paramêtre
                                    //value={}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td id="ligneBoutons">
                                <input type="submit" value="Regenerer" />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {this.props.cleApiAffichee}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}

export default FormCleApi;