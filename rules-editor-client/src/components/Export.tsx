import React from "react";
import useStore from "../state/store";
import { Rule } from "../model/Rule";

const Export: React.FC = () => {
  const edges = useStore((s) => s.edges);
  const nodes = useStore((s) => s.nodes);

  const reverseOperator = (operator: string) => {
    switch (operator) {
      case "equal":
        return "notEqual";
      case "notEqual":
        return "equal";
      case "greaterThan":
        return "lessThan";
      case "lessThan":
        return "greaterThan";
      case "contains":
        return "doesNotContain";
      case "doesNotContain":
        return "contains";
      default:
        return "";
    }
  };

  const handleExport = () => {
    const transitionRules = edges.map((edge: any) => {
      const currentMedication = nodes.find(
        (node: any) => node.id === edge.source
      );
      const newMedication = nodes.find((node: any) => node.id === edge.target);

      const rule = new Rule();
      // first, match the patient to a node based on dosage/schedule
      if (currentMedication?.data.dosage) {
        rule.addCondition(
          "dosages",
          "contains",
          currentMedication?.data.dosage
        );
      }
      if (currentMedication?.data.schedule) {
        rule.addCondition(
          "schedule",
          "equal",
          currentMedication?.data.schedule
        );
      }

      // add rule conditions based on the edge to transition to the new medication
      if (edge.data.fact && edge.data.operator && edge.data.value) {
        rule.addCondition(edge.data.fact, edge.data.operator, edge.data.value);
      }

      rule.setEvent(
        "change-medication",
        "Current medication is: " +
          currentMedication?.data.dosage +
          ", " +
          currentMedication?.data.schedule +
          "; New medication is: " +
          newMedication?.data.dosage +
          ", " +
          newMedication?.data.schedule,
        newMedication?.data.dosage,
        newMedication?.data.schedule
      );

      return rule.toJSON();
    });

    const reflectiveRules = nodes.map((node: any) => {
      const rule = new Rule();
      // first, match the patient to a node based on dosage/schedule
      if (node.data.dosage) {
        rule.addCondition("dosages", "contains", node.data.dosage);
      }
      if (node.data.schedule) {
        console.log(node.data.schedule);
        rule.addCondition("schedule", "equal", node.data.schedule);
      }

      // for every outgoing edge, add a condition that is the reverse of the edge's condition; this means non of the transitions matches and we stay in the node
      edges.forEach((edge: any) => {
        if (edge.source === node.id) {
          if (edge.data.fact && edge.data.operator && edge.data.value) {
            rule.addCondition(
              edge.data.fact,
              reverseOperator(edge.data.operator),
              edge.data.value
            );
          }
        }
      });

      rule.setEvent(
        "keep-medication",
        "Current medication is: " +
          node.data.dosage +
          ", " +
          node.data.schedule,
        node.data.dosage,
        node.data.schedule
      );

      return rule.toJSON();
    });

    const rules = transitionRules.concat(reflectiveRules);

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(rules)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "rules.json";
    link.click();

    alert("Exported!");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    >
      Export
    </button>
  );
};

export default Export;
