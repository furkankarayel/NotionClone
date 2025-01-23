import { useState } from "react";
import { NodeData } from "../utils/types";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Title } from "./Title";
import { BasicNode } from "../Node/BasicNode";
import { Spacer } from "./Spacer";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";


export const Page = () => {
    const {title, nodes, addNode, setTitle} = useAppState();   
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes });


    return (
        <>
            <Cover />
            <div>
                <Title title={title} changePageTitle={setTitle} addNode={addNode} />
                {nodes.map((node, index) => (
                    <BasicNode
                        key={node.id}
                        node={node}
                        updateFocusedIndex={setFocusedNodeIndex}
                        isFocused={focusedNodeIndex === index}
                        index={index}
                     
                    />
                ))}
                <Spacer handleClick={() => addNode({
                    type: "text", id: nanoid(), value: ""
                }, nodes.length)}
                    showHint={!nodes.length} />
            </div>
        </>
    )
}