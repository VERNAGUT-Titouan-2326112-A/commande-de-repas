export enum StatutCommande {
    EN_ATTENTE = "en attente",
    PRET = "pret",
    ANNULE = "annulé",
}
export class Commande {
    private _id: number;
    private _nom: string;
    private _prixCentimes: number;
    private _disponible: boolean;
    private _statut: StatutCommande;

    constructor(
        id: number,
        nom: string,
        prixCentimes: number,
        disponible: boolean = true,
        statut: StatutCommande = StatutCommande.EN_ATTENTE
    ) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("L'identifiant de la commande est obligatoire.");
        }
        if (!nom.trim()) {
            throw new Error("Le nom de la commande est obligatoire.");
        }
        if (!Number.isInteger(prixCentimes) || prixCentimes <= 0) {
            throw new Error("Le prix de la commande doit être un entier strictement positif en centimes.");
        }

        this._id = id;
        this._nom = nom.trim();
        this._prixCentimes = prixCentimes;
        this._disponible = disponible;
        this._statut = statut;
    }

    get id(): number {
        return this._id;
    }

    get nom(): string {
        return this._nom;
    }

    get prixCentimes(): number {
        return this._prixCentimes;
    }

    get disponible(): boolean {
        return this._disponible;
    }

    marquerIndisponible(): void {
        this._disponible = false;
    }

    marquerDisponible(): void {
        this._disponible = true;
    }
    get statut(): StatutCommande {
        return this._statut;
    }

    peutEtreModifiee(): boolean {
        return this._statut === StatutCommande.EN_ATTENTE;
    }

    marquerPrete(now: Date = new Date()): void {
        if (this._statut !== StatutCommande.EN_ATTENTE) {
            throw new Error(
                `Impossible de marquer la commande ${this.id} comme prête : statut actuel "${this._statut}".`
            );
        }
        this._statut = StatutCommande.PRET;
    }

    annuler(): void {
        if (this._statut !== StatutCommande.EN_ATTENTE) {
            throw new Error(
                `Impossible d'annuler la commande ${this.id} : statut actuel "${this._statut}".`
            );
        }
        this._statut = StatutCommande.ANNULE;
    }
    changerPrix(nouveauPrixCentimes: number): void {
        if (!Number.isInteger(nouveauPrixCentimes) || nouveauPrixCentimes <= 0) {
            throw new Error("Le nouveau prix doit être strictement positif en centimes.");
        }
        this._prixCentimes = nouveauPrixCentimes;
    }
}