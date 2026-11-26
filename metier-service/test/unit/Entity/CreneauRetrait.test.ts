import { describe, expect, it } from "vitest";

import { CreneauHoraire } from "../../../src/domain/ValueObject/CreneauHoraire";
import { CreneauRetrait } from "../../../src/domain/Entities/CreneauRetrait";
import {
    CapaciteCreneauDepasseeError,
    CapaciteInvalideError,
    IdentifiantInvalideError,
} from "../../../src/domain/Exception/ExceptionList";

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

            expect(() => creneau.reserverCommande("cmd-2")).toThrow(CapaciteCreneauDepasseeError);
        });

        it.each([0, -1, 1.5])("refuse une capacité de %s", (capacite) => {
            expect(() => new CreneauRetrait("cr-3", horaireValide, capacite)).toThrow(CapaciteInvalideError);
        });

        it("refuse un identifiant vide", () => {
            expect(() => new CreneauRetrait(" ", horaireValide, 1)).toThrow(IdentifiantInvalideError);
        });
    });
});
