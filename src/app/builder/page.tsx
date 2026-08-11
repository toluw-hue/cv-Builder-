"use client";

import { useState, useRef } from "react";
import { useCVContext } from "@/context/CVContext";
import CVPreview from "@/components/CVPreview";
import PersonalInfoForm from "@/components/editor/PersonalInfoForm";
import ExperienceForm from "@/components/editor/ExperienceForm";
import EducationForm from "@/components/editor/EducationForm";
import SkillsForm from "@/components/editor/SkillsForm";
import { ProjectsForm, CertificationsForm, LanguagesForm } from "@/components/editor/OtherForms";
import PaymentModal from "@/components/PaymentModal";
import {
  User, Briefcase, GraduationCap, Zap, FolderOpen, Award, Languages,
  Download, Eye, EyeOff, RotateCcw, Loader2, CheckCircle
} from "lucide-react";

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: User, component: PersonalInfoForm },
  { id: "experience", label: "Experience", icon: Briefcase, component: ExperienceForm },
  { id: "education", label: "Education", icon: GraduationCap, component: EducationForm },
  { id: "skills", label: "Skills", icon: Zap, component: SkillsForm },
  { id: "projects", label: "Projects", icon: FolderOpen, component: ProjectsForm },
  { id: "certifications", label: "Certifications", icon: Award, component: CertificationsForm },
  { id: "languages", label: "Languages", icon: Languages, component: LanguagesForm },
];

export default function BuilderPage() {
  const { cvData, hasPayment, setHasPayment, resetCV } = useCVContext();
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const ActiveComponent = SECTIONS.find(s => s.id === activeSection)?.component || PersonalInfoForm;

  const handleDownload = async () => {
    if (!hasPayment) {
      setShowPayment(true);
      return;
    }
    await triggerDownload();
  };

  const triggerDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) throw new Error("PDF generation failed");

      const html = await response.text();

      // Open in a new window and trigger print dialog (user selects "Save as PDF")
      const printWindow = window.open("", "_blank", "width=900,height=700");
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
          }, 500);
        };
      } else {
        // Fallback: download as HTML
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${cvData.personalInfo.fullName || "My-CV"}-CV.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const completeness = (() => {
    let score = 0;
    const p = cvData.personalInfo;
    if (p.fullName) score += 15;
    if (p.email) score += 10;
    if (p.phone) score += 5;
    if (p.jobTitle) score += 10;
    if (p.summary) score += 15;
    if (cvData.experience.length > 0) score += 20;
    if (cvData.education.length > 0) score += 10;
    if (cvData.skills.length > 0) score += 15;
    return Math.min(score, 100);
  })();

  return (
    <div className="h-screen flex flex-col bg-gray-950 overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">CV</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-none">CV Builder Pro</h1>
            <p className="text-gray-500 text-xs mt-0.5">
              {cvData.personalInfo.fullName || "Untitled Resume"}
            </p>
          </div>
        </div>

        {/* Completeness Bar */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{completeness}% complete</span>
            <div className="w-24 bg-gray-800 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completeness}%`, backgroundColor: completeness === 100 ? "#22c55e" : "#6366f1" }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            className="lg:hidden flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {showPreviewMobile ? <EyeOff size={16} /> : <Eye size={16} />}
            Preview
          </button>
          <button
            onClick={() => { if (confirm("Reset all CV data? This cannot be undone.")) resetCV(); }}
            className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            title="Reset CV"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50"
          >
            {downloading ? (
              <><Loader2 size={14} className="animate-spin" /> Generating...</>
            ) : downloaded ? (
              <><CheckCircle size={14} /> Downloaded!</>
            ) : hasPayment ? (
              <><Download size={14} /> Download PDF</>
            ) : (
              <><Download size={14} /> Download · ₦500</>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Section Navigation */}
        <nav className="w-14 md:w-52 bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="p-2 space-y-1 flex-1">
            {SECTIONS.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => { setActiveSection(section.id); setShowPreviewMobile(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="hidden md:block text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Middle: Editor */}
        <div className={`flex-1 overflow-y-auto bg-gray-950 ${showPreviewMobile ? "hidden lg:block" : "block"}`}>
          <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-5">
              <h2 className="text-white font-bold text-lg">{SECTIONS.find(s => s.id === activeSection)?.label}</h2>
              <p className="text-gray-400 text-sm mt-0.5">Fill in the details below — your CV updates in real time</p>
            </div>
            <ActiveComponent />
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className={`w-[480px] flex-shrink-0 border-l border-gray-800 ${showPreviewMobile ? "flex-1 w-full" : "hidden lg:flex"} flex-col`}>
          <CVPreview />
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            triggerDownload();
          }}
        />
      )}
    </div>
  );
}
