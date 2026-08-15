"use client";

import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Project, Certification, Language } from "@/types/cv";
import { Plus, Trash2, ChevronDown, ChevronUp, FolderOpen, Award, Languages } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// ─── Projects Form ─────────────────────────────────────────────────────────────

export function ProjectsForm() {
  const { cvData, updateCVData } = useCVContext();
  const [expanded, setExpanded] = useState<string | null>(null);

  const addProject = () => {
    const p: Project = { id: uuidv4(), name: "", description: "", technologies: [], url: "", github: "", startDate: "", endDate: "" };
    updateCVData({ projects: [...cvData.projects, p] });
    setExpanded(p.id);
  };

  const updateProj = (id: string, field: keyof Project, value: unknown) => {
    updateCVData({ projects: cvData.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  const removeProj = (id: string) => updateCVData({ projects: cvData.projects.filter(p => p.id !== id) });

  return (
    <div className="space-y-3">
      {cvData.projects.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-xl">
          <FolderOpen size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No projects added yet</p>
        </div>
      )}

      {cvData.projects.map((proj, idx) => (
        <div key={proj.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer" onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}>
            <div className="flex items-center gap-2">
              <FolderOpen size={14} className="text-yellow-400" />
              <p className="text-sm font-medium text-white">{proj.name || `Project ${idx + 1}`}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); removeProj(proj.id); }} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
              {expanded === proj.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>

          {expanded === proj.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-700 pt-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Project Name" value={proj.name} onChange={v => updateProj(proj.id, "name", v)} placeholder="My Awesome App" />
                <Input label="Technologies (comma-separated)" value={proj.technologies.join(", ")} onChange={v => updateProj(proj.id, "technologies", v.split(",").map(t => t.trim()).filter(Boolean))} placeholder="React, Node.js, MongoDB" />
                <Input label="Start Date" value={proj.startDate} onChange={v => updateProj(proj.id, "startDate", v)} placeholder="Jan 2023" />
                <Input label="End Date" value={proj.endDate} onChange={v => updateProj(proj.id, "endDate", v)} placeholder="Mar 2023" />
                <Input label="Live URL (optional)" value={proj.url || ""} onChange={v => updateProj(proj.id, "url", v)} placeholder="https://myapp.com" />
                <Input label="GitHub URL (optional)" value={proj.github || ""} onChange={v => updateProj(proj.id, "github", v)} placeholder="github.com/user/repo" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
                <textarea value={proj.description} onChange={e => updateProj(proj.id, "description", e.target.value)} placeholder="What did you build and what impact did it have?" rows={3} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={addProject} className="w-full py-2.5 border-2 border-dashed border-teal-500/40 rounded-xl text-teal-400 hover:border-teal-500 hover:text-teal-300 hover:bg-teal-500/5 transition-all flex items-center justify-center gap-2 text-sm">
        <Plus size={16} /> Add Project
      </button>
    </div>
  );
}

// ─── Certifications Form ──────────────────────────────────────────────────────

export function CertificationsForm() {
  const { cvData, updateCVData } = useCVContext();
  const [expanded, setExpanded] = useState<string | null>(null);

  const addCert = () => {
    const c: Certification = { id: uuidv4(), name: "", issuer: "", date: "", expiryDate: "", credentialId: "", url: "" };
    updateCVData({ certifications: [...cvData.certifications, c] });
    setExpanded(c.id);
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    updateCVData({ certifications: cvData.certifications.map(c => c.id === id ? { ...c, [field]: value } : c) });
  };

  const removeCert = (id: string) => updateCVData({ certifications: cvData.certifications.filter(c => c.id !== id) });

  return (
    <div className="space-y-3">
      {cvData.certifications.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-xl">
          <Award size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No certifications added yet</p>
        </div>
      )}

      {cvData.certifications.map((cert, idx) => (
        <div key={cert.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer" onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}>
            <div className="flex items-center gap-2">
              <Award size={14} className="text-amber-400" />
              <p className="text-sm font-medium text-white">{cert.name || `Certification ${idx + 1}`}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); removeCert(cert.id); }} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
              {expanded === cert.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>

          {expanded === cert.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-700 pt-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Certification Name" value={cert.name} onChange={v => updateCert(cert.id, "name", v)} placeholder="AWS Solutions Architect" />
                <Input label="Issuing Organization" value={cert.issuer} onChange={v => updateCert(cert.id, "issuer", v)} placeholder="Amazon Web Services" />
                <Input label="Issue Date" value={cert.date} onChange={v => updateCert(cert.id, "date", v)} placeholder="Mar 2023" />
                <Input label="Expiry Date (optional)" value={cert.expiryDate || ""} onChange={v => updateCert(cert.id, "expiryDate", v)} placeholder="Mar 2026" />
                <Input label="Credential ID (optional)" value={cert.credentialId || ""} onChange={v => updateCert(cert.id, "credentialId", v)} placeholder="ABC123XYZ" />
                <Input label="Credential URL (optional)" value={cert.url || ""} onChange={v => updateCert(cert.id, "url", v)} placeholder="https://verify.cert.com/..." />
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={addCert} className="w-full py-2.5 border-2 border-dashed border-teal-500/40 rounded-xl text-teal-400 hover:border-teal-500 hover:text-teal-300 hover:bg-teal-500/5 transition-all flex items-center justify-center gap-2 text-sm">
        <Plus size={16} /> Add Certification
      </button>
    </div>
  );
}

// ─── Languages Form ──────────────────────────────────────────────────────────

const PROFICIENCY_LEVELS: Language["proficiency"][] = ["Basic", "Conversational", "Fluent", "Native"];

export function LanguagesForm() {
  const { cvData, updateCVData } = useCVContext();
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState<Language["proficiency"]>("Fluent");

  const addLanguage = () => {
    if (!name.trim()) return;
    updateCVData({ languages: [...cvData.languages, { id: uuidv4(), name, proficiency }] });
    setName("");
  };

  const removeLanguage = (id: string) => updateCVData({ languages: cvData.languages.filter(l => l.id !== id) });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addLanguage()}
          placeholder="Language name"
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={proficiency}
          onChange={e => setProficiency(e.target.value as Language["proficiency"])}
          className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {PROFICIENCY_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button onClick={addLanguage} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
        </button>
      </div>

      {cvData.languages.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-gray-700 rounded-xl">
          <Languages size={28} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No languages added yet</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {cvData.languages.map(lang => (
          <div key={lang.id} className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-3 py-1.5">
            <span className="text-sm text-white">{lang.name}</span>
            <span className="text-xs text-gray-400">{lang.proficiency}</span>
            <button onClick={() => removeLanguage(lang.id)} className="text-gray-500 hover:text-red-400 transition-colors">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared Input ─────────────────────────────────────────────────────────────
function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-300 mb-1">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
      />
    </div>
  );
}

