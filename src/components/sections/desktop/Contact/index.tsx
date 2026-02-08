import ContactShell from './Shell';
import { ContactEditorialBlock, ContactMapCard, ContactClinicCard, ContactSocialsCard } from './Content';

interface DesktopContactProps {
    editorial: any;
    info: any;
}

const DesktopContact = ({ editorial, info }: DesktopContactProps) => {
    return (
        <ContactShell
            editorial={<ContactEditorialBlock content={editorial} />}
            mapCard={<ContactMapCard editorial={editorial} info={info} />}
            clinicCard={<ContactClinicCard editorial={editorial} info={info} />}
            socialsCard={<ContactSocialsCard editorial={editorial} info={info} />}
        />
    );
};

export default DesktopContact;
