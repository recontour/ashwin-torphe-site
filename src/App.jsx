import "./App.css";

// --- STABLE ICON IMPORTS ---
import { VscAzure } from "react-icons/vsc";

import {
  FaReact,
  FaAws,
  FaLinkedinIn,
  FaGithub,
  FaJira,
  FaProjectDiagram,
} from "react-icons/fa";

function App() {
  const skills = [
    { name: "Microsoft Azure", icon: <VscAzure /> },
    { name: "React", icon: <FaReact /> },
    { name: "AWS", icon: <FaAws /> },
    { name: "Jira", icon: <FaJira /> },
    { name: "Agile/Scrum", icon: <FaProjectDiagram /> },
  ];

  const experiences = [
    {
      title: "Project Manager",
      company: "ADSMN",
      period: "Dec 2023 – Oct 2024",
      location: "Mumbai – Maharashtra",
      points: [
        "Drove strategic alignment by overseeing client relationships, managing project estimations, and defining success criteria.",
        "Provided architectural guidance by selecting and validating optimal tech stacks (<strong>React, Azure</strong>) ensuring scalability.",
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
        "Managed a team of 8 developers, consistently delivering projects <strong>on time and within budget</strong>.",
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
        "Guided the team in leveraging diverse tech stacks including <strong>Python, NodeJS, AWS, MongoDB, and Azure</strong>.",
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
        "Streamlined release cycles using <strong>Kanban methodologies</strong>.",
        "Optimized roadmap execution by prioritizing critical changes to meet deadlines.",
      ],
    },
    // --- GROUPED MICROSOFT EXPERIENCE ---
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
            "Led a team of 7 engineers managing operations for Microsoft’s consumer support ticketing system.",
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
    <div className="app-container">
      {/* ==== HEADER ==== */}
      <header className="header">
        <div className="content-wrapper">
          <h1>Ashwin Torphe</h1>
          <p className="subtitle">Project Leader & Azure Expert</p>

          <div className="contact-info">
            <div>ashwin.torphe@gmail.com</div>
            <div>+91 9632659200</div>
          </div>

          <div className="cta-buttons">
            {/* 1. Email Me -> WHITE */}
            <a href="mailto:ashwin.torphe@gmail.com" className="btn btn-white">
              Email Me
            </a>

            {/* 2. Download Resume -> BLUE (Matches LinkedIn) */}
            <a href="/Ashwin_Torphe_Resume.pdf" download className="btn">
              Download Resume
            </a>

            {/* 3. LinkedIn -> BLUE */}
            <a
              href="https://www.linkedin.com/in/ashwin-torphe-873123104/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              LinkedIn
            </a>

            {/* 4. GitHub -> WHITE */}
            <a
              href="https://github.com/recontour"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* ==== MAIN CONTENT ==== */}
      <main className="content-wrapper">
        {/* ==== SUMMARY ==== */}
        <section className="section summary-section">
          <h2>Summary</h2>
          <p>
            <strong>Experienced project leader</strong> with hands-on expertise
            across diverse technologies and industries. I am committed to
            fostering work environments where people are valued. My leadership
            philosophy focuses on{" "}
            <strong>empowering teams, driving innovation</strong>, and solving
            complex problems without sacrificing the well-being of individuals.
          </p>
          <p>
            I have successfully managed operations for multiple projects, led
            cross-functional teams, and overseen the{" "}
            <strong>full product development lifecycle</strong>. My goal is to
            contribute to an organization that prioritizes empowering people.
          </p>
        </section>

        {/* ==== SKILLS ==== */}
        <section className="section skills-section">
          <h2>Technical Skills</h2>
          <div className="skills-list">
            {skills.map((skill, i) => (
              <div key={i} className="skill-item">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==== EXPERIENCE ==== */}
        <section className="section experience-section">
          <h2>Experience</h2>
          <div className="experience-list">
            {experiences.map((exp, i) => (
              <div key={i} className="experience-item">
                {exp.isGrouped ? (
                  /* GROUPED RENDER (Microsoft) */
                  <div>
                    <div className="exp-header">
                      <h3>{exp.company}</h3>
                      <span className="exp-meta">
                        {exp.period} • {exp.location}
                      </span>
                    </div>
                    {exp.intro && (
                      <p
                        style={{
                          fontStyle: "italic",
                          color: "#666",
                          marginBottom: "20px",
                        }}
                      >
                        {exp.intro}
                      </p>
                    )}

                    {exp.subRoles.map((role, rIdx) => (
                      <div key={rIdx} className="sub-role-item">
                        <h4>{role.title}</h4>
                        <ul>
                          {role.points.map((p, pIdx) => (
                            <li
                              key={pIdx}
                              dangerouslySetInnerHTML={{ __html: p }}
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* STANDARD RENDER */
                  <div>
                    <div className="exp-header">
                      <h3>
                        {exp.title} <span className="at">at</span> {exp.company}
                      </h3>
                      <span className="exp-meta">
                        {exp.period} • {exp.location}
                      </span>
                    </div>
                    <ul>
                      {exp.points.map((p, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ==== EDUCATION ==== */}
        <section className="section education-section">
          <h2>Education</h2>
          <p className="education-item">
            <strong>Diploma in Mechanical Engineering</strong> — 2002
          </p>
        </section>
      </main>

      {/* ==== FOOTER ==== */}
      <footer className="footer">
        <p>Let’s build the future — one sprint at a time.</p>
      </footer>
    </div>
  );
}

export default App;
