import ContactShell from './Shell';
import { ContactEditorialBlock } from './Content';

const DesktopContact = () => {
    return (
        <ContactShell
            editorial={<ContactEditorialBlock />}
        />
    );
};

export default DesktopContact;
