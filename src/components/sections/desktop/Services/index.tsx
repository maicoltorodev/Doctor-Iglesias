import ServicesShell from './Shell';
import { ServicesEditorialBlock, ServiceCardContent } from './Content';
import { SERVICES_LIST } from '@/constants/content';

const DesktopServices = () => {
    const serviceItems = SERVICES_LIST.map((spec) => (
        <ServiceCardContent
            key={spec.slug}
            spec={spec}
            imgSrc={spec.image || "/imagen-ph-1.webp"}
        />
    ));

    return (
        <ServicesShell
            editorial={<ServicesEditorialBlock />}
            items={serviceItems}
        />
    );
};

export default DesktopServices;
