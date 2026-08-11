"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PrintContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Short delay to ensure styles are loaded
    const timer = setTimeout(() => {
      window.print();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "40px", color: "#666" }}>
        Preparing your CV for download... A print dialog will appear shortly.
        <br />
        <small>Select "Save as PDF" in the print dialog to download your CV.</small>
      </p>
    </div>
  );
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrintContent />
    </Suspense>
  );
}
