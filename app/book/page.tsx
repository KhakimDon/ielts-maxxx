"use client"

import dynamic from "next/dynamic";

const BookViewer = dynamic(() => import("@/app/components/BookViewer"), {
  ssr: false,
});

export default function BookPage() {
  return <BookViewer />;
}