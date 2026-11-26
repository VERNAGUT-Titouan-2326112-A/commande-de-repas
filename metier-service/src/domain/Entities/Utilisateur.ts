import { ChampObligatoireError, EmailInvalideError, IdentifiantInvalideError } from "../Exception/ExceptionList";

export class Utilisateur {
    private _id: string;
    private _prenom: string;
    private _nom: string;
    private _email: string;

    constructor(id: string, prenom: string, nom: string, email: string) {
        if (!id.trim()) {
            throw new IdentifiantInvalideError("de l'utilisateur");
        }
        Utilisateur.verifierChamp(prenom, "prénom");
        Utilisateur.verifierChamp(nom, "nom");
        Utilisateur.verifierEmail(email);

        this._id = id;
        this._prenom = prenom.trim();
        this._nom = nom.trim();
        this._email = email.trim().toLowerCase();
    }

    private static verifierChamp(valeur: string, champ: string): void {
        if (!valeur.trim()) {
            throw new ChampObligatoireError(champ);
        }
    }

    private static verifierEmail(email: string): void {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            throw new EmailInvalideError(email);
        }
    }

    get id(): string {
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
        Utilisateur.verifierChamp(nouveauPrenom, "prénom");
        this._prenom = nouveauPrenom.trim();
    }

    changerNom(nouveauNom: string): void {
        Utilisateur.verifierChamp(nouveauNom, "nom");
        this._nom = nouveauNom.trim();
    }

    changerEmail(nouvelEmail: string): void {
        Utilisateur.verifierEmail(nouvelEmail);
        this._email = nouvelEmail.trim().toLowerCase();
    }
}