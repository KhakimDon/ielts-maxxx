"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";

export default function BookPage() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white py-10">
      <h1 className="text-3xl font-bold text-[#fca311] mb-6">
        IELTS MAXXX 1.0
      </h1>

      <Document
        file="/book.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={index + 1} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}
