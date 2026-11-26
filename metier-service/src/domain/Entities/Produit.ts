export class Produit {
    private _id: number;
    private _produitNom: string;
    private _prix: number;

    constructor(
        id: number,
        produitNom: string,
        prix: number
    ) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("L'identifiant de l'utilisateur doit être un entier positif.");
        }
        this._id = id;
        this._produitNom = produitNom.trim();
        this._prix = prix;
    }

    get id(): number {
        return this._id;
    }

    get produitNom(): string {
        return this._produitNom;
    }

    set produitNom(value: string) {
        this._produitNom = value;
    }

    get prix(): number {
        return this._prix;
    }

    changerPrix(nouveauPrixCentimes: number): void {
        if (!Number.isInteger(nouveauPrixCentimes) || nouveauPrixCentimes <= 0) {
            throw new Error("Le nouveau prix doit être strictement positif en centimes.");
        }
        this._prix = nouveauPrixCentimes;
    }
    changerProduit(nouveauProduit: string): void {
        if (!nouveauProduit.trim()) {
            throw new Error("Le nouveau produit est obligatoire.");
        }
        this._produitNom = nouveauProduit.trim();
    }
}