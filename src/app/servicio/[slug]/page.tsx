import { notFound } from 'next/navigation';
import { isMobileDevice } from "@/lib/device";
import DesktopServiceDetail from '@/components/sections/desktop/ServiceDetail';
import MobileServiceDetail from '@/components/sections/mobile/ServiceDetail';
import { getServiceBySlug, getAllContent } from '@/services/contentService';

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const [service, content] = await Promise.all([
        getServiceBySlug(slug),
        getAllContent()
    ]);
    const isMobile = await isMobileDevice();

    if (!service) {
        notFound();
    }

    if (isMobile) {
        return (
            <MobileServiceDetail
                service={service as any}
                fabContent={content.FAB_CONTENT}
                contactInfo={content.CONTACT_INFO}
            />
        );
    }

    return (
        <DesktopServiceDetail
            service={service as any}
            fabContent={content.FAB_CONTENT}
            contactInfo={content.CONTACT_INFO}
        />
    );
}
