import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  OnConnectStart,
} from "reactflow";
import { initialNodes } from "../nodes";

let id = 1;
const getId = () => `${id++}`;

type RFState = {
  nodes: Node[];
  edges: Edge[];
  connectingNodeId: string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onConnectStart: OnConnectStart;
  onConnectEnd: (event: any, screenToFlowPosition: any) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeDosage: (nodeId: string, dosage: string) => void;
  updateNodeSchedule: (nodeId: string, schedule: string) => void;
  updateEdgeFact: (nodeId: string, fact: string) => void;
  updateEdgeOperator: (nodeId: string, operator: string) => void;
  updateEdgeValue: (nodeId: string, value: string) => void;
};

const useStore = create<RFState>((set, get) => {
  return {
    nodes: initialNodes,
    edges: [],
    connectingNodeId: "0",
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection: Connection) => {
      const edge = { ...connection, type: "decision-edge", animated: true };
      set({
        edges: addEdge(edge, get().edges),
      });
    },
    onConnectStart: (_: any, { nodeId }: any) => {
      set({
        connectingNodeId: nodeId,
      });
    },
    onConnectEnd: (event: any, screenToFlowPosition: any) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Medication ${id}` },
          type: "medication",
          origin: [0.5, 0.0],
        };
        const newEdge = {
          id: id,
          type: "decision-edge",
          source: get().connectingNodeId,
          target: id,
          animated: true,
        };
        set({ nodes: get().nodes.concat(newNode) });
        set({ edges: get().edges.concat(newEdge) });
      }
    },
    setNodes: (nodes: Node[]) => {
      set({ nodes });
    },
    setEdges: (edges: Edge[]) => {
      set({ edges });
    },
    updateNodeDosage: (nodeId: string, dosage: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, dosage } };
          }
          return node;
        }),
      });
    },
    updateNodeSchedule: (nodeId: string, schedule: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, schedule } };
          }
          return node;
        }),
      });
    },
    updateEdgeFact: (edgeId: string, fact: string) => {
      set({
        edges: get().edges.map((edge) => {
          if (edge.id === edgeId) {
            return { ...edge, data: { ...edge.data, fact } };
          }
          return edge;
        }),
      });
    },
    updateEdgeOperator: (edgeId: string, operator: string) => {
      set({
        edges: get().edges.map((edge) => {
          if (edge.id === edgeId) {
            return { ...edge, data: { ...edge.data, operator } };
          }
          return edge;
        }),
      });
    },
    updateEdgeValue: (edgeId: string, value: string) => {
      set({
        edges: get().edges.map((edge) => {
          if (edge.id === edgeId) {
            return { ...edge, data: { ...edge.data, value } };
          }
          return edge;
        }),
      });
    },
  };
});

export default useStore;
