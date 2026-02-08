import GalleryShell from './Shell';

interface DesktopGalleryProps {
    content: any;
    items: any[];
}

const DesktopGallery = ({ content, items }: DesktopGalleryProps) => {
    return <GalleryShell content={content} items={items} />;
};

export default DesktopGallery;
