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