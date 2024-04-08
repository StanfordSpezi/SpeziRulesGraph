import type { EdgeTypes } from "reactflow";
import DecisionEdge from "./DecisionEdge";

export const edgeTypes = {
  // Add your custom edge types here!
  'decision-edge': DecisionEdge
} satisfies EdgeTypes;
