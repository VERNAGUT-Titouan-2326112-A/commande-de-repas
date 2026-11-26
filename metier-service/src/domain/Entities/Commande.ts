import { IdentifiantInvalideError, TransitionStatutCommandeError } from "../Exception/ExceptionList";

export enum StatutCommande {
    EN_ATTENTE = "en attente",
    PRET = "pret",
    ANNULE = "annulé",
}

export class Commande {
    private _id: string;
    private _utilisateurId: string;
    private _produitId: string;
    private _creneauId: string;
    private _statut: StatutCommande;

    constructor(
        id: string,
        utilisateurId: string,
        produitId: string,
        creneauId: string,
        statut: StatutCommande = StatutCommande.EN_ATTENTE
    ) {
        if (!id.trim()) {
            throw new IdentifiantInvalideError("de la commande");
        }
        if (!utilisateurId.trim()) {
            throw new IdentifiantInvalideError("de l'utilisateur");
        }
        if (!produitId.trim()) {
            throw new IdentifiantInvalideError("du produit");
        }
        if (!creneauId.trim()) {
            throw new IdentifiantInvalideError("du créneau");
        }

        this._id = id;
        this._utilisateurId = utilisateurId;
        this._produitId = produitId;
        this._creneauId = creneauId;
        this._statut = statut;
    }

    get id(): string {
        return this._id;
    }

    get utilisateurId(): string {
        return this._utilisateurId;
    }

    get produitId(): string {
        return this._produitId;
    }

    get creneauId(): string {
        return this._creneauId;
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