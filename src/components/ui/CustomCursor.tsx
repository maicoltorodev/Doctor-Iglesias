import React from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';

interface CustomCursorProps {
    cursorState: ReturnType<typeof useCustomCursor>;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
    const { cursorRef, cursorDotRef, isHovering, isLogoHovered } = cursorState;
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 1024px)").matches || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [hasMoved, setHasMoved] = React.useState(false);
    const [hasLeft, setHasLeft] = React.useState(false);

    React.useEffect(() => {
        const onMove = () => {
            setHasMoved(true);
            setHasLeft(false);
        };
        const onLeave = () => setHasLeft(true);
        const onEnter = () => setHasLeft(false);

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, []);

    if (isMobile) return null;

    return (
        <>
            {/* OUTER RING */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform mix-blend-difference"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }} // Initial off-screen
            >
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className={`w-8 h-8 border border-white rounded-full transition-all duration-300 ease-out flex items-center justify-center
                        ${!hasMoved || hasLeft ? 'opacity-0' : 'opacity-100'}
                        ${isLogoHovered ? "scale-[3] border-white bg-white" : isHovering ? "scale-[2.5] bg-white/10 border-transparent backdrop-blur-[1px]" : "scale-100"}
                        `}
                    ></div>
                </div>
            </div>

            {/* INNER DOT */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform mix-blend-difference"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }} // Initial off-screen
            >
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className={`w-1 h-1 bg-white rounded-full transition-all duration-300 ease-out
                        ${!hasMoved || hasLeft ? 'opacity-0' : 'opacity-100'}    
                        ${isLogoHovered ? "bg-white scale-[0.5]" : ""}
                        `}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default CustomCursor;
