import { ErreurDomaine } from "../domain/Exception/CapaciteCreneauDepasseException";

// Erreur métier levée par un cas d'usage quand la ressource demandée n'existe pas.
export class CreneauIntrouvableError extends ErreurDomaine {
    constructor(creneauId: string) {
        super(`Créneau introuvable : ${creneauId}`);
    }
}
