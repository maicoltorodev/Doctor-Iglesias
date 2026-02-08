import HeroShell from './Shell';
import { HeroBackground, HeroLogo, HeroText, HeroCTA } from './Content';

interface MobileHeroProps {
    content: any;
}

const MobileHero = ({ content }: MobileHeroProps) => {
    return (
        <HeroShell
            background={<HeroBackground />}
            logo={<HeroLogo />}
            text={<HeroText content={content} />}
            cta={<HeroCTA content={content} />}
        />
    );
};

export default MobileHero;
