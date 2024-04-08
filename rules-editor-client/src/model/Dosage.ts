export default class Dosage {
    name: string;
    FHIRcode: string;

    constructor(name: string, FHIRcode: string) {
        this.name = name;
        this.FHIRcode = FHIRcode;
    }
}

export const initialDosages = [
    new Dosage('Amlodipine 5mg', '999969'),
    new Dosage('Amlodipine 10mg', '999970'),
];
