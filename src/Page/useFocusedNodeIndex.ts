import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { NodeData } from "../utils/types";

type UseFocusedNodeIndexProps = {
  nodes: NodeData[];
};

export const useFocusedNodeIndex = ({
  nodes,
}: UseFocusedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setFocusedNodeIndex((index) => Math.min(index + 1, nodes.length - 1));
      }
      if (event.key === "ArrowUp") {
        setFocusedNodeIndex((index) => Math.max(index - 1, 0));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
