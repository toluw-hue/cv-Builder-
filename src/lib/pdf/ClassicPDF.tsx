import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

function makeStyles(color: string) {
  return StyleSheet.create({
    page:         { fontFamily: "Helvetica", fontSize: 9, color: "#1a1a1a", backgroundColor: "#ffffff", paddingBottom: 24 },
    header:       { textAlign: "center", paddingHorizontal: 40, paddingVertical: 28, borderBottomWidth: 3, borderBottomColor: color },
    name:         { fontSize: 28, fontFamily: "Helvetica-Bold", letterSpacing: -0.5, color: "#111827" },
    jobTitle:     { fontSize: 11, marginTop: 3, letterSpacing: 2, textTransform: "uppercase", color: color },
    contacts:     { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 8 },
    contactItem:  { fontSize: 8, color: "#4b5563" },
    body:         { paddingHorizontal: 36, paddingTop: 20, gap: 16 },
    sectionWrap:  { gap: 8 },
    sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, color: color },
    divider:      { borderBottomWidth: 0.5, borderBottomColor: "#e5e7eb", marginTop: 2 },
    expBlock:     { marginBottom: 10 },
    expTopRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    expLeft:      { flex: 1 },
    expTitle:     { fontSize: 8.5, fontFamily: "Helvetica-Bold" },
    expCompany:   { fontSize: 8.5, color: color, fontFamily: "Helvetica-Bold" },
    expSep:       { color: "#9ca3af", fontSize: 8.5 },
    expMeta:      { fontSize: 8, color: "#9ca3af" },
    expDate:      { fontSize: 8, color: "#6b7280", fontStyle: "italic" },
    expDesc:      { fontSize: 8, color: "#4b5563", marginTop: 3, lineHeight: 1.5 },
    bulletList:   { marginTop: 4, marginLeft: 10, gap: 2 },
    bullet:       { fontSize: 8, color: "#4b5563" },
    twoCol:       { flexDirection: "row", gap: 24 },
    col:          { flex: 1, gap: 12 },
    skillRow:     { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    skillName:    { fontSize: 8, color: "#374151" },
    skillLevel:   { fontSize: 8, color: "#9ca3af", fontStyle: "italic" },
    langRow:      { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    certBlock:    { marginBottom: 6 },
    certName:     { fontSize: 8, fontFamily: "Helvetica-Bold" },
    certMeta:     { fontSize: 7.5, color: "#9ca3af" },
    projBlock:    { marginBottom: 8 },
    projTopRow:   { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
    projTitle:    { fontSize: 8.5, fontFamily: "Helvetica-Bold" },
    projDate:     { fontSize: 7.5, color: "#9ca3af" },
    projDesc:     { fontSize: 8, color: "#4b5563", marginTop: 2, lineHeight: 1.4 },
    projTech:     { fontSize: 7.5, color: "#6b7280", marginTop: 2 },
  });
}

function SectionTitle({ title, S }: { title: string; S: ReturnType<typeof makeStyles> }) {
  return (
    <View style={{ marginBottom: 6 }}>
      <Text style={S.sectionTitle}>{title}</Text>
      <View style={S.divider} />
    </View>
  );
}

export function ClassicPDF({ data }: { data: CVData }) {
  const { personalInfo: p, experience, education, skills, languages, certifications, projects, primaryColor } = data;
  const S = makeStyles(primaryColor);

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.header}>
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

        <View style={S.body}>
          {/* Summary */}
          {p.summary ? (
            <View style={S.sectionWrap}>
              <SectionTitle title="Professional Summary" S={S} />
              <Text style={{ fontSize: 8.5, color: "#374151", lineHeight: 1.6 }}>{p.summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {experience.length > 0 && (
            <View style={S.sectionWrap}>
              <SectionTitle title="Work Experience" S={S} />
              {experience.map(exp => (
                <View key={exp.id} style={S.expBlock}>
                  <View style={S.expTopRow}>
                    <View style={S.expLeft}>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
                        <Text style={S.expTitle}>{exp.position}</Text>
                        <Text style={S.expSep}>·</Text>
                        <Text style={S.expCompany}>{exp.company}</Text>
                        {exp.location ? <Text style={S.expMeta}> · {exp.location}</Text> : null}
                      </View>
                    </View>
                    <Text style={S.expDate}>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</Text>
                  </View>
                  {exp.description ? <Text style={S.expDesc}>{exp.description}</Text> : null}
                  {exp.achievements.filter(Boolean).length > 0 && (
                    <View style={S.bulletList}>
                      {exp.achievements.filter(Boolean).map((a, i) => (
                        <Text key={i} style={S.bullet}>• {a}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={S.sectionWrap}>
              <SectionTitle title="Education" S={S} />
              {education.map(edu => (
                <View key={edu.id} style={[S.expBlock, { marginBottom: 8 }]}>
                  <View style={S.expTopRow}>
                    <View style={S.expLeft}>
                      <Text style={S.expTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</Text>
                      <Text style={{ fontSize: 8, color: primaryColor, fontFamily: "Helvetica-Bold" }}>{edu.institution}</Text>
                      {edu.location ? <Text style={S.expMeta}>{edu.location}</Text> : null}
                      {edu.gpa      ? <Text style={S.expMeta}>GPA: {edu.gpa}</Text> : null}
                      {edu.description ? <Text style={S.expDesc}>{edu.description}</Text> : null}
                    </View>
                    <Text style={S.expDate}>{edu.startDate} – {edu.current ? "Present" : edu.endDate}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Two-column: Skills + Languages/Certs */}
          {(skills.length > 0 || languages.length > 0 || certifications.length > 0) && (
            <View style={S.twoCol}>
              {skills.length > 0 && (
                <View style={S.col}>
                  <SectionTitle title="Skills" S={S} />
                  {skills.map(skill => (
                    <View key={skill.id} style={S.skillRow}>
                      <Text style={S.skillName}>{skill.name}</Text>
                      <Text style={S.skillLevel}>{skill.level}</Text>
                    </View>
                  ))}
                </View>
              )}
              <View style={S.col}>
                {languages.length > 0 && (
                  <View style={{ marginBottom: 12 }}>
                    <SectionTitle title="Languages" S={S} />
                    {languages.map(l => (
                      <View key={l.id} style={S.langRow}>
                        <Text style={S.skillName}>{l.name}</Text>
                        <Text style={S.skillLevel}>{l.proficiency}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {certifications.length > 0 && (
                  <View>
                    <SectionTitle title="Certifications" S={S} />
                    {certifications.map(c => (
                      <View key={c.id} style={S.certBlock}>
                        <Text style={S.certName}>{c.name}</Text>
                        <Text style={S.certMeta}>{c.issuer} · {c.date}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <View style={S.sectionWrap}>
              <SectionTitle title="Projects" S={S} />
              {projects.map(proj => (
                <View key={proj.id} style={S.projBlock}>
                  <View style={S.projTopRow}>
                    <Text style={S.projTitle}>{proj.name}</Text>
                    <Text style={S.projDate}>{proj.startDate} – {proj.endDate}</Text>
                  </View>
                  <Text style={S.projDesc}>{proj.description}</Text>
                  {proj.technologies.length > 0 && (
                    <Text style={S.projTech}>Technologies: {proj.technologies.join(", ")}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
