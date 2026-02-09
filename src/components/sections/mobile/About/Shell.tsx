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
        <section id="nosotros" className="w-full min-h-screen relative bg-[#e6e3e8] text-black section-contain py-20">
            <div className="relative z-20 container mx-auto px-6">
                <div className="flex flex-col space-y-16">

                    {/* SCREEN 1 */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal index={1} delay="400ms" className="w-full max-w-4xl space-y-8">
                            {screen1}
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 2 */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal index={1} delay="600ms" className="w-full max-w-md">
                            {screen2}
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 3 */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal index={1} delay="800ms" className="w-full max-w-4xl">
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
