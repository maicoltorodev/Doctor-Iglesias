import TestimonialsShell from './Shell';

interface DesktopTestimonialsProps {
    content: any;
    items: any[];
}

const DesktopTestimonials = ({ content, items }: DesktopTestimonialsProps) => {
    return <TestimonialsShell content={content} items={items} />;
};

export default DesktopTestimonials;
