import type { Node, NodeTypes } from "reactflow";
import { MedicationNode } from "./MedicationNode";
import { InitialNode } from "./InitialNode";
import { FuzzyMedicationNode } from "./FuzzyMedicationNode";

export const initialNodes = [
  { id: "0", type: "initial", position: { x: 0, y: 0 }, data: { label: "Start" } },
] satisfies Node[];

export const nodeTypes = {
  "medication": MedicationNode,
  "initial": InitialNode,
  "fuzzy": FuzzyMedicationNode,
} satisfies NodeTypes;
