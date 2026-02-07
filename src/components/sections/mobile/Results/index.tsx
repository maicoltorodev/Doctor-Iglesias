import ResultsShell from './Shell';
import { ResultsEditorial, ResultComparisonContent } from './Content';

const MobileResults = () => {
    const resultsData = [
        { title: "Antiacné", id: "01", before: "/resultados/resultado-1.png", after: "/resultados/resultado-2.png" },
        { title: "Perfilamiento", id: "02", before: "/resultados/resultado-1.png", after: "/resultados/resultado-2.png" },
        { title: "Lipomax", id: "03", before: "/resultados/resultado-1.png", after: "/resultados/resultado-2.png" }
    ];

    const resultItems = resultsData.map((item) => (
        <ResultComparisonContent key={item.id} item={item} />
    ));

    return (
        <ResultsShell
            editorial={<ResultsEditorial />}
            items={resultItems}
        />
    );
};

export default MobileResults;
