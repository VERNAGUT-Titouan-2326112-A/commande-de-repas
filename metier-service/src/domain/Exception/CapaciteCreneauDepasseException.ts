export class ErreurDomaine extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}

export class CapaciteCreneauDepasseeError extends ErreurDomaine{
    constructor(creneauId: string, capaciteMax: number) {
        super(`Le créneau "${creneauId}" a atteint sa capacité maximale (${capaciteMax}).`);
    }
}