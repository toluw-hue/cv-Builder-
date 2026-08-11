"use client";

import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Star } from "lucide-react";

interface Props {
  data: CVData;
  scale?: number;
}

export default function CreativeTemplate({ data, scale = 1 }: Props) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages, primaryColor } = data;

  const proficiencyDots = { Basic: 1, Conversational: 2, Fluent: 3, Native: 4 };
  const skillDots = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };

  return (
    <div
      className="bg-white font-sans text-gray-800"
      style={{ width: "210mm", minHeight: "297mm", transform: `scale(${scale})`, transformOrigin: "top left", fontSize: "11px" }}
      id="cv-preview"
    >
      <div className="flex h-full">
        {/* Dark Sidebar */}
        <div className="w-72 flex-shrink-0 min-h-full py-8 px-6 space-y-6 text-white" style={{ backgroundColor: "#1e293b" }}>
          {/* Photo & Name */}
          <div className="text-center">
            {p.photo ? (
              <img src={p.photo} alt={p.fullName} className="w-28 h-28 rounded-full object-cover mx-auto border-4" style={{ borderColor: primaryColor }} />
            ) : (
              <div className="w-28 h-28 rounded-full mx-auto border-4 flex items-center justify-center text-4xl font-bold" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}30`, color: primaryColor }}>
                {(p.fullName || "?")[0]?.toUpperCase()}
              </div>
            )}
            <h1 className="text-xl font-bold mt-4 leading-tight">{p.fullName || "Your Name"}</h1>
            <p className="text-sm mt-1 font-light" style={{ color: primaryColor }}>{p.jobTitle || "Job Title"}</p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: primaryColor }}>Contact</h2>
            {p.email && <ContactItem icon={<Mail size={11} />} text={p.email} />}
            {p.phone && <ContactItem icon={<Phone size={11} />} text={p.phone} />}
            {p.location && <ContactItem icon={<MapPin size={11} />} text={p.location} />}
            {p.website && <ContactItem icon={<Globe size={11} />} text={p.website} />}
            {p.linkedin && <ContactItem icon={<Linkedin size={11} />} text={p.linkedin} />}
            {p.github && <ContactItem icon={<Github size={11} />} text={p.github} />}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Skills</h2>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs text-gray-300">{skill.name}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4].map(d => (
                          <div key={d} className="w-2 h-2 rounded-full" style={{ backgroundColor: d <= skillDots[skill.level] ? primaryColor : "#374151" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Languages</h2>
              <div className="space-y-2">
                {languages.map(lang => (
                  <div key={lang.id}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-300">{lang.name}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4].map(d => (
                          <div key={d} className="w-2 h-2 rounded-full" style={{ backgroundColor: d <= proficiencyDots[lang.proficiency] ? primaryColor : "#374151" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-2">
                  <p className="text-xs font-semibold text-white">{cert.name}</p>
                  <p className="text-xs text-gray-400">{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-8 space-y-5">
          {/* Summary */}
          {p.summary && (
            <section>
              <CreativeSectionTitle title="About Me" color={primaryColor} />
              <p className="text-xs leading-relaxed text-gray-600 mt-2">{p.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <CreativeSectionTitle title="Experience" color={primaryColor} />
              <div className="mt-3 space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-5">
                    {/* Timeline */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
                    <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: primaryColor }} />

                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xs">{exp.position}</h3>
                        <p className="text-xs font-semibold" style={{ color: primaryColor }}>{exp.company}</p>
                        {exp.location && <p className="text-gray-400 text-xs">{exp.location}</p>}
                      </div>
                      <span className="text-xs text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: primaryColor }}>
                        {exp.startDate} – {exp.current ? "Now" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>}
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.achievements.filter(Boolean).map((a, i) => (
                          <li key={i} className="flex gap-1.5 text-xs text-gray-600">
                            <Star size={9} className="flex-shrink-0 mt-0.5" style={{ color: primaryColor, fill: primaryColor }} />
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
              <CreativeSectionTitle title="Education" color={primaryColor} />
              <div className="mt-3 space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-xs">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                          <p className="text-xs" style={{ color: primaryColor }}>{edu.institution}</p>
                          {edu.location && <p className="text-gray-400 text-xs">{edu.location}</p>}
                        </div>
                        <span className="text-gray-400 text-xs">{edu.startDate} – {edu.current ? "Present" : edu.endDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <CreativeSectionTitle title="Projects" color={primaryColor} />
              <div className="mt-3 grid grid-cols-2 gap-3">
                {projects.map(proj => (
                  <div key={proj.id} className="border rounded-lg p-3" style={{ borderColor: `${primaryColor}40` }}>
                    <h3 className="font-bold text-xs">{proj.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>{tech}</span>
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

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-300">
      <span className="flex-shrink-0 opacity-70">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}

function CreativeSectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color }}>{title}</h2>
      <div className="flex-1 h-0.5 rounded-full" style={{ backgroundColor: `${color}30` }} />
    </div>
  );
}
