import { Pool } from "pg";
import { Commande } from "../../domain/Entities/Commande";

export class CommandeRepositoryInterface {

    constructor(private readonly pool: Pool) {}

    async mettreAJourAvecVerrou(id: string, modifier: (commande: Commande) => void): Promise<Commande>;
}