import ResultsShell from './Shell';
import { ResultsEditorial, ResultComparisonContent } from './Content';

interface MobileResultsProps {
    content: any;
    items: any[];
}

const MobileResults = ({ content, items }: MobileResultsProps) => {
    const resultItems = items.map((item) => (
        <ResultComparisonContent key={item.id} item={item} content={content} />
    ));

    return (
        <ResultsShell
            editorial={<ResultsEditorial content={content} />}
            items={resultItems}
        />
    );
};

export default MobileResults;
