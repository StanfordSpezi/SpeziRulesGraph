import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "reactflow";
import { initialFacts } from "../model/Fact";

import useStore from "../state/store";
import CloseButton from "../components/CloseButton";

export default function DecisionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const updateEdgeFact = useStore((s) => s.updateEdgeFact);
  const updateEdgeOperator = useStore((s) => s.updateEdgeOperator);
  const updateEdgeValue = useStore((s) => s.updateEdgeValue);
  const setEdges = useStore((s) => s.setEdges);
  const edges = useStore((s) => s.edges);

  const onFactChangeHandler = (event: any) => {
    updateEdgeFact(id, event.target.value);
  };
  const onOperatorChangeHandler = (event: any) => {
    updateEdgeOperator(id, event.target.value);
  };
  const onValueChangeHandler = (event: any) => {
    updateEdgeValue(id, event.target.value);
  };

  const filterEdges = () => {
    const newEdges = edges.filter((e) => e.id !== id);
    setEdges(newEdges);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan bg-white w-52 rounded-xl border-teal-500 border-2 p-3"
        >
          <div id="header" className="flex flex-row justify-between">
            <h1 className="text-lg">Rule</h1>
            <CloseButton onClick={filterEdges} />
          </div>
          <div className="space-y-2 pt-2">
            <select
              className="select w-full bg-gray-100 p-2 rounded-md"
              onChange={onFactChangeHandler}
            >
              <option disabled selected>
                Pick Fact
              </option>
              {initialFacts.map((fact) => (
                <option value={fact.FHIRcode}>{fact.name}</option>
              ))}
            </select>
            <select
              className="select w-full bg-gray-100 p-2 rounded-md"
              onChange={onOperatorChangeHandler}
            >
              <option disabled selected>
                Pick Operator
              </option>
              <option>contains</option>
              <option>doesNotContain</option>
              <option>lessThan</option>
              <option>greaterThan</option>
            </select>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full p-2 text-sm border-2 rounded-md"
              onChange={onValueChangeHandler}
            />
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
