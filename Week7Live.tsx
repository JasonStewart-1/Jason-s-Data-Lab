import React from "react";
import AIChatBox from "../components/AIChatBox";

const Week7Live: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-indigo-700">
            Week 7: AI Chat Tutor
          </h1>
          <p className="text-gray-600">
            Ask questions about data, averages, trends, and outliers. The AI
            will explain concepts in simple language.
          </p>
        </header>

        <section>
          <AIChatBox />
        </section>

        <section className="p-4 bg-white rounded-xl shadow-sm space-y-2">
          <h2 className="text-lg font-semibold">Ideas to Explore</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>
              Ask the AI to explain the difference between average and median.
            </li>
            <li>
              Ask how an outlier might change the story of your Week 4 dataset.
            </li>
            <li>
              Ask how you could visualize trends using charts from Week 5.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Week7Live;
