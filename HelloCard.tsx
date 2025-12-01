import React from "react";

type HelloCardProps = {
  name: string;
  tagline?: string;
};

export default function HelloCard({ name, tagline = "Welcome to Plug-N-Learn!" }: HelloCardProps) {
  return (
    <div className="p-6 rounded-2xl shadow-md border">
      <h2 className="text-xl font-semibold">Hello, {name}! 👋</h2>
      <p className="mt-1">{tagline}</p>

      {/* 👇 New button goes here */}
      <button
        className="mt-3 px-3 py-1 rounded-full border text-sm"
        onClick={() => alert(`Hi ${name}!`)}
      >
        Say Hi
      </button>
    </div>
  );
}
