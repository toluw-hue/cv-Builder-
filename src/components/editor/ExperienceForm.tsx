"use client";

import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Experience } from "@/types/cv";
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function ExperienceForm() {
  const { cvData, updateCVData } = useCVContext();
  const [expanded, setExpanded] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: Experience = {
      id: uuidv4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    };
    updateCVData({ experience: [...cvData.experience, newExp] });
    setExpanded(newExp.id);
  };

  const updateExp = (id: string, field: keyof Experience, value: unknown) => {
    updateCVData({
      experience: cvData.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    });
  };

  const removeExp = (id: string) => {
    updateCVData({ experience: cvData.experience.filter(e => e.id !== id) });
  };

  const addAchievement = (id: string) => {
    const exp = cvData.experience.find(e => e.id === id);
    if (exp) updateExp(id, "achievements", [...exp.achievements, ""]);
  };

  const updateAchievement = (expId: string, idx: number, value: string) => {
    const exp = cvData.experience.find(e => e.id === expId);
    if (exp) {
      const achievements = [...exp.achievements];
      achievements[idx] = value;
      updateExp(expId, "achievements", achievements);
    }
  };

  const removeAchievement = (expId: string, idx: number) => {
    const exp = cvData.experience.find(e => e.id === expId);
    if (exp) {
      updateExp(expId, "achievements", exp.achievements.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="space-y-3">
      {cvData.experience.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-xl">
          <Briefcase size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No experience added yet</p>
          <p className="text-gray-500 text-xs mt-1">Add your work history to stand out</p>
        </div>
      )}

      {cvData.experience.map((exp, idx) => (
        <div key={exp.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600/20 rounded-md flex items-center justify-center">
                <Briefcase size={12} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{exp.position || `Experience ${idx + 1}`}</p>
                {exp.company && <p className="text-xs text-gray-400">{exp.company}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); removeExp(exp.id); }} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
              {expanded === exp.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>

          {expanded === exp.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-700 pt-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Job Title" value={exp.position} onChange={v => updateExp(exp.id, "position", v)} placeholder="Software Engineer" />
                <Input label="Company" value={exp.company} onChange={v => updateExp(exp.id, "company", v)} placeholder="Google" />
                <Input label="Location" value={exp.location} onChange={v => updateExp(exp.id, "location", v)} placeholder="Lagos, Nigeria" />
                <div />
                <Input label="Start Date" value={exp.startDate} onChange={v => updateExp(exp.id, "startDate", v)} placeholder="Jan 2022" />
                <div>
                  {!exp.current && <Input label="End Date" value={exp.endDate} onChange={v => updateExp(exp.id, "endDate", v)} placeholder="Dec 2023" />}
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input type="checkbox" checked={exp.current} onChange={e => updateExp(exp.id, "current", e.target.checked)} className="accent-indigo-500" />
                    <span className="text-xs text-gray-300">Currently working here</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={e => updateExp(exp.id, "description", e.target.value)}
                  placeholder="Brief overview of your role and responsibilities..."
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-gray-300">Key Achievements</label>
                  <button onClick={() => addAchievement(exp.id)} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    <Plus size={12} /> Add
                  </button>
                </div>
                {exp.achievements.map((a, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={a}
                      onChange={e => updateAchievement(exp.id, i, e.target.value)}
                      placeholder="e.g. Increased sales by 30%..."
                      className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button onClick={() => removeAchievement(exp.id, i)} className="text-gray-500 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-2.5 border-2 border-dashed border-indigo-500/40 rounded-xl text-indigo-400 hover:border-indigo-500 hover:text-indigo-300 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <Plus size={16} /> Add Experience
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
