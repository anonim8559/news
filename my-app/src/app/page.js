"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "/src/components/ui/card";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const key = "cfabea3570d445fdb5787272f1040d52";
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=apple&from=2024-10-22&to=2024-10-22&sortBy=popularity&apiKey=${key}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setNews(json.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Spinner podczas ładowania
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-row flex-wrap items-center justify-center h-screen gap-4 p-4">
      {news.length > 0 ? (
        news.map((item, idx) => (
          <Card key={idx} className="w-[300px] h-[450px] flex flex-col border rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-[120px]">
              <Image
                src={item.urlToImage || "https://th.bing.com/th/id/OIP.CFQ-49RIEVZBy9dJjP-MEwHaEK?w=326&h=183&c=7&r=0&o=5&pid=1.7"}
                alt={item.title || "News image"}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 flex flex-col justify-between flex-grow">
              <h1 className="text-lg font-semibold mb-2 h-[60px] overflow-hidden">{item.title}</h1>
              <p className="text-sm text-gray-600 mb-4 h-[80px] overflow-hidden">{item.content ? item.content.slice(0, 150) + "..." : "No content available"}</p>
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>{item.source?.name || "Unknown source"}</span>
                <span>{item.author || "Unknown author"}</span>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition-colors"
              >
                Read more
              </a>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No news available</div>
      )}
    </div>
  );
}
