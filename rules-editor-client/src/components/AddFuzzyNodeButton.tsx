import React from "react";
import useStore from "../state/store";

const AddFuzzyNodeButton: React.FC = () => {
  const nodes = useStore((s) => s.nodes);
  const setNodes = useStore((s) => s.setNodes);

  const onClick = () => {
    const newNode = [
      {
        id: "fuzzy",
        type: "fuzzy",
        position: { x: 0, y: 200 },
        data: { label: "Fuzzy Medication" },
      },
    ];
    const newNodes = nodes.concat(newNode);
    setNodes(newNodes);
  };

  return (
    <button
      type="button"
      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      onClick={onClick}
    >
      <span className="sr-only">Add Fuzzy Node</span>
      Fuzzy
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
};

export default AddFuzzyNodeButton;
