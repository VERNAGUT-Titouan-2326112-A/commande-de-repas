import { describe, expect, it } from "vitest";

import { Utilisateur } from "../../../src/domain/Entities/Utilisateur";
import {
    ChampObligatoireError,
    EmailInvalideError,
    IdentifiantInvalideError,
} from "../../../src/domain/Exception/ExceptionList";

describe("Utilisateur", () => {
    it("crée un utilisateur et normalise son email", () => {
        const utilisateur = new Utilisateur("u-1", "Lucas", "Rachel", " Lulu.Rara@Gmail.com ");
        expect(utilisateur.email).toBe("lulu.rara@gmail.com");
    });

    it("refuse un identifiant vide", () => {
        expect(() => new Utilisateur("", "Lucas", "Rachel", "lulu@gmail.com")).toThrow(IdentifiantInvalideError);
    });

    it("refuse un prénom ou un nom vide", () => {
        expect(() => new Utilisateur("u-1", " ", "Rachel", "lulu@gmail.com")).toThrow(ChampObligatoireError);
        expect(() => new Utilisateur("u-1", "Lucas", "", "lulu@gmail.com")).toThrow(ChampObligatoireError);
    });

    it("refuse un email invalide, à la création comme à la modification", () => {
        expect(() => new Utilisateur("u-1", "Lucas", "Rachel", "pas-un-email")).toThrow(EmailInvalideError);
        const utilisateur = new Utilisateur("u-1", "Lucas", "Rachel", "lulu@gmail.com");
        expect(() => utilisateur.changerEmail("lulu@")).toThrow(EmailInvalideError);
    });
});
