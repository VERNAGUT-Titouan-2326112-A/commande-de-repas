import { describe, expect, it } from "vitest";

import { CreneauHoraire } from "../../../src/domain/ValueObject/CreneauHoraire";
import { CreneauRetrait } from "../../../src/domain/Entities/CreneauRetrait";
import { Commande, StatutCommande } from "../../../src/domain/Entities/Commande";

describe("Domaine - Commande de repas", () => {
    const horaireValide = new CreneauHoraire(
        new Date("2026-11-26T12:00:00Z"),
        new Date("2026-11-26T12:15:00Z")
    );

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