import React from 'react';
import axios from 'axios';
import FormGestionPoutine from './FormGestionPoutine';
import Tableau from './Tableau';
import FormCleApi from './FormCleApi';
const apiKey = 'Weepinbell_pCLtv';

class GestionPoutine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Un tableau d'objets qui va contenir toutes les poutines de la BD
            poutines: [],
            // isLoaded est faux tant que l'appel n'est pas terminé
            isLoaded: false,
            // Un objet "poutine" qui indique la poutine présentement sélectionné. Si le id est nulle alors aucune poutine n'est sélectionné.
            // Me sert à déterminer quelle action effectuer quand je clique sur enregistrer et quelle poutine supprimer quand on clique sur 
            // le bouton supprimer
            poutineSelect: {id: null, nom: "", description: ""},

            cleApiAffichee: "",
            joke: "Chargement en cours..."
        };
    }

    componentDidMount() {
        // Sélectionner la liste de poutines par un appel à l'api
        axios.get('http://127.0.0.1/final-api/poutine'/* , {
            headers: {
                Authorization: "api_key " + apiKey
            }
          } */)
        .then((response) => {
            const poutines = response.data.poutines;
            // On récupère les données reçues et on modifie le tableau dans l'état
            this.setState({poutines : poutines})
            // Sur un succès, mettre à jour la liste de poutines dans l'état
            this.setState({isLoaded: true})
        })

        //Second API (externe).
        axios.get('https://api.chucknorris.io/jokes/random')
        .then((response) => {
            const resultat = response.data.value;
            // On récupère les données reçues et on modifie le tableau dans l'état
            this.setState({joke : resultat})
        })
    }

    /**
     * Change la poutine qui est sélectionné
     * @param {*} poutine Objet qui contient la clé id, nom et description
     */
    changePoutineSelect = (poutine) => {
        // Changer la valeur de poutineSelect dans l'état pour la valeur reçu en paramêtre
        this.setState({poutineSelect: {id: poutine.id, nom: poutine.nom, description: poutine.description}});
    };

    videPoutineSelect = () => {
        // Efface la valeur de poutineSelect dans l'état (met la valeur de id à null, le titre à rien et la description à rien)
        this.setState({poutineSelect: {id: null, nom: "", description: ""}});
    };

    sauvegardeModification = () => {
        // S'il y a une poutine de sélectionnée, lance la fonction de modification
        if (this.state.poutineSelect.id != null) {
            this.modifierUnePoutine();
        } else {//sinon lance la fonction d'ajout d'une nouvelle poutine
            this.ajouterUnePoutine();
        }
    }

    ajouterUnePoutine = () => {
        // Ajout une nouvelle poutine dans la BD par un appel à l'api
        axios({
            method: 'POST',
            url: 'http://127.0.0.1/final-api/poutine',
            data: {
                nom: this.state.poutineSelect.nom,
                description: this.state.poutineSelect.description
            }/* ,
            headers: {
                Authorization: "api_key " + apiKey
            } */
        })
        .then((response) => {
            // Sur un succès, récupère la nouvelle poutine dans la réponse de la requête
            let poutineAjoutee = response.data;
            const poutines = [...this.state.poutines, poutineAjoutee];
            // Ajoute cette poutine dans la liste de poutines de l'état
            this.setState({poutines: poutines});
            // Efface la valeur de poutineSelect dans l'état
            this.videPoutineSelect();
        });
    }

    modifierUnePoutine = () => {
        // Modifie la poutine sélectionnée par un appel à l'api
        // Le id et les nouveaux nom et description de la poutine à modifier sont déjà dans l'objet poutineSelect de l'état
        axios({
            method: 'PUT',
            url: 'http://127.0.0.1/final-api/poutine/' + this.state.poutineSelect.id,
            data: {
                nom: this.state.poutineSelect.nom,
                description: this.state.poutineSelect.description
            }/* ,
            headers: {
                Authorization: "api_key " + apiKey
            } */
        })
        // Sur un succès, modifie l'item de listePoutine qui correspond a la poutine modifiée par la nouvelle poutine
        .then((response) => {
            const listePoutineUpdate = this.state.poutines.map(poutine => {
                //Trouve l'item a Updater.
                if (response.data.id === poutine.id) {
                    return {
                        id: response.data.id,
                        nom: response.data.nom,
                        description: response.data.description
                    }
                }
                else return poutine
            });
            this.setState({poutines: listePoutineUpdate});
        });
        // Efface la valeur de poutineSelect dans l'état
        this.videPoutineSelect();
    }

    supprimerUnePoutine = () => {
        // Supprime la poutine sélectionnée par un appel à l'api
        axios({
            method: 'DELETE',
            url: 'http://127.0.0.1/final-api/poutine/' + this.state.poutineSelect.id
        })
        // Sur un succès, enlève la poutine de la liste de poutines de l'état
        .then((response) => {
            const listePoutineUpdate = this.state.poutines.filter(poutine => response.data.id !== poutine.id);
            this.setState({poutines: listePoutineUpdate});
        });
        // Efface la valeur de poutineSelect dans l'état
        this.videPoutineSelect();
    }
    
    regenererCleApi = (codeUsager, motDePasse) => {
        //Preparer les parametres
        let token = "basic " + btoa(codeUsager + " " + motDePasse)/* + "api_key " + apiKey */;

        // Request a new API key for the user provided.
        axios({
            method: 'get',
            url: 'http://127.0.0.1/final-api/cle',
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            let nouvelleCleApi = response.data.cle_api;
            if (nouvelleCleApi==null) nouvelleCleApi=response.data.messageErreur;
            // On récupère les données reçues et on modifie le tableau dans l'état
            this.setState({cleApiAffichee : nouvelleCleApi});
        })
    }

    render() {
        //RETURN si api pas loaded:
        if(!this.state.isLoaded){
            return (
                // HTML à retourner tant que l'appel n'est pas terminé,
                //un message de chargement par exemple.
                <h3>Chargement en cours...</h3>
            )
        }

        //RETURN si api loaded:
        return (
            <section>
                {/* Composant avec le input box et les boutons */}
                <FormGestionPoutine
                    // Valeur de la poutine sélectionnée
                    poutineSelect={this.state.poutineSelect}
                    // La fonction pour modifier la poutine sélectionnée, je vais m'en servir à chaque modification du input box
                    changerPoutineSelect={this.changePoutineSelect}
                    // La fonction pour effacer la valeur de la poutine sélectionnée, je vais la relier au bouton nouveau
                    nouveau={this.ajouterUnePoutine}
                    // La fonction reliée au bouton enregistrer
                    sauvegarder={this.sauvegardeModification}
                    // La fonction pour supprimer une poutine
                    supprimer={this.supprimerUnePoutine} />

                <h3>Menu des poutines</h3>

                {/* Composante qui sert à afficher la liste de poutines sous forme de tableau */}
                <Tableau 
                    // La liste de poutines de l'état
                    poutines={this.state.poutines}
                    // La fonction pour modifier la poutine sélectionnée, je vais m'en servir à chaque fois que je clique sur une ligne de poutine
                    changerPoutineSelect={this.changePoutineSelect}
                />

                <h3>Regenerer nouvelle cle Api</h3>

                {/* Composante avec le formulaire pour regenerer une cle api */}
                <FormCleApi
                    cleApiAffichee={this.state.cleApiAffichee}
                    regenererCleApi={this.regenererCleApi}
                />

                <h3>Joke de Chuck Norris</h3>
                <p>{this.state.joke}</p>

            </section>
        );
    }
}

export default GestionPoutine;