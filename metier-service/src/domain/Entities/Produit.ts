export class Produit {
    private _id: number;
    private _produitNom: string;

    constructor(
        id: number,
        produitNom: string
    ) {
        this._id = id;
        this._produitNom = produitNom.trim();
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

    changerProduit(nouveauProduit: string): void {
        if (!nouveauProduit.trim()) {
            throw new Error("Le nouveau produit est obligatoire.");
        }
        this._produitNom = nouveauProduit.trim();
    }
}