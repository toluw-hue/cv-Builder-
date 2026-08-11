"use client";

import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface Props {
  data: CVData;
  scale?: number;
}

export default function ModernTemplate({ data, scale = 1 }: Props) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages, primaryColor } = data;

  const skillLevelMap = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 100 };
  const proficiencyMap = { Basic: "Basic", Conversational: "Conversational", Fluent: "Fluent", Native: "Native" };

  return (
    <div
      className="bg-white font-sans text-gray-800"
      style={{ width: "210mm", minHeight: "297mm", transform: `scale(${scale})`, transformOrigin: "top left", fontSize: "11px" }}
      id="cv-preview"
    >
      {/* Header */}
      <div style={{ backgroundColor: primaryColor }} className="px-10 py-8 text-white">
        <div className="flex items-start gap-6">
          {p.photo && (
            <img src={p.photo} alt={p.fullName} className="w-24 h-24 rounded-full object-cover border-4 border-white/30 flex-shrink-0" />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight">{p.fullName || "Your Name"}</h1>
            <p className="text-xl mt-1 opacity-90">{p.jobTitle || "Job Title"}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm opacity-85">
              {p.email && <span className="flex items-center gap-1"><Mail size={12} />{p.email}</span>}
              {p.phone && <span className="flex items-center gap-1"><Phone size={12} />{p.phone}</span>}
              {p.location && <span className="flex items-center gap-1"><MapPin size={12} />{p.location}</span>}
              {p.website && <span className="flex items-center gap-1"><Globe size={12} />{p.website}</span>}
              {p.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} />{p.linkedin}</span>}
              {p.github && <span className="flex items-center gap-1"><Github size={12} />{p.github}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 bg-gray-50 px-6 py-6 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Skills</h2>
              {Array.from(new Set(skills.map(s => s.category))).map(cat => (
                <div key={cat} className="mb-3">
                  {cat && <p className="text-xs font-semibold text-gray-500 mb-1">{cat}</p>}
                  {skills.filter(s => s.category === cat).map(skill => (
                    <div key={skill.id} className="mb-2">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${skillLevelMap[skill.level]}%`, backgroundColor: primaryColor }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Languages</h2>
              {languages.map(lang => (
                <div key={lang.id} className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-500">{proficiencyMap[lang.proficiency]}</span>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-3">
                  <p className="font-semibold text-xs">{cert.name}</p>
                  <p className="text-gray-500 text-xs">{cert.issuer}</p>
                  <p className="text-gray-400 text-xs">{cert.date}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-6 space-y-6">
          {/* Summary */}
          {p.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>Profile</h2>
              <p className="text-xs leading-relaxed text-gray-600">{p.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>Experience</h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id} className="relative pl-4">
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xs">{exp.position}</h3>
                        <p className="font-medium text-xs" style={{ color: primaryColor }}>{exp.company}</p>
                        {exp.location && <p className="text-gray-400 text-xs">{exp.location}</p>}
                      </div>
                      <p className="text-gray-400 text-xs whitespace-nowrap ml-2">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>}
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.achievements.filter(Boolean).map((a, i) => (
                          <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                            <span style={{ color: primaryColor }}>▸</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="relative pl-4">
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xs">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                        <p className="font-medium text-xs" style={{ color: primaryColor }}>{edu.institution}</p>
                        {edu.location && <p className="text-gray-400 text-xs">{edu.location}</p>}
                        {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                      </div>
                      <p className="text-gray-400 text-xs whitespace-nowrap ml-2">
                        {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>Projects</h2>
              <div className="space-y-3">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xs">{proj.name}</h3>
                      <p className="text-gray-400 text-xs">{proj.startDate} – {proj.endDate}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
