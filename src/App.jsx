import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState, useEffect, useRef } from "react";

function App() {
  const containerRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadPDF = async () => {
    const element = containerRef.current;
    if (!element) return;
    
    setIsDownloading(true);

    const clone = element.cloneNode(true);
    
    clone.style.width = "1200px";
    clone.style.position = "absolute";
    clone.style.top = "-10000px";
    clone.style.left = "0";
    clone.style.zIndex = "-1";
    clone.style.background = "#0f172a";
    
    document.body.appendChild(clone);

    // Enforce page break logic
    const tipstatElement = clone.querySelector("#tipstat-section");
    if (tipstatElement) {
        // Add requested margin
        tipstatElement.style.marginTop = "6rem";

        const pageHeight = 1200 * (297 / 210); // A4 ratio height in px for 1200px width
        
        // Get current position relative to container
        // Note: we need to account for the fact that clone is absolute top -10000
        // We use getBoundingClientRect() relative to the clone container
        const containerRect = clone.getBoundingClientRect();
        const elementRect = tipstatElement.getBoundingClientRect();
        const offsetTop = elementRect.top - containerRect.top;
        
        const remainder = offsetTop % pageHeight;
        
        // If not already at the top of a page (with some tolerance)
        if (remainder > 50) { 
            const spacerHeight = pageHeight - remainder;
            const spacer = document.createElement("div");
            spacer.style.height = spacerHeight + "px";
            spacer.style.width = "100%";
            // Insert spacer before the element
            tipstatElement.parentNode.insertBefore(spacer, tipstatElement);
        }
    }

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/jpeg", 0.7);
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.setFillColor(15, 23, 42);
        pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("Ashwin_Torphe_Resume.pdf");
    } catch (err) {
      console.error("PDF generation failed", err);
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const Icon = ({ path }) => (
    <svg
      viewBox="0 0 24 24"
      style={{ width: "18px", height: "18px", fill: "#e2e8f0" }}
    >
      <path d={path} />
    </svg>
  );

  const skills = [
    {
      name: "Google Cloud",
      path: "M19.35,10.04C18.67,6.59,15.64,4,12,4C9.11,4,6.6,5.64,5.35,8.04C2.34,8.36,0,10.91,0,14c0,3.31,2.69,6,6,6h13c2.76,0,5-2.24,5-5C24,12.36,21.95,10.22,19.35,10.04z",
    },
    {
      name: "React",
      path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M12,5.9c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6S15.31,5.9,12,5.9z",
    },
    {
      name: "AWS",
      path: "M20,13H4c-0.55,0-1,0.45-1,1v6c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1v-6C21,13.45,20.55,13,20,13z M19,19H5v-4h14V19z M20,3H4C3.45,3,3,3.45,3,4v6c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1V4C21,3.45,20.55,3,20,3z M19,9H5V5h14V9z",
    },
    {
      name: "Jira",
      path: "M19,3h-4.18C14.4,1.84,13.3,1,12,1c-1.3,0-2.4,0.84-2.82,2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3z M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z",
    },
    {
      name: "Agile",
      path: "M12,4V1L8,5l4,4V6c3.31,0,6,2.69,6,6c0,1.01-0.25,1.97-0.7,2.8l1.46,1.46C19.54,15.03,20,13.57,20,12C20,7.58,16.42,4,12,4z M4,12c0-1.01,0.25-1.97,0.7-2.8L3.24,7.74C2.46,8.97,2,10.43,2,12c0,4.42,3.58,8,8,8v3l4-4l-4-4v3C6.69,18,4,15.31,4,12z",
    },
    {
      name: "AI",
      path: "M12,2A7,7,0,0,0,5,9c0,2.38,1.19,4.47,3,5.74V17a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1v-2.26c1.81-1.27,3-3.36,3-5.74A7,7,0,0,0,12,2M9,21a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1v-1H9v1z",
    },
  ];

  const experiences = [
    {
      title: "Director",
      company: "ApexByte.co",
      period: "Oct 2024 – Present",
      location: "Bengaluru – Karnataka",
      points: [
        "Spearhead strategic operations for a boutique software consultancy, bridging the gap between business goals and engineering execution.",
        "Lead technical decision-making, defining technology stacks and cloud infrastructure strategies to minimize technical debt and maximize scalability.",
        "Cultivate client partnerships, managing stakeholder expectations and delivering measurable value through tailored digital products.",
        "Mentor and manage development teams, fostering a culture of code quality, agile efficiency, and innovation.",
      ],
    },
    {
      title: "Project Manager",
      company: "ADSMN",
      period: "Dec 2023 – Oct 2024",
      location: "Mumbai – Maharashtra",
      points: [
        "Drove strategic alignment by overseeing client relationships, managing project estimations, and defining success criteria.",
        "Provided architectural guidance by selecting and validating optimal tech stacks (React, Azure) ensuring scalability.",
        "Led and mentored development teams, translating client requirements into actionable objectives.",
        "Managed Agile sprints ensuring on-time delivery and adaptive planning based on feedback.",
      ],
    },
    {
      title: "Project Manager",
      company: "TIU Consulting",
      period: "Sept 2021 – Nov 2023",
      location: "Nagpur – Maharashtra",
      points: [
        "Managed a team of 8 developers, consistently delivering projects on time and within budget.",
        "Improved operational efficiency by monitoring daily workflows and coordinating efforts.",
        "Defined clear project blueprints by collaborating with stakeholders to finalize scope and feasibility.",
        "Directed the full product development lifecycle from concept through launch.",
      ],
    },
    {
      title: "Project Manager",
      company: "Tipstat",
      period: "May 2020 – Aug 2021",
      location: "Bengaluru – Karnataka",
      points: [
        "Orchestrated seamless project delivery by coordinating cross-functional resources and vendors.",
        "Cultivated strong client relationships, acting as the primary bridge to manage expectations.",
        "Spearheaded the full product lifecycle through design, construction, and market launch.",
        "Guided the team in leveraging diverse tech stacks including Python, NodeJS, AWS, MongoDB, and Azure.",
      ],
    },
    {
      title: "Project Manager",
      company: "Tyche Wellness",
      period: "Sept 2018 – April 2020",
      location: "Bengaluru – Karnataka",
      points: [
        "Led a cross-functional Agile team of 8 to deliver seamless web and mobile solutions.",
        "Owned the complete project lifecycle from feature development to bug resolution.",
        "Streamlined release cycles using Kanban methodologies.",
        "Optimized roadmap execution by prioritizing critical changes to meet deadlines.",
      ],
    },
    {
      company: "Microsoft",
      period: "April 2007 – Dec 2017 (10 Years)",
      location: "Bengaluru – Karnataka",
      isGrouped: true,
      intro:
        "Experience acquired through continuous professional growth and promotions across multiple key roles.",
      subRoles: [
        {
          title: "Learning And Development Specialist",
          points: [
            "Managed publication of training content ensuring accurate delivery through the Learning Management System.",
            "Assisted trainers with content publication and resolved reported issues.",
            "Monitored reporting data for training sessions and addressed SLA breaches.",
          ],
        },
        {
          title: "Team Leader",
          points: [
            "Led a team of 7 engineers managing operations for Microsoft's consumer support ticketing system.",
            "Tracked team performance and coordinated bug resolution with backend teams.",
            "Implemented new workflows and supported site launches with the Service Delivery team.",
          ],
        },
        {
          title: "Escalation Engineer",
          points: [
            "Investigated escalated issues related to Hotmail user mailboxes and contacts.",
            "Identified backend vs. machine-specific issues using internal tools.",
          ],
        },
        {
          title: "Operations Engineer – Azure",
          points: [
            "Provided technical support to Microsoft Azure customers via phone and correspondence.",
            "Collaborated with DevOps to resolve customer-reported problems.",
            "Shared knowledge to improve solutions and stayed informed on Azure updates.",
          ],
        },
        {
          title: "Pre-Sales Executive",
          points: [
            "Collaborated with Pre-Sales Technical Support to assist Microsoft Partners.",
            "Resolved challenges during research and testing of Enterprise products.",
          ],
        },
      ],
    },
    {
      title: "Customer Care Representative",
      company: "24/7 Customer Pvt Ltd",
      period: "Dec 2005 – April 2007",
      location: "Bengaluru – Karnataka",
      points: [
        "Provided technical support to First Data Merchant Services customers.",
        "Troubleshot credit/debit card machines and transaction queries.",
      ],
    },
  ];

  return (
    <div ref={containerRef} style={styles.container}>
      <style>{`
        body { margin: 0; padding: 0; box-sizing: border-box; }
        * { box-sizing: border-box; }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{ ...styles.bgGradient, opacity: Math.min(scrollY / 500, 0.3) }}
      />

      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.nameContainer}>
            <h1 style={styles.name}>Ashwin Torphe</h1>
            <p style={styles.tagline}>Project Leader • AI Expert</p>
          </div>

          <div style={styles.contactRow}>
            <a href="mailto:ashwin.torphe@gmail.com" style={styles.contactLink}>
              ashwin.torphe@gmail.com
            </a>
            <span style={styles.contactDivider}>|</span>
            <a href="tel:+919632659200" style={styles.contactLink}>
              +91 9632659200
            </a>
          </div>

          <div style={styles.btnGroup}>
            <a
              href="mailto:ashwin.torphe@gmail.com"
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              Email Me
            </a>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              style={{ ...styles.btn, ...styles.btnSecondary, opacity: isDownloading ? 0.7 : 1, cursor: isDownloading ? "not-allowed" : "pointer" }}
            >
              {isDownloading ? (
                <>
                  <span style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    marginRight: "8px",
                    animation: "spin 1s linear infinite"
                  }}/>
                  Processing...
                </>
              ) : "Download PDF"}
            </button>

            <a
              href="https://github.com/recontour"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.btn, ...styles.btnSecondary }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ashwin-torphe-873123104/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <p style={styles.summaryText}>
            <strong style={styles.highlight}>Experienced project leader</strong>{" "}
            with hands-on expertise across diverse technologies and industries.
            I am committed to fostering work environments where people are
            valued. My leadership philosophy focuses on{" "}
            <strong style={styles.highlight}>
              empowering teams, driving innovation
            </strong>
            , and solving complex problems without sacrificing the well-being of
            individuals.
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Technical Skills</h2>
          <div style={styles.skillsGrid}>
            {skills.map((skill, i) => (
              <div key={i} style={styles.skillCard}>
                <div style={styles.skillIcon}>
                  <Icon path={skill.path} />
                </div>
                <span style={styles.skillName}>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          <div style={styles.timeline}>
            {experiences.map((exp, i) => (
              <div 
                key={i} 
                style={styles.timelineItem} 
                id={exp.company === "Tipstat" ? "tipstat-section" : null}
              >
                <div style={styles.timelineDot} />
                <div style={styles.expCard}>
                  {exp.isGrouped ? (
                    <div>
                      <h3 style={styles.expTitle}>{exp.company}</h3>
                      <p style={styles.expMeta}>
                        {exp.period} • {exp.location}
                      </p>
                      <p style={styles.expIntro}>{exp.intro}</p>
                      {exp.subRoles.map((role, rIdx) => (
                        <div key={rIdx} style={styles.subRole}>
                          <h4 style={styles.subRoleTitle}>{role.title}</h4>
                          <ul style={styles.bulletList}>
                            {role.points.map((p, pIdx) => (
                              <li key={pIdx} style={styles.bulletItem}>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h3 style={styles.expTitle}>
                        {exp.title} <span style={styles.expAt}>at</span>{" "}
                        <span style={styles.expCompany}>{exp.company}</span>
                      </h3>
                      <p style={styles.expMeta}>
                        {exp.period} • {exp.location}
                      </p>
                      <ul style={styles.bulletList}>
                        {exp.points.map((p, idx) => (
                          <li key={idx} style={styles.bulletItem}>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Let's build the future – one sprint at a time.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: "relative",
    overflowX: "hidden",
  },
  bgGradient: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1), transparent 50%)",
    pointerEvents: "none",
  },
  hero: {
    minHeight: "40vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "2rem",
    position: "relative",
    zIndex: 1,
  },
  heroContent: {
    maxWidth: "900px",
    width: "100%",
    margin: "0 auto",
    textAlign: "left",
  },
  nameContainer: {
    marginBottom: "0.25rem",
  },
  name: {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: "600",
    margin: 0,
    color: "#f8fafc",
    letterSpacing: "-0.01em",
  },
  tagline: {
    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
    color: "#94a3b8",
    fontWeight: "400",
    marginTop: "0.25rem",
    marginBottom: "1rem",
  },
  contactRow: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  contactLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.85rem",
    transition: "color 0.2s",
  },
  contactDivider: {
    color: "#475569",
  },
  btnGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    width: "100%",
    maxWidth: "400px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
  },
  btnPrimary: {
    background: "#2563eb",
    color: "white",
  },
  btnSecondary: {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#cbd5e1",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: 8,
    position: "relative",
    zIndex: 1,
  },
  card: {
    background: "rgba(30, 41, 59, 0.3)",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#f1f5f9",
    borderLeft: "3px solid #3b82f6",
    paddingLeft: "0.75rem",
  },
  summaryText: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#cbd5e1",
  },
  highlight: {
    color: "#60a5fa",
    fontWeight: "500",
  },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "0.75rem",
  },
  skillCard: {
    background: "rgba(30, 41, 59, 0.4)",
    borderRadius: "6px",
    padding: "0.6rem 0.8rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  skillIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
  skillName: {
    fontSize: "0.8rem",
    color: "#cbd5e1",
    fontWeight: "500",
  },
  timeline: {
    position: "relative",
    paddingLeft: "1rem",
    borderLeft: "2px solid rgba(59, 130, 246, 0.2)",
  },
  timelineItem: {
    position: "relative",
    marginBottom: "4.5rem",
  },
  timelineDot: {
    position: "absolute",
    left: "-1.37rem",
    top: "0.3rem",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#3b82f6",
    border: "2px solid #0f172a",
  },
  expCard: {
    paddingLeft: "0.5rem",
  },
  expTitle: {
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: "0.2rem",
  },
  expAt: {
    color: "#64748b",
    fontWeight: "400",
    fontSize: "0.9rem",
  },
  expCompany: {
    color: "#60a5fa",
  },
  expMeta: {
    color: "#64748b",
    fontSize: "0.8rem",
    marginBottom: "0.75rem",
  },
  expIntro: {
    fontStyle: "italic",
    color: "#94a3b8",
    marginBottom: "0.75rem",
    fontSize: "0.85rem",
  },
  subRole: {
    marginBottom: "1.25rem",
    marginTop: "0.75rem",
  },
  subRoleTitle: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#cbd5e1",
    marginBottom: "0.4rem",
  },
  bulletList: {
    paddingLeft: "1rem",
    margin: 0,
  },
  bulletItem: {
    color: "#94a3b8",
    marginBottom: "0.3rem",
    lineHeight: "1.4",
    fontSize: "0.9rem",
  },
  footer: {
    textAlign: "center",
    padding: "0.5rem",
    marginTop: 0,
  },
  footerText: {
    color: "#64748b",
    fontSize: "0.8rem",
  },
};

export default App;

