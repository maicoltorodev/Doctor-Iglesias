import ServicesShell from './Shell';
import { ServicesEditorial, ServiceCardContent } from './Content';
import { SERVICES_LIST } from '@/constants/content';

const MobileServices = () => {
    // Images array logic duplicated from original for consistency
    const images = [
        "/imagen-ph-1.webp",
        "/imagen-ph-2.webp",
        "/imagen-ph-3.webp",
        "/imagen-ph-4.webp"
    ];

    const serviceItems = SERVICES_LIST.map((spec, i) => (
        <ServiceCardContent
            key={spec.slug}
            spec={spec}
            imgSrc={images[i % 4]}
        />
    ));

    return (
        <ServicesShell
            editorial={<ServicesEditorial />}
            items={serviceItems}
        />
    );
};

export default MobileServices;
