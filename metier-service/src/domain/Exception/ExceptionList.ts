export class ErreurDomaine extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}

export class CapaciteCreneauDepasseeError extends ErreurDomaine {
    constructor(creneauId: string, capaciteMax: number) {
        super(`Le créneau "${creneauId}" a atteint sa capacité maximale (${capaciteMax}).`);
    }
}

export class CapaciteInvalideError extends ErreurDomaine {
    constructor(capacite: number) {
        super(`La capacité maximale du créneau doit être un entier strictement positif (reçu : ${capacite}).`);
    }
}

export class IdentifiantInvalideError extends ErreurDomaine {
    constructor(entite: string) {
        super(`L'identifiant ${entite} est obligatoire.`);
    }
}

export class ChampObligatoireError extends ErreurDomaine {
    constructor(champ: string) {
        super(`Le champ "${champ}" est obligatoire.`);
    }
}

export class PrixInvalideError extends ErreurDomaine {
    constructor(prix: number) {
        super(`Le prix doit être un entier strictement positif en centimes (reçu : ${prix}).`);
    }
}

export class EmailInvalideError extends ErreurDomaine {
    constructor(email: string) {
        super(`L'adresse email "${email}" est invalide.`);
    }
}

export class CommandeVideError extends ErreurDomaine {
    constructor() {
        super("Une commande doit contenir au moins un plat.");
    }
}

export class HoraireInvalideError extends ErreurDomaine {
    constructor(
        message: string = "L'heure de début du créneau de retrait doit être strictement antérieure à l'heure de fin."
    ) {
        super(message);
    }
}

export class ModificationCommandeInterditeError extends ErreurDomaine {
    constructor(statutActuel: string) {
        super(`Impossible de modifier la commande : statut actuel "${statutActuel}".`);
    }
}

export class TransitionStatutCommandeError extends ErreurDomaine {
    constructor(statutActuel: string, cible: string) {
        super(`Transition de statut interdite de "${statutActuel}" vers "${cible}".`);
    }
}