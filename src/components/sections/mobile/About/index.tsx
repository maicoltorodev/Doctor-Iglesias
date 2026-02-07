import AboutShell from './Shell';
import { AboutScreen1, AboutScreen2, AboutScreen3 } from './Content';

const MobileAbout = () => {
    return (
        <AboutShell
            screen1={<AboutScreen1 />}
            screen2={<AboutScreen2 />}
            screen3={<AboutScreen3 />}
        />
    );
};

export default MobileAbout;
