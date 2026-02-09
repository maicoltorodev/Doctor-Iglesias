import React from 'react';
import { EntranceReveal } from '@/components/ui/mobile/EntranceReveal';
import { AboutMarbles } from './Marbles';

interface AboutShellProps {
    screen1: React.ReactNode;
    screen2: React.ReactNode;
    screen3: React.ReactNode;
}

const AboutShell: React.FC<AboutShellProps> = ({ screen1, screen2, screen3 }) => {
    return (
        <section id="nosotros" className="w-fit h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">
                <div className="flex flex-row gap-0 items-center">

                    {/* SCREEN 1 */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <EntranceReveal index={1} delay="400ms" className="w-[85vw] space-y-8">
                            {screen1}
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 2 */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <EntranceReveal index={1} delay="600ms" className="w-60">
                            {screen2}
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 3 */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <EntranceReveal index={1} delay="800ms" className="w-[85vw]">
                            {screen3}
                        </EntranceReveal>
                    </div>

                </div>

                {/* MARBLES (Client Island) */}
                <AboutMarbles index={1} />
            </div>
        </section>
    );
};

export default AboutShell;
