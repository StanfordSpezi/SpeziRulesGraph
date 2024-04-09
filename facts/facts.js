const fhirpath = require("fhirpath");
const fhirpath_r4_model = require("fhirpath/fhir-context/r4");

var facts = {};

module.exports.addFact = (factKey, factValue) => {
  facts[factKey] = factValue;
};

module.exports.addFacts = ([facts]) => {
  for (const [key, value] of Object.entries(facts)) {
    facts[key] = value;
  }
};

module.exports.getFacts = () => facts;

// facts for typical FHIR bundles ready to use
module.exports.getFHIRFacts = (fhirBundle) => ({
  medication: fhirpath.evaluate(
    fhirBundle,
    "Bundle.entry.resource.where(resourceType = 'MedicationRequest' and status = 'active').medicationCodeableConcept.coding.code",
    fhirpath_r4_model
  ),
  dosage: "1xDay",
  bp_diastolic: average(
    fhirpath.evaluate(
      fhirBundle,
      "Bundle.entry.resource.component.where(code.coding.code = '8462-4').valueQuantity.value",
      fhirpath_r4_model
    )
  ),
  bp_systolic: average(
    fhirpath.evaluate(
      fhirBundle,
      "Bundle.entry.resource.component.where(code.coding.code = '8480-6').valueQuantity.value",
      fhirpath_r4_model
    )
  ),
});
