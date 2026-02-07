import HeroShell from './Shell';
import { HeroBackground, HeroLogo, HeroText, HeroCTA } from './Content';

const DesktopHero = () => {
    return (
        <HeroShell
            background={<HeroBackground />}
            logo={<HeroLogo />}
            text={<HeroText />}
            cta={<HeroCTA />}
        />
    );
};

export default DesktopHero;
