import { NextRequest, NextResponse } from "next/server";
import { CVData } from "@/types/cv";

export async function POST(req: NextRequest) {
  try {
    const cvData: CVData = await req.json();
    const { personalInfo: p, experience, education, skills, projects, certifications, languages, template, primaryColor } = cvData;

    // Generate HTML for the CV
    const html = generateCVHtml(cvData);

    // Return the HTML with print styles so the browser can render it
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "X-CV-Template": template,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}

function generateCVHtml(data: CVData): string {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages, primaryColor, template } = data;

  const skillLevelMap: Record<string, number> = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 100 };

  const modernHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${p.fullName || "CV"} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #1e293b; background: white; }
        .page { width: 210mm; min-height: 297mm; background: white; }
        .header { background: ${primaryColor}; color: white; padding: 32px 40px; }
        .header h1 { font-size: 32px; font-weight: 800; letter-spacing: -0.5px; }
        .header .title { font-size: 16px; opacity: 0.9; margin-top: 4px; }
        .header .contacts { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 12px; font-size: 10px; opacity: 0.85; }
        .contact-item { display: flex; align-items: center; gap: 4px; }
        .body { display: flex; }
        .sidebar { width: 220px; flex-shrink: 0; background: #f8fafc; padding: 24px; }
        .main { flex: 1; padding: 24px 32px; }
        .section-title { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: ${primaryColor}; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 2px solid ${primaryColor}; }
        .section { margin-bottom: 20px; }
        .exp-item, .edu-item { margin-bottom: 16px; padding-left: 16px; position: relative; }
        .exp-item::before { content: ''; position: absolute; left: 0; top: 6px; width: 8px; height: 8px; background: ${primaryColor}; border-radius: 50%; }
        .exp-title { font-weight: 700; font-size: 11px; }
        .exp-company { color: ${primaryColor}; font-weight: 600; font-size: 10px; }
        .exp-date { color: #94a3b8; font-size: 10px; font-style: italic; }
        .exp-desc { color: #475569; font-size: 10px; margin-top: 4px; line-height: 1.5; }
        .exp-achievement { display: flex; gap: 4px; font-size: 10px; color: #475569; margin-top: 2px; }
        .skill-item { margin-bottom: 8px; }
        .skill-name { font-size: 10px; font-weight: 600; }
        .skill-bar-bg { background: #e2e8f0; border-radius: 4px; height: 5px; margin-top: 2px; }
        .skill-bar { border-radius: 4px; height: 5px; background: ${primaryColor}; }
        .lang-item { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 6px; }
        .cert-item { margin-bottom: 10px; }
        .cert-name { font-size: 10px; font-weight: 600; }
        .cert-issuer { font-size: 10px; color: #94a3b8; }
        .tech-tag { display: inline-block; background: ${primaryColor}20; color: ${primaryColor}; border-radius: 4px; padding: 1px 6px; font-size: 9px; margin: 2px 2px 2px 0; }
        .summary { font-size: 10px; color: #475569; line-height: 1.6; }
        .flex-between { display: flex; justify-content: space-between; align-items: flex-start; }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="header">
          ${p.photo ? `<img src="${p.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.3);float:right;margin-left:20px;">` : ""}
          <h1>${p.fullName || "Your Name"}</h1>
          <div class="title">${p.jobTitle || ""}</div>
          <div class="contacts">
            ${p.email ? `<span class="contact-item">✉ ${p.email}</span>` : ""}
            ${p.phone ? `<span class="contact-item">📞 ${p.phone}</span>` : ""}
            ${p.location ? `<span class="contact-item">📍 ${p.location}</span>` : ""}
            ${p.website ? `<span class="contact-item">🌐 ${p.website}</span>` : ""}
            ${p.linkedin ? `<span class="contact-item">in ${p.linkedin}</span>` : ""}
            ${p.github ? `<span class="contact-item">⌥ ${p.github}</span>` : ""}
          </div>
        </div>
        <div class="body">
          <div class="sidebar">
            ${skills.length > 0 ? `
              <div class="section">
                <div class="section-title">Skills</div>
                ${skills.map(s => `
                  <div class="skill-item">
                    <div class="skill-name">${s.name}</div>
                    <div class="skill-bar-bg"><div class="skill-bar" style="width:${skillLevelMap[s.level]}%"></div></div>
                  </div>
                `).join("")}
              </div>
            ` : ""}
            ${languages.length > 0 ? `
              <div class="section">
                <div class="section-title">Languages</div>
                ${languages.map(l => `<div class="lang-item"><span>${l.name}</span><span style="color:#94a3b8">${l.proficiency}</span></div>`).join("")}
              </div>
            ` : ""}
            ${certifications.length > 0 ? `
              <div class="section">
                <div class="section-title">Certifications</div>
                ${certifications.map(c => `
                  <div class="cert-item">
                    <div class="cert-name">${c.name}</div>
                    <div class="cert-issuer">${c.issuer} · ${c.date}</div>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
          <div class="main">
            ${p.summary ? `
              <div class="section">
                <div class="section-title">Profile</div>
                <p class="summary">${p.summary}</p>
              </div>
            ` : ""}
            ${experience.length > 0 ? `
              <div class="section">
                <div class="section-title">Experience</div>
                ${experience.map(exp => `
                  <div class="exp-item">
                    <div class="flex-between">
                      <div>
                        <div class="exp-title">${exp.position}</div>
                        <div class="exp-company">${exp.company}${exp.location ? ` · ${exp.location}` : ""}</div>
                      </div>
                      <div class="exp-date">${exp.startDate} – ${exp.current ? "Present" : exp.endDate}</div>
                    </div>
                    ${exp.description ? `<div class="exp-desc">${exp.description}</div>` : ""}
                    ${exp.achievements.filter(Boolean).map(a => `<div class="exp-achievement"><span style="color:${primaryColor}">▸</span><span>${a}</span></div>`).join("")}
                  </div>
                `).join("")}
              </div>
            ` : ""}
            ${education.length > 0 ? `
              <div class="section">
                <div class="section-title">Education</div>
                ${education.map(edu => `
                  <div class="exp-item">
                    <div class="flex-between">
                      <div>
                        <div class="exp-title">${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</div>
                        <div class="exp-company">${edu.institution}${edu.location ? ` · ${edu.location}` : ""}</div>
                        ${edu.gpa ? `<div style="font-size:10px;color:#94a3b8">GPA: ${edu.gpa}</div>` : ""}
                      </div>
                      <div class="exp-date">${edu.startDate} – ${edu.current ? "Present" : edu.endDate}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : ""}
            ${projects.length > 0 ? `
              <div class="section">
                <div class="section-title">Projects</div>
                ${projects.map(proj => `
                  <div style="margin-bottom:12px">
                    <div class="flex-between">
                      <div class="exp-title">${proj.name}</div>
                      <div class="exp-date">${proj.startDate} – ${proj.endDate}</div>
                    </div>
                    <div class="exp-desc">${proj.description}</div>
                    ${proj.technologies.length > 0 ? `<div style="margin-top:4px">${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("")}</div>` : ""}
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return modernHtml;
}
