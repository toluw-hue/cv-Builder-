"use client";

import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface Props {
  data: CVData;
  scale?: number;
}

export default function ClassicTemplate({ data, scale = 1 }: Props) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages, primaryColor } = data;

  return (
    <div
      className="bg-white font-serif text-gray-900"
      style={{ width: "210mm", minHeight: "297mm", transform: `scale(${scale})`, transformOrigin: "top left", fontSize: "11px" }}
      id="cv-preview"
    >
      {/* Header */}
      <div className="text-center py-8 px-10 border-b-4" style={{ borderColor: primaryColor }}>
        <h1 className="text-5xl font-bold tracking-tight">{p.fullName || "Your Name"}</h1>
        <p className="text-lg mt-2 font-light tracking-widest uppercase" style={{ color: primaryColor }}>
          {p.jobTitle || "Professional Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-5 mt-4 text-xs text-gray-600 font-sans">
          {p.email && <span className="flex items-center gap-1"><Mail size={11} />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1"><Phone size={11} />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1"><MapPin size={11} />{p.location}</span>}
          {p.website && <span className="flex items-center gap-1"><Globe size={11} />{p.website}</span>}
          {p.linkedin && <span className="flex items-center gap-1"><Linkedin size={11} />{p.linkedin}</span>}
          {p.github && <span className="flex items-center gap-1"><Github size={11} />{p.github}</span>}
        </div>
      </div>

      <div className="px-10 py-6 space-y-5 font-sans">
        {/* Summary */}
        {p.summary && (
          <section>
            <SectionTitle title="Professional Summary" color={primaryColor} />
            <p className="text-xs leading-relaxed text-gray-700 mt-2">{p.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <SectionTitle title="Work Experience" color={primaryColor} />
            <div className="space-y-4 mt-2">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-xs">{exp.position}</span>
                      <span className="text-gray-400 mx-2">·</span>
                      <span className="font-semibold text-xs" style={{ color: primaryColor }}>{exp.company}</span>
                      {exp.location && <span className="text-gray-400 text-xs"> · {exp.location}</span>}
                    </div>
                    <span className="text-gray-500 text-xs italic">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>}
                  {exp.achievements.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 ml-3 space-y-0.5 list-disc">
                      {exp.achievements.filter(Boolean).map((a, i) => (
                        <li key={i} className="text-xs text-gray-600">{a}</li>
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
            <SectionTitle title="Education" color={primaryColor} />
            <div className="space-y-3 mt-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xs">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                    <p className="text-xs" style={{ color: primaryColor }}>{edu.institution}</p>
                    {edu.location && <p className="text-gray-400 text-xs">{edu.location}</p>}
                    {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-gray-600 text-xs mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-gray-500 text-xs italic whitespace-nowrap ml-4">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two column: Skills & Languages */}
        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <SectionTitle title="Skills" color={primaryColor} />
              <div className="mt-2 space-y-1">
                {skills.map(skill => (
                  <div key={skill.id} className="flex justify-between text-xs">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-400 italic">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="space-y-4">
            {languages.length > 0 && (
              <section>
                <SectionTitle title="Languages" color={primaryColor} />
                <div className="mt-2 space-y-1">
                  {languages.map(lang => (
                    <div key={lang.id} className="flex justify-between text-xs">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-gray-400 italic">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <SectionTitle title="Certifications" color={primaryColor} />
                <div className="mt-2 space-y-2">
                  {certifications.map(cert => (
                    <div key={cert.id}>
                      <p className="font-semibold text-xs">{cert.name}</p>
                      <p className="text-gray-500 text-xs">{cert.issuer} · {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <SectionTitle title="Projects" color={primaryColor} />
            <div className="space-y-3 mt-2">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-xs">{proj.name}</span>
                    <span className="text-gray-400 text-xs">{proj.startDate} – {proj.endDate}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      <span className="font-semibold">Technologies: </span>
                      {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color }}>{title}</h2>
      <div className="mt-0.5 h-px bg-gray-200" />
    </div>
  );
}
