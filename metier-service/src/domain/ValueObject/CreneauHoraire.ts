import { HoraireInvalideError } from "../Exception/ExceptionList";

export class CreneauHoraire {
    public readonly debut: Date;
    public readonly fin: Date;

    constructor(debut: Date, fin: Date) {
        if (debut.getTime() >= fin.getTime()) {
            throw new HoraireInvalideError();
        }
        this.debut = new Date(debut.getTime());
        this.fin = new Date(fin.getTime());
    }

    estOuvertA(maintenant: Date): boolean {
        const t = maintenant.getTime();
        return t >= this.debut.getTime() && t <= this.fin.getTime();
    }

    equals(other: CreneauHoraire): boolean {
        return (
            this.debut.getTime() === other.debut.getTime() &&
            this.fin.getTime() === other.fin.getTime()
        );
    }
}