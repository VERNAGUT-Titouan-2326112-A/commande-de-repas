import { CreneauRetrait } from "../domain/Entities/CreneauRetrait";
import { CreneauHoraire } from "../domain/ValueObject/CreneauHoraire";
import { CreneauIntrouvableError } from "./erreurs";
import type { CreneauRepository, GenerateurId } from "./ports";

// Cas d'usage 1 : ouvrir un créneau de retrait (crée la ressource principale).
export class OuvrirCreneau {
    constructor(
        private creneaux: CreneauRepository,
        private ids: GenerateurId,
    ) {}

    async executer(debut: Date, fin: Date, capaciteMax: number): Promise<CreneauRetrait> {
        const creneau = new CreneauRetrait(this.ids.nouveau(), new CreneauHoraire(debut, fin), capaciteMax);
        await this.creneaux.enregistrerCreneau(creneau);
        return creneau;
    }
}

// Cas d'usage 2 : réserver une commande sur un créneau (met l'invariant de capacité à l'épreuve).
export class ReserverCommande {
    constructor(private creneaux: CreneauRepository) {}

    async executer(creneauId: string, commandeId: string): Promise<CreneauRetrait> {
        const creneau = await this.creneaux.trouverCreneau(creneauId);
        if (!creneau) {
            throw new CreneauIntrouvableError(creneauId);
        }
        creneau.reserverCommande(commandeId); // lève CapaciteCreneauDepasseeError si le créneau est plein
        await this.creneaux.enregistrerCreneau(creneau);
        return creneau;
    }
}
