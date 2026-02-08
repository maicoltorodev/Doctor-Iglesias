import HeroShell from './Shell';
import { HeroLogo, HeroText, HeroCTA } from './Content';
import { HeroBackground } from './Background';

interface DesktopHeroProps {
    content: any;
}

const DesktopHero = ({ content }: DesktopHeroProps) => {
    return (
        <HeroShell
            background={<HeroBackground content={content} />}
            logo={<HeroLogo />}
            text={<HeroText content={content} />}
            cta={<HeroCTA content={content} />}
        />
    );
};

export default DesktopHero;
