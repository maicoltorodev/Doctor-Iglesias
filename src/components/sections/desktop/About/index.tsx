import AboutShell from './Shell';
import { AboutPhilosophyCard, AboutExperienceCard, AboutDoctorBlock, AboutEditorialBlock } from './Content';

interface DesktopAboutProps {
    content: any;
}

const DesktopAbout = ({ content }: DesktopAboutProps) => {
    return (
        <AboutShell
            philosophyCard={<AboutPhilosophyCard content={content.philosophy} />}
            experienceCard={<AboutExperienceCard content={content.experience} />}
            doctorBlock={<AboutDoctorBlock content={content.doctor} />}
            editorialBlock={<AboutEditorialBlock content={content.editorial} />}
        />
    );
};

export default DesktopAbout;
