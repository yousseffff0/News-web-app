import { useEffect,useState } from 'react';
import AddArticleForm from '../components/articles/AddArticleForm';

const AddArticlePage = () => {
    const [articles, setarticles] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAbortController = new AbortController();
        const fetchSignal = fetchAbortController.signal;
        
        const fetchArticles = async () =>{
            try {
                const response = await fetch('http://localhost:3001/article',{
                    signal: fetchSignal,
                });
                const data = await response.json();
                if (!response.ok){
                    throw Error(data.error);
                }
                setarticles(data.articles);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchArticles();

        return () => {
            fetchAbortController.abort();
        };

    },[]);

    if(isLoading){
        return<p>Please wait while we are loading data...</p>
    }

    return (
        <div>
            <AddArticleForm articles={articles}/>
        </div>
    );
};

export default AddArticlePage;