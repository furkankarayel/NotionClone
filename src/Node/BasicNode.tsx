import { nanoid } from 'nanoid';
import { NodeData } from '../utils/types';
import styles from './Node.module.css';
import { useRef, useEffect, FormEventHandler, KeyboardEventHandler } from 'react';
import { useAppState } from '../state/AppStateContext';

type BasicNodeprops = {
    node: NodeData;
    updateFocusedIndex(index: number): void;
    isFocused: boolean;
    index: number;

}

export const BasicNode = ({
    node,
    updateFocusedIndex,
    isFocused,
    index,

}: BasicNodeprops) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    const { changeNodeValue, addNode, removeNodeByIndex } = useAppState();

    useEffect(() => {
        if (isFocused && nodeRef.current) {
            nodeRef.current?.focus();
        } else {
            nodeRef.current?.blur();
        }
    }, [isFocused]);

    useEffect(() => {
        if (nodeRef.current && !isFocused) {
            nodeRef.current.textContent = node.value;
        }
    }, [node]);

    const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
        const { textContent } = currentTarget;
        changeNodeValue(index, textContent || "");
    }

    const handleClick = () => {
        updateFocusedIndex(index);
    }

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        const target = event.target as HTMLDivElement;
        if (event.key === "Enter") {
            event.preventDefault();
            if (target.textContent?.[0] === '/') {
                return
            }
            addNode({ type: "text", id: nanoid(), value: "" }, index + 1);
            updateFocusedIndex(index + 1);
        }
        if (event.key === "Backspace") {
            if (target.textContent?.length === 0) {
                event.preventDefault();
                removeNodeByIndex(index);
                updateFocusedIndex(index - 1);
            }
            else if (window?.getSelection()?.anchorOffset === 0) {
                event.preventDefault();
                removeNodeByIndex(index - 1);
                updateFocusedIndex(index - 1);
            }
        }

    }

    return (
        <div
            className={styles.node}
            onInput={handleInput}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            ref={nodeRef}
            contentEditable
            suppressContentEditableWarning

        />
    );
};