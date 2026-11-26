import { Pool } from "pg";
import { Commande, StatutCommande } from "../../domain/Entities/Commande";
import { CommandeRepositoryInterface } from "../../domain/Interface/CommandeRepositoryInterface";

interface CommandeRow {
    id: number;
    utilisateur_id: number;
    produit_id: number;
    statut: StatutCommande;
}

export class CommandeRepository extends CommandeRepositoryInterface {
    constructor(private readonly pool: Pool) {}

    async mettreAJourAvecVerrou(
        id: string,
        modifier: (commande: Commande) => void
    ): Promise<Commande> {
        const client = await this.pool.connect();

        try {
            await client.query("BEGIN");

            const selectResult = await client.query<CommandeRow>(
                `
        SELECT id,
               utilisateur_id,
               produit_id,
                statut
        FROM commandes
        WHERE id = $1
        FOR UPDATE
        `,
                [id]
            );

            const row = selectResult.rows[0];
            if (!row) {
                throw new Error(`Commande introuvable : ${id}`);
            }

            const commande = new Commande(
                row.id,
                row.utilisateur_id,
                row.produit_id,
                row.statut
            );

            modifier(commande);

            await client.query(
                `
        UPDATE commandes
        SET
          utilisateur_id = $2,
          produit_id = $3,
          statut = $4
        WHERE id = $1
        `,
                [
                    commande.id,
                    commande.utilisateurId,
                    commande.produitId,
                    commande.statut,
                ]
            );

            await client.query("COMMIT");
            return commande;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}