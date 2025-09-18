"use client";

export default function BookViewer() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold text-[#fca311] mb-6">
        IELTS MAXXX 1.0
      </h1>

      <iframe
        src="/book.pdf"
        className="w-full h-full"
        style={{ minHeight: "90vh" }}
        title="IELTS Book"
      />
    </div>
  );
}
