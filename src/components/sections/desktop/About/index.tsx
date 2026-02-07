import AboutShell from './Shell';
import { AboutPhilosophyCard, AboutExperienceCard, AboutDoctorBlock, AboutEditorialBlock } from './Content';

const DesktopAbout = () => {
    return (
        <AboutShell
            philosophyCard={<AboutPhilosophyCard />}
            experienceCard={<AboutExperienceCard />}
            doctorBlock={<AboutDoctorBlock />}
            editorialBlock={<AboutEditorialBlock />}
        />
    );
};

export default DesktopAbout;
