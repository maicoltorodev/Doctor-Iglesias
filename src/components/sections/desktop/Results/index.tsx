import ResultsShell from './Shell';
import { ResultsEditorialBlock, ResultComparisonContent } from './Content';

const DesktopResults = () => {
    // Mobile had id strings, Desktop has same structure
    const resultsData = [
        { title: "Antiacné", id: "01", before: "/resultados/resultado-1.png", after: "/resultados/resultado-2.png" },
        { title: "Perfilamiento", id: "02", before: "/resultados/resultado-3.webp", after: "/resultados/resultado-4.webp" },
        { title: "Lipomax", id: "03", before: "/resultados/resultado-5.webp", after: "/resultados/resultado-6.webp" }
    ];

    const resultItems = resultsData.map((item) => (
        <ResultComparisonContent key={item.id} item={item} />
    ));

    return (
        <ResultsShell
            editorial={<ResultsEditorialBlock />}
            items={resultItems}
        />
    );
};

export default DesktopResults;
