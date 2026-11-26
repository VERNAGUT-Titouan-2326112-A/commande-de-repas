import { ChampObligatoireError, IdentifiantInvalideError, PrixInvalideError } from "../Exception/ExceptionList";

export class Produit {
    private _id: string;
    private _produitNom: string;
    private _prix: number;

    constructor(id: string, produitNom: string, prix: number) {
        if (!id.trim()) {
            throw new IdentifiantInvalideError("du produit");
        }
        Produit.verifierNom(produitNom);
        Produit.verifierPrix(prix);

        this._id = id;
        this._produitNom = produitNom.trim();
        this._prix = prix;
    }

    private static verifierNom(nom: string): void {
        if (!nom.trim()) {
            throw new ChampObligatoireError("nom du produit");
        }
    }

    private static verifierPrix(prix: number): void {
        if (!Number.isInteger(prix) || prix <= 0) {
            throw new PrixInvalideError(prix);
        }
    }

    get id(): string {
        return this._id;
    }

    get produitNom(): string {
        return this._produitNom;
    }

    get prix(): number {
        return this._prix;
    }

    changerPrix(nouveauPrixCentimes: number): void {
        Produit.verifierPrix(nouveauPrixCentimes);
        this._prix = nouveauPrixCentimes;
    }

    changerProduit(nouveauProduit: string): void {
        Produit.verifierNom(nouveauProduit);
        this._produitNom = nouveauProduit.trim();
    }
}