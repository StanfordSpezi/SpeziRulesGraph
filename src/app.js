const express = require("express");
const { getFHIRFacts } = require("./facts");
const { Engine } = require("json-rules-engine");

const app = express();
const port = 3000;
// increase limit as FHIR bundles can be quite large
app.use(express.json({ limit: "10mb" }));

let engine = new Engine();

// add rules to the engine
app.post("/addRules", (req, res) => {
  const rules = req.body;
  rules.map((rule) => engine.addRule(rule));
  res.send("Rules added successfully");
});

// evaluates facts against the rules
app.post("/evaluate", (req, res) => {
  const fhirBundle = req.body;
  const facts = getFHIRFacts(fhirBundle);

  engine.run(facts).then(({ events }) => {
    messages = [];
    events.map((event) => {
      messages.push(event.params.message);
    });

    res.send(messages);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
