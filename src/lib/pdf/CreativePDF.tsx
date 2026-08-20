import React from "react";
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

const SIDEBAR_BG = "#1e293b";

const proficiencyDots: Record<string, number> = { Basic: 1, Conversational: 2, Fluent: 3, Native: 4 };
const skillDots:       Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };

function makeStyles(color: string) {
  return StyleSheet.create({
    page:          { fontFamily: "Helvetica", fontSize: 9, flexDirection: "row", backgroundColor: "#ffffff" },
    sidebar:       { width: 175, backgroundColor: SIDEBAR_BG, paddingHorizontal: 16, paddingVertical: 20, gap: 16 },
    photoBox:      { alignItems: "center", marginBottom: 4 },
    photo:         { width: 80, height: 80, borderRadius: 40, borderWidth: 2.5, borderColor: color },
    photoInitial:  { width: 80, height: 80, borderRadius: 40, borderWidth: 2.5, borderColor: color, backgroundColor: color + "30", alignItems: "center", justifyContent: "center" },
    photoInitialTxt: { fontSize: 28, fontFamily: "Helvetica-Bold", color: color },
    sidebarName:   { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#ffffff", textAlign: "center", marginTop: 8, lineHeight: 1.3 },
    sidebarTitle:  { fontSize: 9, color: color, textAlign: "center", marginTop: 2 },
    sidebarSection: { gap: 6 },
    sidebarHeading: { fontSize: 7.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.2, color: color, marginBottom: 4 },
    contactItem:   { flexDirection: "row", gap: 5, alignItems: "center", marginBottom: 3 },
    contactText:   { fontSize: 7.5, color: "#cbd5e1", flex: 1 },
    dotRow:        { flexDirection: "row", gap: 3, alignItems: "center" },
    dot:           { width: 7, height: 7, borderRadius: 3.5 },
    skillLabel:    { fontSize: 7.5, color: "#d1d5db", flex: 1 },
    skillRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
    certItem:      { marginBottom: 6 },
    certName:      { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#ffffff" },
    certMeta:      { fontSize: 7, color: "#94a3b8" },
    main:          { flex: 1, paddingHorizontal: 22, paddingVertical: 20, gap: 14 },
    sectionHeading: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
    headingText:   { fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1, color: color },
    headingLine:   { flex: 1, borderBottomWidth: 0.5, borderBottomColor: color + "50" },
    summary:       { fontSize: 8.5, color: "#4b5563", lineHeight: 1.6 },
    expItem:       { paddingLeft: 12, marginBottom: 10, position: "relative" },
    timeline:      { position: "absolute", left: 0, top: 0, bottom: 0, borderLeftWidth: 1, borderLeftColor: "#e5e7eb" },
    timelineDot:   { position: "absolute", left: -4, top: 3, width: 8, height: 8, borderRadius: 4, borderWidth: 1.5, borderColor: "#ffffff", backgroundColor: color },
    expTopRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    expTitle:      { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#111827" },
    expCompany:    { fontSize: 8, color: color, fontFamily: "Helvetica-Bold" },
    expLocation:   { fontSize: 7.5, color: "#9ca3af" },
    datePill:      { fontSize: 7.5, color: "#ffffff", backgroundColor: color, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
    expDesc:       { fontSize: 8, color: "#4b5563", marginTop: 3, lineHeight: 1.5 },
    starRow:       { flexDirection: "row", gap: 4, marginTop: 2, alignItems: "flex-start" },
    starBullet:    { fontSize: 8, color: color },
    achieveText:   { fontSize: 8, color: "#4b5563", flex: 1 },
    eduItem:       { flexDirection: "row", gap: 8, marginBottom: 8 },
    eduBar:        { width: 3, borderRadius: 2, backgroundColor: color, minHeight: 40 },
    eduContent:    { flex: 1 },
    eduTitle:      { fontSize: 8.5, fontFamily: "Helvetica-Bold" },
    eduInst:       { fontSize: 8, color: color },
    eduMeta:       { fontSize: 7.5, color: "#9ca3af" },
    projGrid:      { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    projCard:      { width: "47%", borderWidth: 0.5, borderColor: color + "60", borderRadius: 5, padding: 8 },
    projTitle:     { fontSize: 8.5, fontFamily: "Helvetica-Bold", marginBottom: 2 },
    projDesc:      { fontSize: 7.5, color: "#6b7280", lineHeight: 1.4 },
    techWrap:      { flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 4 },
    techTag:       { fontSize: 7, paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 3, color: color, backgroundColor: color + "18" },
  });
}

function SectionHeading({ title, S }: { title: string; S: ReturnType<typeof makeStyles> }) {
  return (
    <View style={S.sectionHeading}>
      <Text style={S.headingText}>{title}</Text>
      <View style={S.headingLine} />
    </View>
  );
}

function Dots({ filled, color }: { filled: number; color: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 3 }}>
      {[1, 2, 3, 4].map(d => (
        <View key={d} style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: d <= filled ? color : "#374151" }} />
      ))}
    </View>
  );
}

export function CreativePDF({ data }: { data: CVData }) {
  const { personalInfo: p, experience, education, skills, languages, certifications, projects, primaryColor } = data;
  const S = makeStyles(primaryColor);
  const initial = (p.fullName || "?")[0]?.toUpperCase() ?? "?";

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Dark Sidebar */}
        <View style={S.sidebar}>
          {/* Photo / Initial */}
          <View style={S.photoBox}>
            {p.photo ? (
              <Image src={p.photo} style={S.photo} />
            ) : (
              <View style={S.photoInitial}>
                <Text style={S.photoInitialTxt}>{initial}</Text>
              </View>
            )}
            <Text style={S.sidebarName}>{p.fullName || "Your Name"}</Text>
            <Text style={S.sidebarTitle}>{p.jobTitle || ""}</Text>
          </View>

          {/* Contact */}
          <View style={S.sidebarSection}>
            <Text style={S.sidebarHeading}>Contact</Text>
            {p.email    && <View style={S.contactItem}><Text style={S.contactText}>✉  {p.email}</Text></View>}
            {p.phone    && <View style={S.contactItem}><Text style={S.contactText}>☎  {p.phone}</Text></View>}
            {p.location && <View style={S.contactItem}><Text style={S.contactText}>⌖  {p.location}</Text></View>}
            {p.website  && <View style={S.contactItem}><Text style={S.contactText}>⊕  {p.website}</Text></View>}
            {p.linkedin && <View style={S.contactItem}><Text style={S.contactText}>in  {p.linkedin}</Text></View>}
            {p.github   && <View style={S.contactItem}><Text style={S.contactText}>⌥  {p.github}</Text></View>}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={S.sidebarSection}>
              <Text style={S.sidebarHeading}>Skills</Text>
              {skills.map(skill => (
                <View key={skill.id} style={S.skillRow}>
                  <Text style={S.skillLabel}>{skill.name}</Text>
                  <Dots filled={skillDots[skill.level]} color={primaryColor} />
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <View style={S.sidebarSection}>
              <Text style={S.sidebarHeading}>Languages</Text>
              {languages.map(l => (
                <View key={l.id} style={S.skillRow}>
                  <Text style={S.skillLabel}>{l.name}</Text>
                  <Dots filled={proficiencyDots[l.proficiency]} color={primaryColor} />
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <View style={S.sidebarSection}>
              <Text style={S.sidebarHeading}>Certifications</Text>
              {certifications.map(c => (
                <View key={c.id} style={S.certItem}>
                  <Text style={S.certName}>{c.name}</Text>
                  <Text style={S.certMeta}>{c.issuer} · {c.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={S.main}>
          {/* Summary */}
          {p.summary ? (
            <View>
              <SectionHeading title="About Me" S={S} />
              <Text style={S.summary}>{p.summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {experience.length > 0 && (
            <View>
              <SectionHeading title="Experience" S={S} />
              {experience.map(exp => (
                <View key={exp.id} style={S.expItem}>
                  <View style={S.timeline} />
                  <View style={S.timelineDot} />
                  <View style={S.expTopRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={S.expTitle}>{exp.position}</Text>
                      <Text style={S.expCompany}>{exp.company}</Text>
                      {exp.location ? <Text style={S.expLocation}>{exp.location}</Text> : null}
                    </View>
                    <Text style={S.datePill}>{exp.startDate} – {exp.current ? "Now" : exp.endDate}</Text>
                  </View>
                  {exp.description ? <Text style={S.expDesc}>{exp.description}</Text> : null}
                  {exp.achievements.filter(Boolean).map((a, i) => (
                    <View key={i} style={S.starRow}>
                      <Text style={S.starBullet}>★</Text>
                      <Text style={S.achieveText}>{a}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View>
              <SectionHeading title="Education" S={S} />
              {education.map(edu => (
                <View key={edu.id} style={S.eduItem}>
                  <View style={S.eduBar} />
                  <View style={S.eduContent}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <View>
                        <Text style={S.eduTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</Text>
                        <Text style={S.eduInst}>{edu.institution}</Text>
                        {edu.location ? <Text style={S.eduMeta}>{edu.location}</Text> : null}
                      </View>
                      <Text style={S.eduMeta}>{edu.startDate} – {edu.current ? "Present" : edu.endDate}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <View>
              <SectionHeading title="Projects" S={S} />
              <View style={S.projGrid}>
                {projects.map(proj => (
                  <View key={proj.id} style={S.projCard}>
                    <Text style={S.projTitle}>{proj.name}</Text>
                    <Text style={S.projDesc}>{proj.description}</Text>
                    {proj.technologies.length > 0 && (
                      <View style={S.techWrap}>
                        {proj.technologies.map((t, i) => <Text key={i} style={S.techTag}>{t}</Text>)}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
