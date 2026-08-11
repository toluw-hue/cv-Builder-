"use client";

import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Skill } from "@/types/cv";
import { Plus, Trash2, Zap } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const SKILL_LEVELS: Skill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LEVEL_COLORS = { Beginner: "bg-gray-500", Intermediate: "bg-blue-500", Advanced: "bg-indigo-500", Expert: "bg-purple-500" };

const SUGGESTED_CATEGORIES = ["Technical", "Design", "Management", "Communication", "Languages", "Tools", "Other"];

export default function SkillsForm() {
  const { cvData, updateCVData } = useCVContext();
  const [newSkill, setNewSkill] = useState({ name: "", level: "Intermediate" as Skill["level"], category: "Technical" });

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    const skill: Skill = { id: uuidv4(), ...newSkill };
    updateCVData({ skills: [...cvData.skills, skill] });
    setNewSkill({ name: "", level: "Intermediate", category: newSkill.category });
  };

  const removeSkill = (id: string) => {
    updateCVData({ skills: cvData.skills.filter(s => s.id !== id) });
  };

  const updateSkillLevel = (id: string, level: Skill["level"]) => {
    updateCVData({ skills: cvData.skills.map(s => s.id === id ? { ...s, level } : s) });
  };

  const groupedSkills = cvData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-4">
      {/* Add Skill Form */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
        <p className="text-sm font-medium text-gray-200">Add a Skill</p>
        <div className="grid grid-cols-3 gap-2">
          <input
            value={newSkill.name}
            onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && addSkill()}
            placeholder="Skill name"
            className="col-span-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={newSkill.level}
            onChange={e => setNewSkill(s => ({ ...s, level: e.target.value as Skill["level"] }))}
            className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select
            value={newSkill.category}
            onChange={e => setNewSkill(s => ({ ...s, category: e.target.value }))}
            className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SUGGESTED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button
          onClick={addSkill}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Skill
        </button>
      </div>

      {/* Skills Display */}
      {Object.keys(groupedSkills).length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-gray-700 rounded-xl">
          <Zap size={28} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm">No skills added yet</p>
          <p className="text-gray-500 text-xs mt-1">Add skills to showcase your expertise</p>
        </div>
      )}

      {Object.entries(groupedSkills).map(([category, skills]) => (
        <div key={category}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{category}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1.5 group">
                <div className={`w-1.5 h-1.5 rounded-full ${LEVEL_COLORS[skill.level]}`} />
                <span className="text-sm text-white">{skill.name}</span>
                <select
                  value={skill.level}
                  onChange={e => updateSkillLevel(skill.id, e.target.value as Skill["level"])}
                  className="text-xs text-gray-400 bg-transparent border-none outline-none cursor-pointer"
                >
                  {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <button onClick={() => removeSkill(skill.id)} className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
