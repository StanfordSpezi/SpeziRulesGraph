const express = require("express");
const fhirpath = require("fhirpath");
const fhirpath_r4_model = require("fhirpath/fhir-context/r4");

const { Engine } = require("json-rules-engine");

const app = express();
const port = 3000;
// increase limit as FHIR bundles can be quite large
app.use(express.json({ limit: "10mb" }));

let engine = new Engine();

app.post("/addRules", (req, res) => {
  const rules = req.body;
  rules.map((rule) => engine.addRule(rule));
  res.send("Rules added successfully");
});

app.post("/evaluate", (req, res) => {
  const fhirBundle = req.body;

  const facts = {
    medication: fhirpath.evaluate(
      fhirBundle,
      "Bundle.entry.resource.where(resourceType = 'MedicationRequest' and status = 'active').medicationCodeableConcept.coding.code",
      fhirpath_r4_model
    ),
    dosage: 1,
    bp_diastolic: average(
      fhirpath.evaluate(
        fhirBundle,
        "Bundle.entry.resource.where(component.code.coding.code = '8462-4').component.valueQuantity.value",
        fhirpath_r4_model
      )
    ),
    bp_systolic: average(
      fhirpath.evaluate(
        fhirBundle,
        "Bundle.entry.resource.where(component.code.coding.code = '8480-6').component.valueQuantity.value",
        fhirpath_r4_model
      )
    ),
  };

  engine.run(facts).then(({ events }) => {
    messages = [];
    events.map((event) => {
      messages.push(event.params.message);
      // todo: write back to patient fhir bundle the change in mediaction dosage to send it to the EHR system
      console.log("update dosage to: " + event.params.dosage);
    });

    res.send(messages);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// function to calculate avergae of elements of a list
function average(list) {
  return list.reduce((prev, curr) => prev + curr) / list.length;
}
