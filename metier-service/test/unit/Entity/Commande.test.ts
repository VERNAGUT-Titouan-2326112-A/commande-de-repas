import { describe, expect, it } from "vitest";

import { Utilisateur } from "../../../src/domain/Entities/Utilisateur";
import { Produit } from "../../../src/domain/Entities/Produit";
import { Commande, StatutCommande } from "../../../src/domain/Entities/Commande";

describe("Domaine - Commande de repas", () => {
    const utilisateur = new Utilisateur(
        1,
        "Lucas",
        "Rachel",
        "lulu.rara@gmail.com"
    );

    describe("Produit", () => {
        it("permet de modifier le prix et refuse un prix invalide", () => {
            const produit = new Produit(1, "Burger", 650);

            produit.changerPrix(700);
            expect(produit.prix).toBe(700);

            expect(() => produit.changerPrix(0)).toThrow();
            expect(() => produit.changerPrix(-50)).toThrow();
        });
    });

    describe("Commande", () => {
        it("crée une commande en attente et permet de la marquer prête", () => {
            const produit = new Produit(1, "Burger", 650);
            const commande = new Commande(1, utilisateur.id, produit.id);

            expect(commande.statut).toBe(StatutCommande.EN_ATTENTE);

            commande.marquerPrete();
            expect(commande.statut).toBe(StatutCommande.PRET);
        });

        it("refuse un identifiant de commande, d'utilisateur ou de produit invalide", () => {
            const produit = new Produit(1, "Burger", 650);

            expect(() => new Commande(0, utilisateur.id, produit.id)).toThrow();
            expect(() => new Commande(1, 0, produit.id)).toThrow();
            expect(() => new Commande(1, utilisateur.id, 0)).toThrow();
        });

        it("interdit de marquer prête une commande annulée", () => {
            const produit = new Produit(2, "Frites", 450);
            const commande = new Commande(2, utilisateur.id, produit.id);

            commande.annuler();

            expect(commande.statut).toBe(StatutCommande.ANNULE);
            expect(commande.peutEtreModifiee()).toBe(false);
            expect(() =>commande.marquerPrete().toThrow());
        });
    });
});