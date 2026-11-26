export class Utilisateur {
    private _id: number;
    private _prenom: string;
    private _nom: string;
    private _email: string;

    constructor(
        id: number,
        prenom: string,
        nom: string,
        email: string
    ) {
        this._id = id;
        this._prenom = prenom.trim();
        this._nom = nom.trim();
        this._email = email.trim().toLowerCase();
    }

    private static estEmailValide(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    get id(): number {
        return this._id;
    }

    get prenom(): string {
        return this._prenom;
    }

    get nom(): string {
        return this._nom;
    }

    get email(): string {
        return this._email;
    }

    changerPrenom(nouveauPrenom: string): void {
        if (!nouveauPrenom.trim()) {
            throw new Error("Le prénom de la personne est vide.");
        }
        this._prenom = nouveauPrenom.trim();
    }

    changerNom(nouveauNom: string): void {
        if (!nouveauNom.trim()) {
            throw new Error("Le nom de la personne est vide.");
        }
        this._nom = nouveauNom.trim();
    }

    changerEmail(nouvelEmail: string): void {
        if (!Utilisateur.estEmailValide(nouvelEmail)) {
            throw new Error("L'adresse email est invalide.");
        }
        this._email = nouvelEmail.trim().toLowerCase();
    }
}