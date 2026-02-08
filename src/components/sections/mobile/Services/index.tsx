import ServicesShell from './Shell';
import { ServicesEditorial, ServiceCardContent } from './Content';

interface MobileServicesProps {
    content: any;
    items: any[];
}

const MobileServices = ({ content, items }: MobileServicesProps) => {
    const serviceItems = items.map((spec) => (
        <ServiceCardContent
            key={spec.slug}
            spec={spec}
            imgSrc={spec.image}
            category={content.cards.category}
        />
    ));

    return (
        <ServicesShell
            editorial={<ServicesEditorial content={content} />}
            items={serviceItems}
        />
    );
};

export default MobileServices;
