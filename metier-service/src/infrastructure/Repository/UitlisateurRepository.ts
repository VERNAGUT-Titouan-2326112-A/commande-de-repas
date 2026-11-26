import { Pool } from "pg";
import { Commande } from "../../domain/Entities/Commande";

export class ConflitDeVersion extends Error {
    constructor(id: number) {
        super(`Conflit de version sur la commande "${id}".`);
        this.name = "ConflitDeVersion";
    }
}

export class UitilisateurRepository {
    constructor(private readonly pool: Pool) {}

    async mettreAJour(commande: Commande, versionAttendue: number): Promise<void> {
        const result = await this.pool.query(
            `
      UPDATE commandes
      SET
        id = $1
        utilisateur_id = $2,
        produit_id = $3,
        statut = $4,
        version = $5
      `,
            [
                commande.id,
                commande.utilisateurId,
                commande.produitId,
                commande.statut,
                versionAttendue + 1,
            ]
        );

        if (result.rowCount === 0) {
            throw new ConflitDeVersion(commande.id);
        }
    }
}