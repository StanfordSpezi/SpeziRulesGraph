import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import useStore from "../state/store";
import { useEffect } from "react";

export type InitialNodeData = {
  label?: string;
};

export function InitialNode({ id, data }: NodeProps<InitialNodeData>) {
  const updateNodeDosage = useStore((s) => s.updateNodeDosage);

  useEffect(() => {
    updateNodeDosage(id, "No Amlodipine");
  }, []);

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="bg-white w-48 rounded-xl border-gray-400 border-2 p-3">
      {data.label && <div className="text-lg">{data.label}</div>}

      <div className="space-y-2 pt-2">
        <div>
          <select className="select w-full bg-gray-100 p-2 rounded-md">
            <option disabled selected>
              No Amlodipine
            </option>
          </select>
        </div>

        {/* <div>
          <select className="select w-full bg-gray-100 p-2 rounded-md">
            <option disabled selected>
              0xDay
            </option>
          </select>
        </div> */}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className=" !bg-teal-500 w-2 h-8 rounded-md"
      />
    </div>
  );
}
