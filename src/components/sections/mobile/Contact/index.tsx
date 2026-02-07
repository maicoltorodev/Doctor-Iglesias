import ContactShell from './Shell';
import { ContactMapFrame, ContactClinicImage, ContactSocialsGrid, ContactEditorialContent } from './Content';

const MobileContact = () => {
    return (
        <ContactShell
            mapFrame={<ContactMapFrame />}
            clinicImage={<ContactClinicImage />}
            socialsGrid={<ContactSocialsGrid />}
            editorial={<ContactEditorialContent />}
        />
    );
};

export default MobileContact;
