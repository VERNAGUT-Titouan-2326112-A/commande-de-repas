import { describe, expect, it } from "vitest";

import { CreneauHoraire } from "../../../src/domain/ValueObject/CreneauHoraire";
import { CreneauRetrait } from "../../../src/domain/Entities/CreneauRetrait";
import { Commande, StatutCommande } from "../../../src/domain/Entities/Commande";

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
});