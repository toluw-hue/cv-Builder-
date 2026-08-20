import React from "react";
import {
  Document, Page, View, Text, StyleSheet, Font, Image,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

const skillLevelPct: Record<string, number> = {
  Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 100,
};

function makeStyles(color: string) {
  return StyleSheet.create({
    page:          { fontFamily: "Helvetica", fontSize: 9, color: "#1e293b", backgroundColor: "#ffffff" },
    header:        { backgroundColor: color, color: "#ffffff", paddingHorizontal: 32, paddingVertical: 24, flexDirection: "row", alignItems: "flex-start", gap: 16 },
    photo:         { width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: "rgba(255,255,255,0.4)" },
    headerText:    { flex: 1 },
    name:          { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#ffffff", letterSpacing: -0.5 },
    jobTitle:      { fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 3 },
    contacts:      { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 },
    contactItem:   { fontSize: 8, color: "rgba(255,255,255,0.85)" },
    body:          { flexDirection: "row", flex: 1 },
    sidebar:       { width: 160, backgroundColor: "#f8fafc", paddingHorizontal: 16, paddingVertical: 18, gap: 16 },
    main:          { flex: 1, paddingHorizontal: 24, paddingVertical: 18, gap: 16 },
    sectionTitle:  { fontSize: 8, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.2, color: color, borderBottomWidth: 1.5, borderBottomColor: color, paddingBottom: 3, marginBottom: 8 },
    skillRow:      { marginBottom: 6 },
    skillName:     { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 2 },
    barBg:         { backgroundColor: "#e2e8f0", borderRadius: 2, height: 4 },
    barFill:       { backgroundColor: color, borderRadius: 2, height: 4 },
    langRow:       { flexDirection: "row", justifyContent: "space-between", marginBottom: 4, fontSize: 8 },
    langLevel:     { color: "#94a3b8" },
    certItem:      { marginBottom: 8 },
    certName:      { fontSize: 8, fontFamily: "Helvetica-Bold" },
    certMeta:      { fontSize: 7.5, color: "#94a3b8" },
    expItem:       { marginBottom: 12, paddingLeft: 12, position: "relative" },
    expDot:        { position: "absolute", left: 0, top: 3, width: 6, height: 6, borderRadius: 3, backgroundColor: color },
    expRow:        { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    expTitle:      { fontSize: 8.5, fontFamily: "Helvetica-Bold" },
    expCompany:    { fontSize: 8, color: color, fontFamily: "Helvetica-Bold" },
    expLocation:   { fontSize: 7.5, color: "#94a3b8" },
    expDate:       { fontSize: 7.5, color: "#94a3b8", fontStyle: "italic" },
    expDesc:       { fontSize: 8, color: "#475569", marginTop: 3, lineHeight: 1.5 },
    achievement:   { flexDirection: "row", gap: 4, marginTop: 2 },
    achieveBullet: { color: color, fontSize: 8 },
    achieveText:   { fontSize: 8, color: "#475569", flex: 1 },
    summary:       { fontSize: 8.5, color: "#475569", lineHeight: 1.6 },
    techWrap:      { flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 4 },
    techTag:       { fontSize: 7.5, paddingHorizontal: 5, paddingVertical: 1.5, borderRadius: 3, color: color, backgroundColor: color + "25" },
    projItem:      { marginBottom: 10 },
    projRow:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    projTitle:     { fontSize: 8.5, fontFamily: "Helvetica-Bold" },
    projDate:      { fontSize: 7.5, color: "#94a3b8" },
    projDesc:      { fontSize: 8, color: "#475569", marginTop: 2, lineHeight: 1.4 },
  });
}

export function ModernPDF({ data }: { data: CVData }) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages, primaryColor } = data;
  const S = makeStyles(primaryColor);
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.header}>
          {p.photo ? <Image src={p.photo} style={S.photo} /> : null}
          <View style={S.headerText}>
            <Text style={S.name}>{p.fullName || "Your Name"}</Text>
            <Text style={S.jobTitle}>{p.jobTitle || ""}</Text>
            <View style={S.contacts}>
              {p.email    && <Text style={S.contactItem}>✉ {p.email}</Text>}
              {p.phone    && <Text style={S.contactItem}>☎ {p.phone}</Text>}
              {p.location && <Text style={S.contactItem}>⌖ {p.location}</Text>}
              {p.website  && <Text style={S.contactItem}>⊕ {p.website}</Text>}
              {p.linkedin && <Text style={S.contactItem}>in {p.linkedin}</Text>}
              {p.github   && <Text style={S.contactItem}>⌥ {p.github}</Text>}
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={S.body}>
          {/* Sidebar */}
          <View style={S.sidebar}>
            {skills.length > 0 && (
              <View>
                <Text style={S.sectionTitle}>Skills</Text>
                {categories.map(cat => (
                  <View key={cat}>
                    {cat ? <Text style={{ fontSize: 7.5, color: "#64748b", fontFamily: "Helvetica-Bold", marginBottom: 4 }}>{cat}</Text> : null}
                    {skills.filter(s => s.category === cat).map(skill => (
                      <View key={skill.id} style={S.skillRow}>
                        <Text style={S.skillName}>{skill.name}</Text>
                        <View style={S.barBg}>
                          <View style={[S.barFill, { width: `${skillLevelPct[skill.level]}%` as any }]} />
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {languages.length > 0 && (
              <View>
                <Text style={S.sectionTitle}>Languages</Text>
                {languages.map(l => (
                  <View key={l.id} style={S.langRow}>
                    <Text>{l.name}</Text>
                    <Text style={S.langLevel}>{l.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}

            {certifications.length > 0 && (
              <View>
                <Text style={S.sectionTitle}>Certifications</Text>
                {certifications.map(c => (
                  <View key={c.id} style={S.certItem}>
                    <Text style={S.certName}>{c.name}</Text>
                    <Text style={S.certMeta}>{c.issuer} · {c.date}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main */}
          <View style={S.main}>
            {p.summary ? (
              <View>
                <Text style={S.sectionTitle}>Profile</Text>
                <Text style={S.summary}>{p.summary}</Text>
              </View>
            ) : null}

            {experience.length > 0 && (
              <View>
                <Text style={S.sectionTitle}>Experience</Text>
                {experience.map(exp => (
                  <View key={exp.id} style={S.expItem}>
                    <View style={S.expDot} />
                    <View style={S.expRow}>
                      <View>
                        <Text style={S.expTitle}>{exp.position}</Text>
                        <Text style={S.expCompany}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</Text>
                      </View>
                      <Text style={S.expDate}>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</Text>
                    </View>
                    {exp.description ? <Text style={S.expDesc}>{exp.description}</Text> : null}
                    {exp.achievements.filter(Boolean).map((a, i) => (
                      <View key={i} style={S.achievement}>
                        <Text style={S.achieveBullet}>▸</Text>
                        <Text style={S.achieveText}>{a}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {education.length > 0 && (
              <View>
                <Text style={S.sectionTitle}>Education</Text>
                {education.map(edu => (
                  <View key={edu.id} style={S.expItem}>
                    <View style={S.expDot} />
                    <View style={S.expRow}>
                      <View>
                        <Text style={S.expTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</Text>
                        <Text style={S.expCompany}>{edu.institution}{edu.location ? ` · ${edu.location}` : ""}</Text>
                        {edu.gpa ? <Text style={S.expLocation}>GPA: {edu.gpa}</Text> : null}
                      </View>
                      <Text style={S.expDate}>{edu.startDate} – {edu.current ? "Present" : edu.endDate}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {projects.length > 0 && (
              <View>
                <Text style={S.sectionTitle}>Projects</Text>
                {projects.map(proj => (
                  <View key={proj.id} style={S.projItem}>
                    <View style={S.projRow}>
                      <Text style={S.projTitle}>{proj.name}</Text>
                      <Text style={S.projDate}>{proj.startDate} – {proj.endDate}</Text>
                    </View>
                    <Text style={S.projDesc}>{proj.description}</Text>
                    {proj.technologies.length > 0 && (
                      <View style={S.techWrap}>
                        {proj.technologies.map((t, i) => <Text key={i} style={S.techTag}>{t}</Text>)}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
