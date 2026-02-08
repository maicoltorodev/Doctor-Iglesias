import ContactShell from './Shell';
import { ContactMapFrame, ContactClinicImage, ContactSocialsGrid, ContactEditorialContent } from './Content';

interface MobileContactProps {
    editorial: any;
    info: any;
}

const MobileContact = ({ editorial, info }: MobileContactProps) => {
    return (
        <ContactShell
            mapFrame={<ContactMapFrame info={info} />}
            clinicImage={<ContactClinicImage info={info} />}
            socialsGrid={<ContactSocialsGrid info={info} />}
            editorial={<ContactEditorialContent content={editorial} />}
        />
    );
};

export default MobileContact;
