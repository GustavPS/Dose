import { useEffect } from 'react';
let isHydration = true;
export default function useHydration() {
    useEffect(() => {
        setTimeout(() => {
            isHydration = false;
        }, 1);
    }, []);
    return isHydration;
}
