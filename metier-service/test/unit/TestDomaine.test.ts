import { describe, expect, it } from "vitest";

import { CreneauHoraire } from "../../src/domain/Entities/CreneauHoraire";
import { CreneauRetrait } from "../../src/domain/Entities/CreneauRetrait";
import { Commande, StatutCommande } from "../../src/domain/Entities/Commande";

describe("Domaine - Commande de repas", () => {
    const horaireValide = new CreneauHoraire(
        new Date("2026-11-26T12:00:00Z"),
        new Date("2026-11-26T12:15:00Z")
    );

    describe("CreneauHoraire", () => {
        it("accepte un horaire valide, compare par valeur et vérifie l'ouverture à un instant donné", () => {
            const memeHoraire = new CreneauHoraire(
                new Date("2026-11-26T12:00:00Z"),
                new Date("2026-11-26T12:15:00Z")
            );

            expect(horaireValide.equals(memeHoraire)).toBe(true);
            expect(
                horaireValide.estOuvertA(new Date("2026-11-26T12:05:00Z"))
            ).toBe(true);
            expect(
                horaireValide.estOuvertA(new Date("2026-11-26T12:30:00Z"))
            ).toBe(false);
        });

        it("refuse un début supérieur ou égal à la fin", () => {
            expect(
                () =>
                    new CreneauHoraire(
                        new Date("2026-11-26T12:30:00Z"),
                        new Date("2026-11-26T12:15:00Z")
                    )
            ).toThrow();
        });
    });

    describe("Commande", () => {
        it("crée une commande en attente et permet de modifier le prix ou de la marquer prête", () => {
            const commande = new Commande(1, "Burger", 650);
            expect(commande.statut).toBe(StatutCommande.EN_ATTENTE);

            commande.changerPrix(700);
            expect(commande.prixCentimes).toBe(700);

            commande.marquerPrete(new Date("2026-11-26T12:05:00Z"));
            expect(commande.statut).toBe(StatutCommande.PRET);
        });

        it("refuse un identifiant, un nom vide ou un prix invalide", () => {
            expect(() => new Commande(0, "Burger", 650)).toThrow();
            expect(() => new Commande(1, "   ", 650)).toThrow();
            expect(() => new Commande(1, "Burger", 0)).toThrow();
        });

        it("interdit de marquer prête une commande annulée", () => {
            const commande = new Commande(2, "Salade", 450);
            commande.annuler();

            expect(commande.statut).toBe(StatutCommande.ANNULE);
            expect(commande.peutEtreModifiee()).toBe(false);
            expect(() =>
                commande.marquerPrete(new Date("2026-11-26T12:05:00Z"))
            ).toThrow();
        });
    });

    describe("CreneauRetrait", () => {
        it("réserve une place tant que la capacité maximale n'est pas atteinte", () => {
            const creneau = new CreneauRetrait("cr-1", horaireValide, 1);
            creneau.reserverCommande("cmd-1");

            expect(creneau.commandeIds).toEqual(["cmd-1"]);
        });

        it("refuse une commande au-delà de la capacité maximale", () => {
            const creneau = new CreneauRetrait("cr-2", horaireValide, 1);
            creneau.reserverCommande("cmd-1");

            expect(() => creneau.reserverCommande("cmd-2")).toThrow();
        });
    });
});