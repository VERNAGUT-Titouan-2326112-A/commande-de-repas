import type { CreneauRetrait } from "../domain/Entities/CreneauRetrait"; // Importation du type CreneauRetrait depuis le domaine pour l'utiliser dans les interfaces de port.

export interface CreneauRepository { // Port d'accès aux créneaux de retrait (interface pour l'infrastructure).
    trouverCreneau(creneauId: string): Promise<CreneauRetrait | null>;   
    enregistrerCreneau(creneau: CreneauRetrait): Promise<void>; 
}

export interface GenerateurId { 
    nouveau(): string; 
}
