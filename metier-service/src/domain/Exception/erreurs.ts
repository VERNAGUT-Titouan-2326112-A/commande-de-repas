import { ErreurDomaine } from "./ExceptionList";

export class CreneauIntrouvableError extends ErreurDomaine {
    constructor(creneauId: string) {
        super(`Le créneau de retrait avec l'identifiant ${creneauId} est introuvable.`);
    }
}
