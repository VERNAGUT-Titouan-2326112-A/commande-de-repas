import { describe, expect, it } from "vitest";
import { OuvrirCreneau, ReserverCommande } from "../../src/application/cas-usage";
import { CreneauIntrouvableError } from "../../src/application/erreurs";
import { ErreurDomaine } from "../../src/domain/Exception/ExceptionList";
import { CreneauRepositoryMemoire } from "../../src/infrastructure/memoire/creneau-repository-memoire";
import { IdsSequentiels } from "./doublures";

const DEBUT = new Date("2026-11-26T12:00:00Z");
const FIN = new Date("2026-11-26T12:30:00Z");

// Chaque test monte ses propres objets : aucun état partagé, l'ordre d'exécution ne compte pas.
function monter() {
    const repo = new CreneauRepositoryMemoire();
    return {
        repo,
        ouvrir: new OuvrirCreneau(repo, new IdsSequentiels("cr")),
        reserver: new ReserverCommande(repo),
    };
}

describe("OuvrirCreneau", () => {
    it("crée un créneau vide et l'enregistre", async () => {
        const { repo, ouvrir } = monter();
        const creneau = await ouvrir.executer(DEBUT, FIN, 10);
        expect(creneau.id).toBe("cr-001");
        const relu = await repo.trouverCreneau("cr-001");
        expect(relu?.capaciteMax).toBe(10);
        expect(relu?.commandeIds).toEqual([]);
    });
});

describe("ReserverCommande", () => {
    it("réserve la commande sur le créneau et l'enregistre", async () => {
        const { repo, ouvrir, reserver } = monter();
        await ouvrir.executer(DEBUT, FIN, 2);
        await reserver.executer("cr-001", "cmd-1");
        expect((await repo.trouverCreneau("cr-001"))?.commandeIds).toEqual(["cmd-1"]);
    });

    it("invariant : refuse une réservation sur un créneau plein, sans rien enregistrer", async () => {
        const { repo, ouvrir, reserver } = monter();
        await ouvrir.executer(DEBUT, FIN, 1);
        await reserver.executer("cr-001", "cmd-1");
        await expect(reserver.executer("cr-001", "cmd-2")).rejects.toThrow(ErreurDomaine);
        expect((await repo.trouverCreneau("cr-001"))?.commandeIds).toEqual(["cmd-1"]);
    });

    it("signale un créneau introuvable", async () => {
        const { reserver } = monter();
        await expect(reserver.executer("inconnu", "cmd-1")).rejects.toThrow(CreneauIntrouvableError);
    });
});

describe("CreneauRepositoryMemoire", () => {
    it("stocke des copies : modifier un créneau chargé ne change rien avant l'enregistrement", async () => {
        const { repo, ouvrir } = monter();
        await ouvrir.executer(DEBUT, FIN, 3);
        const charge = await repo.trouverCreneau("cr-001");
        charge!.reserverCommande("cmd-x");
        expect((await repo.trouverCreneau("cr-001"))?.commandeIds).toEqual([]);
        await repo.enregistrerCreneau(charge!);
        expect((await repo.trouverCreneau("cr-001"))?.commandeIds).toEqual(["cmd-x"]);
    });
});
