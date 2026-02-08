import AboutShell from './Shell';
import { AboutScreen1, AboutScreen2, AboutScreen3 } from './Content';

interface MobileAboutProps {
    content: any;
}

const MobileAbout = ({ content }: MobileAboutProps) => {
    return (
        <AboutShell
            screen1={<AboutScreen1 content={content.editorial} />}
            screen2={<AboutScreen2 content={content.philosophy} />}
            screen3={<AboutScreen3 content={content.experience} />}
        />
    );
};

export default MobileAbout;
