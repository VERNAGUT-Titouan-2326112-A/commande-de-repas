export class CreneauHoraire {
    public readonly debut: Date;
    public readonly fin: Date;

    constructor(debut: Date, fin: Date) {
        if (debut.getTime() >= fin.getTime()) {
            throw new Error("L'heure de début doit être avant l'heure de fin.");
        }
        this.debut = new Date(debut.getTime());
        this.fin = new Date(fin.getTime());
    }

    equals(other: CreneauHoraire): boolean {
        return (
            this.debut.getTime() === other.debut.getTime() &&
            this.fin.getTime() === other.fin.getTime()
        );
    }
}