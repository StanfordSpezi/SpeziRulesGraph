// Rule class representing a rule for json-rules-engine
export class Rule {
    private conditions: { all: Array<{ fact: string; operator: string; value: string | number }> } = { all: [] };
    private event: { type: string; params: { message: string; dosage: string; schedule: string } } = { type: '', params: { message: '', dosage: '', schedule: '' } };
   
    constructor() {}
   
    addCondition(fact: string, operator: string, value: string | number): void {
       this.conditions.all.push({ fact, operator, value });
    }
   
    setEvent(type: string, message: string, dosage: string, schedule: string): void {
       this.event.type = type;
       this.event.params.message = message;
       this.event.params.dosage = dosage;
       this.event.params.schedule = schedule;
    }
   
    toJSON(): object {
       return {
         conditions: this.conditions,
         event: this.event,
       };
    }
}