export default class Fact {
    name: string;
    FHIRcode: string;

    constructor(name: string, FHIRcode: string) {
        this.name = name;
        this.FHIRcode = FHIRcode;
    }
}

export const initialFacts = [
    new Fact('Blood Pressure Systolic', 'bp_systolic'),
    new Fact('Blood Pressure Diastolic', 'bp_diastolic'),
];
