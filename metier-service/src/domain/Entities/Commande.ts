import { TransitionStatutCommandeError } from "../Exception/ExceptionList";

export enum StatutCommande {
    EN_ATTENTE = "en attente",
    PRET = "pret",
    ANNULE = "annulé",
}

export class Commande {
    private _id: number;
    private _utilisateurId: number;
    private _produitId: number;
    private _statut: StatutCommande;

    constructor(
        id: number,
        utilisateurId: number,
        produitId: number,
        statut: StatutCommande = StatutCommande.EN_ATTENTE
    ) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("L'identifiant de l'utilisateur doit être un entier positif.");
        }

        if (!Number.isInteger(utilisateurId) || utilisateurId <= 0) {
            throw new Error("L'identifiant de l'utilisateur doit être un entier positif.");
        }

        if (!Number.isInteger(produitId) || produitId <= 0) {
            throw new Error("L'identifiant du produit doit être un entier positif.");
        }

        this._id = id;
        this._utilisateurId = utilisateurId;
        this._produitId = produitId;
        this._statut = statut;
    }

    get id(): number {
        return this._id;
    }

    get utilisateurId(): number {
        return this._utilisateurId;
    }

    get produitId(): number {
        return this._produitId;
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
}