import { describe, expect, it } from "vitest";

import { Produit } from "../../../src/domain/Entities/Produit";
import {
    ChampObligatoireError,
    IdentifiantInvalideError,
    PrixInvalideError,
} from "../../../src/domain/Exception/ExceptionList";

describe("Produit", () => {
    it("crée un produit et permet de changer son prix et son nom", () => {
        const produit = new Produit("p-1", " Burger ", 650);
        expect(produit.produitNom).toBe("Burger");

        produit.changerPrix(700);
        produit.changerProduit("Cheeseburger");

        expect(produit.prix).toBe(700);
        expect(produit.produitNom).toBe("Cheeseburger");
    });

    it("refuse un identifiant vide", () => {
        expect(() => new Produit("", "Burger", 650)).toThrow(IdentifiantInvalideError);
    });

    it("refuse un nom vide, à la création comme à la modification", () => {
        expect(() => new Produit("p-1", "  ", 650)).toThrow(ChampObligatoireError);
        expect(() => new Produit("p-1", "Burger", 650).changerProduit("")).toThrow(ChampObligatoireError);
    });

    it.each([0, -50, 6.5])("refuse le prix %s, à la création comme à la modification", (prix) => {
        expect(() => new Produit("p-1", "Burger", prix)).toThrow(PrixInvalideError);
        expect(() => new Produit("p-1", "Burger", 650).changerPrix(prix)).toThrow(PrixInvalideError);
    });
});