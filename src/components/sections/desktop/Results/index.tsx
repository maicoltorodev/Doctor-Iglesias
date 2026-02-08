import ResultsShell from './Shell';
import { ResultsEditorialBlock, ResultComparisonContent } from './Content';

interface DesktopResultsProps {
    content: any;
    items: any[];
}

const DesktopResults = ({ content, items }: DesktopResultsProps) => {
    const resultItems = items.map((item) => (
        <ResultComparisonContent key={item.id} item={item} content={content} />
    ));

    return (
        <ResultsShell
            editorial={<ResultsEditorialBlock content={content} />}
            items={resultItems}
        />
    );
};

export default DesktopResults;
