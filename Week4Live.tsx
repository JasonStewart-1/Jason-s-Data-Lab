// src/pages/Week4Live.tsx
import React from "react";
import DataAnalyzer from "../components/DataAnalyzer";
import SimpleNameInput from "../components/SimpleNameInput";

const Week4Live: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-indigo-700">
            Week 4: Data Processing &amp; Analysis
          </h1>
          <p className="text-gray-600">
            Practice array methods and build a data analysis tool in React.
          </p>
        </header>

        {/* Two main panels */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* SimpleNameInput */}
          <div className="p-4 bg-white rounded-xl shadow-sm space-y-3">
            <h2 className="text-xl font-semibold">Step 1: Form Practice</h2>
            <p className="text-sm text-gray-600">
              Use the Simple Name Input component to review controlled inputs
              and basic validation.
            </p>
            <SimpleNameInput />
          </div>

          {/* DataAnalyzer */}
          <div className="p-4 bg-white rounded-xl shadow-sm space-y-3">
            <h2 className="text-xl font-semibold">Step 2: Data Analyzer</h2>
            <p className="text-sm text-gray-600">
              Analyze data using JavaScript array methods like{" "}
              <code>map</code>, <code>filter</code>, and <code>reduce</code>.
            </p>
            <DataAnalyzer />
          </div>
        </section>

        {/* Optional challenges */}
        <section className="p-4 bg-white rounded-xl shadow-sm space-y-2">
          <h2 className="text-lg font-semibold">Challenges</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Add a new dataset to the DataAnalyzer.</li>
            <li>Show only values above the average.</li>
            <li>Highlight the minimum and maximum values.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Week4Live;
