import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataAnalyzerProps {
  onAnalyze?: (data: number[]) => void;
}

const DataAnalyzer: React.FC<DataAnalyzerProps> = ({ onAnalyze }) => {
  const [currentDataset, setCurrentDataset] = useState("temperatures");
  const [customInput, setCustomInput] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const datasets: Record<string, number[]> = {
    temperatures: [72, 75, 68, 80, 77, 74, 69, 78, 76, 73],
    testScores: [88, 92, 79, 95, 87, 90, 84, 89, 93, 86],
    salesFigures: [1200, 1450, 980, 1680, 1250, 1520, 1100, 1400],
  };

  // Parse numbers from user text input
  const parseNumbers = (text: string): number[] => {
    return text
      .split(/[\s,;]+/)
      .map((num) => parseFloat(num))
      .filter((num) => !isNaN(num));
  };

  const analyzeData = () => {
    // If user entered custom data, prioritize that
    const data =
      customInput.trim().length > 0
        ? parseNumbers(customInput)
        : datasets[currentDataset];

    if (data.length === 0) {
      setAnalysis({ error: "No valid numbers found. Please check your input." });
      if (onAnalyze) onAnalyze([]);
      return;
    }

    const sum = data.reduce((total, num) => total + num, 0);
    const average = sum / data.length;
    const maximum = Math.max(...data);
    const minimum = Math.min(...data);
    const range = maximum - minimum;

    const sorted = [...data].sort((a, b) => a - b);
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    const results = {
      sum,
      average: Number(average.toFixed(2)),
      maximum,
      minimum,
      range,
      median: Number(median.toFixed(2)),
      count: data.length,
    };

    setAnalysis(results);
    if (onAnalyze) onAnalyze(data);
  };

  return (
    <Card className="p-4 w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Data Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Dataset dropdown */}
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Choose a Dataset:
        </label>
        <select
          value={currentDataset}
          onChange={(e) => setCurrentDataset(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="temperatures">Temperatures (°F)</option>
          <option value="testScores">Test Scores</option>
          <option value="salesFigures">Sales Figures ($)</option>
        </select>

        {/* Custom input area */}
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Or type your own numbers:
        </label>
        <textarea
          className="w-full p-2 border rounded mb-3"
          rows={3}
          placeholder="Example: 12, 55, 27, 90, 34"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
        />

        <Button onClick={analyzeData} className="w-full mb-3">
          Analyze Data
        </Button>

        {/* Display results */}
        {analysis && (
          <div>
            {analysis.error ? (
              <div className="p-3 bg-red-50 text-red-800 rounded">
                {analysis.error}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 p-4 bg-blue-50 rounded text-sm">
                <div><strong>Count:</strong> {analysis.count}</div>
                <div><strong>Sum:</strong> {analysis.sum}</div>
                <div><strong>Average:</strong> {analysis.average}</div>
                <div><strong>Median:</strong> {analysis.median}</div>
                <div><strong>Maximum:</strong> {analysis.maximum}</div>
                <div><strong>Minimum:</strong> {analysis.minimum}</div>
                <div><strong>Range:</strong> {analysis.range}</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataAnalyzer;
