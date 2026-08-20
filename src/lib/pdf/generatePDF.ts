import { pdf } from "@react-pdf/renderer";
import React from "react";
import { CVData } from "@/types/cv";
import { ModernPDF }  from "./ModernPDF";
import { ClassicPDF } from "./ClassicPDF";
import { CreativePDF } from "./CreativePDF";

/**
 * Generates a real PDF Blob from the CVData.
 * Runs entirely client-side using @react-pdf/renderer.
 */
export async function generatePDF(data: CVData): Promise<Blob> {
  let element: React.ReactElement;

  switch (data.template) {
    case "classic":
      element = React.createElement(ClassicPDF, { data });
      break;
    case "creative":
      element = React.createElement(CreativePDF, { data });
      break;
    case "modern":
    default:
      element = React.createElement(ModernPDF, { data });
      break;
  }

  const blob = await pdf(element).toBlob();
  return blob;
}
