import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import useStore from "../state/store";
import CloseButton from "../components/CloseButton";

export type MedicationNodeData = {
  label?: string;
};

export function MedicationNode({ id, data }: NodeProps<MedicationNodeData>) {
  const updateNodeDosage = useStore((s) => s.updateNodeDosage);
  const updateNodeSchedule = useStore((s) => s.updateNodeSchedule);

  const onDosageChangeHandler = (event: any) => {
    updateNodeDosage(id, event.target.value);
  };
  const onScheduleChangeHandler = (event: any) => {
    updateNodeSchedule(id, event.target.value);
  };

  const setNodes = useStore((s) => s.setNodes);
  const nodes = useStore((s) => s.nodes);
  const filterNodes = () => {
    const newNodes = nodes.filter((n) => n.id !== id);
    setNodes(newNodes);
  };

  return (
    <div className="bg-white w-48 rounded-xl border-gray-400 border-2 p-3">
      <div id="header" className="flex flex-row justify-between">
        {data.label && <div className="text-lg">{data.label}</div>}
        <CloseButton onClick={filterNodes} />
      </div>

      <div className="space-y-2 pt-2">
        <div>
          <select
            className="select w-full bg-gray-100 p-2 rounded-md"
            onChange={onDosageChangeHandler}
          >
            <option disabled selected>
              Pick Dosage
            </option>
            <option>Amlodipine 5mg</option>
            <option>Amlodipine 10mg</option>
          </select>
        </div>

        <div>
          <select
            className="select w-full bg-gray-100 p-2 rounded-md"
            onChange={onScheduleChangeHandler}
          >
            <option disabled selected>
              Pick Schedule
            </option>
            <option>1xDay</option>
            <option>2xDay</option>
          </select>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-black w-2 h-8 rounded-md"
      />
      <Handle
        type="source"
        position={Position.Right}
        className=" !bg-teal-500 w-2 h-8 rounded-md"
      />
    </div>
  );
}
