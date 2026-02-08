import ServicesShell from './Shell';
import { ServicesEditorialBlock, ServiceCardContent } from './Content';

interface DesktopServicesProps {
    content: any;
    items: any[];
}

const DesktopServices = ({ content, items }: DesktopServicesProps) => {
    const serviceItems = items.map((spec) => (
        <ServiceCardContent
            key={spec.slug}
            spec={spec}
            imgSrc={spec.image || "/imagen-ph-1.webp"}
            content={content}
        />
    ));

    return (
        <ServicesShell
            editorial={<ServicesEditorialBlock content={content} />}
            items={serviceItems}
        />
    );
};

export default DesktopServices;
