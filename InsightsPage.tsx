import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InsightsPage() {
  const [insight, setInsight] = useState<{ summary: string; anomalies: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const data = [
    { month: "Jan", sales: 100 },
    { month: "Feb", sales: 150 },
    { month: "Mar", sales: 200 },
  ];

  const generateInsight = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Analyze this dataset and find trends or anomalies: ${JSON.stringify(data)}`
        }),
      });
      const result = await res.json();
      setInsight(result);
    } catch {
      alert("Could not generate AI insight.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-lg p-6 shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">📈 AI Data Insights</h2>
      <Button onClick={generateInsight} disabled={loading}>
        {loading ? "Generating..." : "Generate Insight"}
      </Button>

      {insight && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
          <p>{insight.summary}</p>
          {insight.anomalies?.length > 0 && (
            <>
              <h4 className="font-semibold mt-3">Anomalies</h4>
              <ul className="list-disc list-inside text-gray-700">
                {insight.anomalies.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
