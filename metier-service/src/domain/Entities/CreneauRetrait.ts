import { CreneauHoraire } from "../ValueObject/CreneauHoraire";
import {
    CapaciteCreneauDepasseeError,
    CapaciteInvalideError,
    IdentifiantInvalideError,
} from "../Exception/ExceptionList";

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
            throw new IdentifiantInvalideError("du créneau");
        }
        if (!Number.isInteger(capaciteMax) || capaciteMax <= 0) {
            throw new CapaciteInvalideError(capaciteMax);
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
