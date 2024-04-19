import { useState, useEffect, useCallback } from 'react';

export const usePopoverPosition = (ref, isOpen, isMobile) => {
    const [coordinates, setCoordinates] = useState(null);

    const calculateCoordinates = useCallback(() => {
        if (ref.current && !isMobile) {
            const { bottom, left } = ref.current.getBoundingClientRect();
            return { left, top: bottom };
        }
        return null;
    }, [ref, isMobile]);

    useEffect(() => {
        if (isOpen && !isMobile) {
            setCoordinates(calculateCoordinates());
        }
    }, [isOpen, calculateCoordinates, isMobile]);

    useEffect(() => {
        const handleResize = () => {
            if (isOpen && !isMobile) {
                setCoordinates(calculateCoordinates());
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen, calculateCoordinates, isMobile]);

    return coordinates;
};
