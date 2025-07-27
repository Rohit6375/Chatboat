import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AnswerCard({ query, answer = "" }) {
  const [activeTab, setActiveTab] = useState("answer");
  const [cleanedAnswer, setCleanedAnswer] = useState("");
  const [images, setImages] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    const extractContent = () => {
      const imageRegex = /!\[.*?\]\((.*?)\)/g;
      const linkMarkdownRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      const anchorTagRegex = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/g;

      const foundImages = [...answer.matchAll(imageRegex)].map((m) => m[1]);

      const foundLinks = [
        ...[...answer.matchAll(linkMarkdownRegex)].map((m) => ({
          text: m[1],
          url: m[2],
        })),
        ...[...answer.matchAll(anchorTagRegex)].map((m) => ({
          text: m[2],
          url: m[1],
        })),
      ];

      let cleaned = answer
        .replace(imageRegex, "")
        .replace(linkMarkdownRegex, "")
        .replace(anchorTagRegex, "");

      // Remove unwanted labels and headings
      const garbagePhrases = [
        /(?:Cited\s)?Sources?:?/gi,
        /Images?:?/gi,
        /Source\sArticle:?/gi,
        /See\s(image|source)\sabove.?/gi,
        /As\sseen\s(in|on)\s(the\s)?image.?/gi,
        /For\s(images?|sources?),?\ssee\sbelow.?/gi,
      ];

      for (const pattern of garbagePhrases) {
        cleaned = cleaned.replace(pattern, "");
      }

      cleaned = cleaned.trim();

      setImages(foundImages);
      setSources(foundLinks);
      setCleanedAnswer(cleaned);
    };

    extractContent();
  }, [answer]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "answer":
        return (
          <div className="text-white whitespace-pre-line">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {cleanedAnswer}
            </ReactMarkdown>
          </div>
        );
      case "images":
        return (
          <div className="flex flex-wrap gap-4">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index}`}
                className="w-full sm:w-1/2 rounded-xl shadow-md"
              />
            ))}
            {images.length === 0 && (
              <p className="text-gray-400">No images found.</p>
            )}
          </div>
        );
      case "sources":
        return (
          <ul className="list-disc ml-6 text-blue-400">
            {sources.map((src, index) => (
              <li key={index}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {src.text || src.url}
                </a>
              </li>
            ))}
            {sources.length === 0 && (
              <p className="text-gray-400">No sources found.</p>
            )}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#181A20] h-auto rounded-xl shadow-lg p-6 border mb-6 max-w-3xl w-full mx-auto">
      <div className="font-semibold text-white mb-2 text-lg">Q: {query}</div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("answer")}
          className={`px-4 py-2 rounded ${
            activeTab === "answer" ? "bg-white text-black" : "bg-gray-700 text-white"
          }`}
        >
          Answer
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`px-4 py-2 rounded ${
            activeTab === "images" ? "bg-white text-black" : "bg-gray-700 text-white"
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setActiveTab("sources")}
          className={`px-4 py-2 rounded ${
            activeTab === "sources" ? "bg-white text-black" : "bg-gray-700 text-white"
          }`}
        >
          Sources
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
}
