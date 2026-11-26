import { TransitionStatutCommandeError } from "../Exception/ExceptionList";

export enum StatutCommande {
    EN_ATTENTE = "en attente",
    PRET = "pret",
    ANNULE = "annulé",
}

export class Commande {
    private _id: number;
    private _utilisateurId: number;
    private _produit: string;
    private _prixCentimes: number;
    private _statut: StatutCommande;

    constructor(
        id: number,
        utilisateurId: number,
        produit: string,
        prixCentimes: number,
        statut: StatutCommande = StatutCommande.EN_ATTENTE
    ) {
        this._id = id;
        this._utilisateurId = utilisateurId;
        this._produit = produit.trim();
        this._prixCentimes = prixCentimes;
        this._statut = statut;
    }

    get id(): number {
        return this._id;
    }

    get utilisateurId(): number {
        return this._utilisateurId;
    }

    get produit(): string {
        return this._produit;
    }

    get prixCentimes(): number {
        return this._prixCentimes;
    }

    get statut(): StatutCommande {
        return this._statut;
    }

    peutEtreModifiee(): boolean {
        return this._statut === StatutCommande.EN_ATTENTE;
    }

    marquerPrete(): void {
        if (this._statut !== StatutCommande.EN_ATTENTE) {
            throw new TransitionStatutCommandeError(this._statut, StatutCommande.PRET);
        }
        this._statut = StatutCommande.PRET;
    }

    annuler(): void {
        if (this._statut !== StatutCommande.EN_ATTENTE) {
            throw new TransitionStatutCommandeError(this._statut, StatutCommande.ANNULE);
        }
        this._statut = StatutCommande.ANNULE;
    }

    changerProduit(nouveauProduit: string): void {
        if (!this.peutEtreModifiee()) {
            throw new Error(
                `Impossible de modifier le produit de la commande ${this.id} : statut actuel "${this._statut}".`
            );
        }
        if (!nouveauProduit.trim()) {
            throw new Error("Le nouveau produit est obligatoire.");
        }
        this._produit = nouveauProduit.trim();
    }

    changerPrix(nouveauPrixCentimes: number): void {
        if (!Number.isInteger(nouveauPrixCentimes) || nouveauPrixCentimes <= 0) {
            throw new Error("Le nouveau prix doit être strictement positif en centimes.");
        }
        this._prixCentimes = nouveauPrixCentimes;
    }
}