// src/pages/Index.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function IndexPage() {
  // default background color (light gray)
  const [bgColor, setBgColor] = useState<string>("#f3f4f6");

  return (
    <div
      className="min-h-screen p-6 transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-sm mb-2">
          Jason’s Data Lab 🚀
        </h1>
        <p className="text-gray-700 text-lg">Welcome to Data Discovery Plug</p>
      </header>

      {/* Color Picker (Rainbow Wheel) */}
      <section className="max-w-xl mx-auto mb-10">
        <Card className="shadow-md border border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-700">
              🎨 Choose Background Color
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Use the color wheel to pick <span className="font-semibold">any</span>{" "}
              background color for the site.
            </p>

            <div className="flex items-center gap-4">
              {/* Color input shows a rainbow wheel when clicked */}
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-12 w-24 cursor-pointer border rounded-md bg-transparent"
                aria-label="Pick background color"
              />

              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-500 tracking-wide">
                  Selected Color
                </span>
                <span className="font-mono text-sm">{bgColor}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Tip: Try a soft pastel like <code>#e0f2fe</code> (light blue) or{" "}
              <code>#fef3c7</code> (warm yellow).
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Week 3 Card */}
      <section className="max-w-3xl mx-auto mb-10">
        <Card className="shadow-md border border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-700">
              Week 3: Interactive Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Explore data interactivity and analysis tools from Week 3.
            </p>
            <Link to="/week3">
              <Button className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition">
                Open Week 3 Interactive Demo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Week 4 Card */}
      <section className="max-w-3xl mx-auto mb-10">
        <Card className="shadow-md border border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-700">
              Week 4: Advanced Data Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Upload, analyze, and visualize datasets using React and
              TypeScript.
            </p>
            <Link to="/week4">
              <Button className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition">
                Open Week 4 Analysis
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Week 5 Card */}
      <section className="max-w-3xl mx-auto mb-10">
        <Card className="shadow-md border border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-700">
              Week 5: Charts &amp; Data Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Build bar, line, pie, and scatter charts using Recharts.
            </p>
            <Link to="/week5">
              <Button className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition">
                Open Week 5 Charts Demo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Week 7 Card */}
      <section className="max-w-3xl mx-auto mb-10">
        <Card className="shadow-md border border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-700">
              Week 7: AI Data Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Ask questions about data and let an AI tutor explain concepts like
              averages, trends, and outliers.
            </p>
            <Link to="/week7">
              <Button className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition">
                Open Week 7 AI Chat
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center mt-10 text-gray-600 text-sm">
        <p>Built with ❤️ using React, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
}
