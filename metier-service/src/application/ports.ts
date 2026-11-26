import type { CreneauRetrait } from "../domain/Entities/CreneauRetrait";

// Port de sortie : ce dont les cas d'usage ont besoin pour lire et sauver un créneau.
// Les noms parlent métier ; l'implémentation (mémoire, PostgreSQL...) est dans infrastructure/.
export interface CreneauRepository {
    trouverCreneau(id: string): Promise<CreneauRetrait | null>;
    enregistrerCreneau(creneau: CreneauRetrait): Promise<void>;
}

// Port de sortie : fabrique les identifiants des nouveaux créneaux.
export interface GenerateurId {
    nouveau(): string;
}
