"use client";

import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Education } from "@/types/cv";
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function EducationForm() {
  const { cvData, updateCVData } = useCVContext();
  const [expanded, setExpanded] = useState<string | null>(null);

  const addEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
    };
    updateCVData({ education: [...cvData.education, newEdu] });
    setExpanded(newEdu.id);
  };

  const updateEdu = (id: string, field: keyof Education, value: unknown) => {
    updateCVData({
      education: cvData.education.map(e => e.id === id ? { ...e, [field]: value } : e),
    });
  };

  const removeEdu = (id: string) => {
    updateCVData({ education: cvData.education.filter(e => e.id !== id) });
  };

  return (
    <div className="space-y-3">
      {cvData.education.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-xl">
          <GraduationCap size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No education added yet</p>
        </div>
      )}

      {cvData.education.map((edu, idx) => (
        <div key={edu.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600/20 rounded-md flex items-center justify-center">
                <GraduationCap size={12} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{edu.degree || `Education ${idx + 1}`}</p>
                {edu.institution && <p className="text-xs text-gray-400">{edu.institution}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); removeEdu(edu.id); }} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
              {expanded === edu.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>

          {expanded === edu.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-700 pt-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Institution" value={edu.institution} onChange={v => updateEdu(edu.id, "institution", v)} placeholder="University of Lagos" />
                <Input label="Degree" value={edu.degree} onChange={v => updateEdu(edu.id, "degree", v)} placeholder="B.Sc, M.Sc, PhD..." />
                <Input label="Field of Study" value={edu.field} onChange={v => updateEdu(edu.id, "field", v)} placeholder="Computer Science" />
                <Input label="Location" value={edu.location} onChange={v => updateEdu(edu.id, "location", v)} placeholder="Lagos, Nigeria" />
                <Input label="Start Date" value={edu.startDate} onChange={v => updateEdu(edu.id, "startDate", v)} placeholder="Sep 2018" />
                <div>
                  {!edu.current && <Input label="End Date" value={edu.endDate} onChange={v => updateEdu(edu.id, "endDate", v)} placeholder="Jun 2022" />}
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input type="checkbox" checked={edu.current} onChange={e => updateEdu(edu.id, "current", e.target.checked)} className="accent-indigo-500" />
                    <span className="text-xs text-gray-300">Currently studying</span>
                  </label>
                </div>
                <Input label="GPA (optional)" value={edu.gpa || ""} onChange={v => updateEdu(edu.id, "gpa", v)} placeholder="4.5 / 5.0" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Additional Info</label>
                <textarea
                  value={edu.description || ""}
                  onChange={e => updateEdu(edu.id, "description", e.target.value)}
                  placeholder="Awards, relevant coursework, activities..."
                  rows={2}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-2.5 border-2 border-dashed border-indigo-500/40 rounded-xl text-indigo-400 hover:border-indigo-500 hover:text-indigo-300 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <Plus size={16} /> Add Education
      </button>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-300 mb-1">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      />
    </div>
  );
}
