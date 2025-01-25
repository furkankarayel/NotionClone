import { useEffect, useRef, useState } from "react";

export const useOverflowsScreenBottom = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [ overflows, setOverflows ] = useState(false);

    const calculateOverflow = () => {
        
    }

    useEffect(() => {
        if (ref.current) {
            const { bottom } = ref.current.getBoundingClientRect();
            setOverflows(bottom > window.innerHeight);
        }}, []); 

    return { ref, overflows };
}