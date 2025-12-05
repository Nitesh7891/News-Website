import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category, country }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/${country}.json`;
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, country]);

  return (
    <>
      <h1 className="text-center text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        <b>Latest </b>
        <span className="inline-flex items-center px-2 py-1 rounded-md font-medium bg-red-500 text-white">
          {category.charAt(0).toUpperCase() + category.slice(1)} News
        </span>
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading news...
        </p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No news available.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 sm:gap-8 p-4 sm:p-5 justify-center">
          {articles.map((news, index) => (
            <NewsItem
              key={news.url || index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default NewsBoard;
