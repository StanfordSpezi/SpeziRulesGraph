import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import Export from "./components/Export";
import useStore from "./state/store";
import "reactflow/dist/style.css";
import "tailwindcss/tailwind.css";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import AddFuzzyNodeButton from "./components/AddFuzzyNodeButton";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onConnectStart: state.onConnectStart,
  onConnectEnd: state.onConnectEnd,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);

  const { screenToFlowPosition } = useReactFlow();
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onConnectStart,
    onConnectEnd,
  } = useStore(useShallow(selector));

  // small workaround to pass screenToFlowPosition to onConnectEnd in the store
  const handleConnectEnd = (event: any) => {
    onConnectEnd(event, screenToFlowPosition);
  };

  return (
    <div className="wrapper w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={handleConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
        className="bg-gray-50"
      >
        <Background />
        <Controls>
          <div className="flex flex-col">
            <Export />
            <AddFuzzyNodeButton />
          </div>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
  );
}
