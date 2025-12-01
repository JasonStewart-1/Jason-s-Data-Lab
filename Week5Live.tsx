import React, { useState } from "react";
import DataAnalyzer from "../components/DataAnalyzer";
import SimpleChart from "../components/SimpleChart";

export default function Week5Live() {
  // State for chart data (from analyzer)
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);

  // ✅ State for background color
  const [bgColor, setBgColor] = useState("bg-gray-50");

  // Handle analyzer data
  const handleAnalyze = (numbers: number[]) => {
    if (numbers.length === 0) {
      setChartData([]);
      return;
    }

    const transformed = numbers.map((num, idx) => ({
      label: `Data ${idx + 1}`,
      value: num,
    }));

    setChartData(transformed);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${bgColor} p-6`}>
      <h1 className="text-3xl font-bold text-center mb-6">
        Week 5: Interactive Data Visualization Lab
      </h1>

      {/* 🎨 Background Color Selector */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center gap-2">
          <label className="font-medium text-gray-700">Change Background:</label>
          <select
            className="p-2 border rounded"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          >
            <option value="bg-gray-50">Default (Light Gray)</option>
            <option value="bg-white">White</option>
            <option value="bg-blue-50">Blue Tint</option>
            <option value="bg-green-50">Green Tint</option>
            <option value="bg-yellow-50">Yellow Tint</option>
            <option value="bg-pink-50">Pink Tint</option>
            <option value="bg-slate-800 text-white">Dark Mode</option>
            <option value="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
              Gradient
            </option>
          </select>
        </div>
      </div>

      {/* Layout for Analyzer + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <DataAnalyzer onAnalyze={handleAnalyze} />
        </div>
        <div className="flex justify-center">
          <SimpleChart data={chartData} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
        <p>💡 Tip: Change the background color to personalize your data workspace!</p>
      </div>
    </div>
  );
}
