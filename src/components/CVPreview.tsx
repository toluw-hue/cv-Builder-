"use client";

import { useCVContext } from "@/context/CVContext";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import { CVData } from "@/types/cv";

interface CVPreviewProps {
  scale?: number;
}

const TEMPLATES: { id: CVData["template"]; label: string; description: string }[] = [
  { id: "modern", label: "Modern", description: "Clean sidebar layout" },
  { id: "classic", label: "Classic", description: "Traditional professional" },
  { id: "creative", label: "Creative", description: "Bold & eye-catching" },
];

const COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#ef4444",
  "#f97316", "#eab308", "#22c55e", "#14b8a6",
  "#3b82f6", "#06b6d4", "#1e293b", "#64748b",
];

export default function CVPreview({ scale = 0.45 }: CVPreviewProps) {
  const { cvData, setTemplate, setPrimaryColor } = useCVContext();

  const TemplateComponent = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
  }[cvData.template];

  return (
    <div className="flex flex-col h-full">
      {/* Template Picker */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-800">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Template</p>
        <div className="flex gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all border ${
                cvData.template === t.id
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
              }`}
            >
              <span className="block font-semibold">{t.label}</span>
              <span className="block text-[10px] opacity-75 mt-0.5">{t.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Picker */}
      <div className="px-4 py-3 border-b border-gray-800">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Accent Color</p>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => setPrimaryColor(color)}
              className={`w-6 h-6 rounded-full transition-all border-2 ${
                cvData.primaryColor === color ? "border-white scale-110" : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Preview Viewport */}
      <div className="flex-1 overflow-auto bg-gray-950 p-4">
        <div className="flex justify-center">
          <div
            className="shadow-2xl"
            style={{
              width: `${210 * scale}mm`,
              height: `${297 * scale}mm`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: "210mm" }}>
              <TemplateComponent data={cvData} scale={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
