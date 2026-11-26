import type { CreneauRepository } from "../../application/ports";
import { CreneauRetrait } from "../../domain/Entities/CreneauRetrait";
import { CreneauHoraire } from "../../domain/ValueObject/CreneauHoraire";

// Copie profonde : le stockage et l'appelant ne partagent jamais le même objet.
function copier(c: CreneauRetrait): CreneauRetrait {
    return new CreneauRetrait(
        c.id,
        new CreneauHoraire(c.horaire.debut, c.horaire.fin),
        c.capaciteMax,
        [...c.commandeIds],
    );
}

// Adapter en mémoire du port CreneauRepository : se comporte comme une vraie base.
export class CreneauRepositoryMemoire implements CreneauRepository {
    private stockage = new Map<string, CreneauRetrait>();

    async trouverCreneau(id: string): Promise<CreneauRetrait | null> {
        const creneau = this.stockage.get(id);
        return creneau ? copier(creneau) : null;
    }

    async enregistrerCreneau(creneau: CreneauRetrait): Promise<void> {
        this.stockage.set(creneau.id, copier(creneau));
    }
}
