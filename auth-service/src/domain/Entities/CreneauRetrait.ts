import { CreneauHoraire } from "../ValueObject/CreneauHoraire";
import { CapaciteCreneauDepasseeError, ErreurDomaine } from "../Exception/CapaciteCreneauDepasseException";

export class CreneauRetrait {
    public readonly id: string;
    public readonly horaire: CreneauHoraire;
    private _capaciteMax: number;
    private _commandeIds: string[];

    constructor(
        id: string,
        horaire: CreneauHoraire,
        capaciteMax: number,
        commandeIds: string[] = []
    ) {
        if (!id.trim()) {
            throw new ErreurDomaine("L'identifiant du créneau est obligatoire.");
        }
        if (!Number.isInteger(capaciteMax) || capaciteMax <= 0) {
            throw new ErreurDomaine("La capacité maximale du créneau doit être positive.");
        }
        if (commandeIds.length > capaciteMax) {
            throw new CapaciteCreneauDepasseeError(id, capaciteMax);
        }

        this.id = id;
        this.horaire = horaire;
        this._capaciteMax = capaciteMax;
        this._commandeIds = [...commandeIds];
    }

    get capaciteMax(): number {
        return this._capaciteMax;
    }

    get commandeIds(): readonly string[] {
        return [...this._commandeIds];
    }

    reserverCommande(commandeId: string): void {
        if (this._commandeIds.includes(commandeId)) {
            return;
        }
        if (this._commandeIds.length >= this._capaciteMax) {
            throw new CapaciteCreneauDepasseeError(this.id, this._capaciteMax);
        }
        this._commandeIds.push(commandeId);
    }

    libererCommande(commandeId: string): void {
        this._commandeIds = this._commandeIds.filter((id) => id !== commandeId);
    }
}