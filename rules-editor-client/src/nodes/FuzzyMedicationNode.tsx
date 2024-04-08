import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import useStore from "../state/store";
import CloseButton from "../components/CloseButton";
import { useEffect } from "react";

export type FuzzyMedicationNodeData = {
  label?: string;
};

export function FuzzyMedicationNode({
  id,
  data,
}: NodeProps<FuzzyMedicationNodeData>) {
  const setNodes = useStore((s) => s.setNodes);
  const nodes = useStore((s) => s.nodes);

  const filterNodes = () => {
    const newNodes = nodes.filter((n) => n.id !== id);
    setNodes(newNodes);
  };

  const updateNodeDosage = useStore((s) => s.updateNodeDosage);

  useEffect(() => {
    updateNodeDosage(id, "Amlodipine");
  }, []);

  return (
    <div className="bg-white min-w-48 rounded-xl border-yellow-400 border-2 p-3">
      <div id="header" className="flex flex-row justify-between">
        {data.label && <div className="text-lg">{data.label}</div>}
        <CloseButton onClick={filterNodes} />
      </div>

      <div className="space-y-2 pt-2">
        <div>
          <select className="select w-full bg-gray-100 p-2 rounded-md">
            <option disabled selected>
              Amlodipine
            </option>
          </select>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className=" !bg-teal-500 w-2 h-8 rounded-md"
      />
    </div>
  );
}
