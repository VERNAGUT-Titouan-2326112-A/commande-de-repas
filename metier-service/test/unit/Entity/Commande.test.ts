import { describe, expect, it } from "vitest";

import { Commande, StatutCommande } from "../../../src/domain/Entities/Commande";
import { IdentifiantInvalideError, TransitionStatutCommandeError } from "../../../src/domain/Exception/ExceptionList";

describe("Commande", () => {
    it("crée une commande en attente, liée à un utilisateur, un produit et un créneau", () => {
        const commande = new Commande("cmd-1", "u-1", "p-1", "cr-1");

        expect(commande.statut).toBe(StatutCommande.EN_ATTENTE);
        expect(commande.utilisateurId).toBe("u-1");
        expect(commande.produitId).toBe("p-1");
        expect(commande.creneauId).toBe("cr-1");
    });

    it("peut être marquée prête", () => {
        const commande = new Commande("cmd-1", "u-1", "p-1", "cr-1");
        commande.marquerPrete();
        expect(commande.statut).toBe(StatutCommande.PRET);
    });

    it.each([
        ["", "u-1", "p-1", "cr-1"],
        ["cmd-1", "", "p-1", "cr-1"],
        ["cmd-1", "u-1", " ", "cr-1"],
        ["cmd-1", "u-1", "p-1", ""],
    ])("refuse un identifiant vide (%s, %s, %s, %s)", (id, utilisateurId, produitId, creneauId) => {
        expect(() => new Commande(id, utilisateurId, produitId, creneauId)).toThrow(IdentifiantInvalideError);
    });

    it("interdit de marquer prête une commande annulée", () => {
        const commande = new Commande("cmd-2", "u-1", "p-2", "cr-1");
        commande.annuler();

        expect(commande.peutEtreModifiee()).toBe(false);
        expect(() => commande.marquerPrete()).toThrow(TransitionStatutCommandeError);
    });

    it("interdit d'annuler une commande déjà prête", () => {
        const commande = new Commande("cmd-3", "u-1", "p-1", "cr-1");
        commande.marquerPrete();

        expect(() => commande.annuler()).toThrow(TransitionStatutCommandeError);
    });
});
