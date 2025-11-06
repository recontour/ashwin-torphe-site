import { useState, useEffect } from 'react';
import './App.css';

// SVG Icons
const AzureIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.05 4.24L6.56 18.05 2 18.05 8.5 4.24H13.05ZM21.5 18.05H12.29L9.58 11.31H15.81L21.5 18.05Z"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
  </svg>
);

const AWSIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    <path fill="#fff" d="M17.5 14.5l-2-1-2 1v-3l2-1 2 1v3z"/>
    <path fill="#fff" d="M8.5 14.5l-2-1-2 1v-3l2-1 2 1v3z"/>
  </svg>
);

const JiraIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 12l10 10 10-10L12 2z"/>
    <path fill="#fff" d="M12 7l-5 5 5 5 5-5-5-5z"/>
  </svg>
);

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const experiences = [
    {
      title: "Project Manager",
      company: "ADSMN",
      period: "Dec 2023 – Oct 2024",
      location: "Mumbai – Maharashtra",
      points: [
        "Responsible for managing client relationships and overseeing project estimations. I work closely with clients to understand their requirements and ensure alignment with project goals.",
        "When the tech stack is not predetermined, I assist in selecting the most suitable technologies for the project.",
        "I lead the team by clearly communicating project objectives and guiding them through each phase of development.",
        "I plan and coordinate sprints, providing regular updates to clients, and adjust future sprints based on their feedback.",
        "My role is to ensure smooth project execution, from concept to delivery, while keeping both the team and client in sync."
      ]
    },
    {
      title: "Project Manager",
      company: "TIU Consulting",
      period: "Sept 2021 – Nov 2023",
      location: "Nagpur – Maharashtra",
      points: [
        "Managed a team of 8 developers, ensuring that projects were delivered on time, within scope, and within budget.",
        "Monitored daily operations and coordinated the team’s efforts to meet project goals.",
        "Worked closely with stakeholders to define project scopes and objectives, ensuring technical feasibility and clarity.",
        "Led the product development process from concept through design, build, release, and iteration.",
        "Provided regular progress reports and metrics to keep all parties informed and aligned, removing any ambiguity and ensuring smooth delivery."
      ]
    },
    {
      title: "Project Manager",
      company: "Tyche Wellness",
      period: "Sept 2018 – April 2020",
      location: "Bengaluru – Karnataka",
      points: [
        "Led a cross-functional team of 8, including dev-ops, developers, and testers.",
        "Monitored tasks to ensure timely delivery and was responsible for the full project lifecycle, from development to bug resolution for both web and mobile platforms.",
        "Managed sprint releases and feature deployments using Kanban methodologies.",
        "Prioritized changes and bug fixes to meet deadlines.",
        "Worked closely with stakeholders to design products and plan for future projects."
      ]
    },
    {
      title: "Learning And Development Specialist",
      company: "Microsoft",
      period: "April 2007 – Dec 2017",
      location: "Bengaluru – Karnataka",
      points: [
        "Managed the publication of training content for Microsoft trainers, ensuring accurate and timely delivery through the Learning Management System.",
        "Assisted trainers with content publication and resolved any issues reported by team managers.",
        "Monitored and analysed reporting data for training sessions, identifying and addressing SLA breaches, and provided regular updates to business owners."
      ]
    },
    {
      title: "Team Leader",
      company: "Microsoft",
      period: "April 2007 – Dec 2017",
      location: "Bengaluru – Karnataka",
      points: [
        "Led a team of 7 engineers managing operations for Microsoft’s consumer support ticketing system.",
        "Tracked team performance for appraisal cycles and coordinated the resolution of issues and bugs reported by product support sites by collaborating with Backend Ops and Development teams.",
        "Implemented new workflows as planned by stakeholders and visited support sites with the Microsoft Service Delivery team during product launches or new tool releases."
      ]
    },
    {
      title: "Escalation Engineer",
      company: "Microsoft",
      period: "April 2007 – Dec 2017",
      location: "Bengaluru – Karnataka",
      points: [
        "Part of the escalations team for a pilot project focused on forum support.",
        "Investigated issues escalated by moderators related to Hotmail user mailboxes and contacts, using internal tools to identify whether issues were backend-related or specific to the user’s machine.",
        "Assisted users in resolving network and machine-specific issues on the Hotmail support forum, including addressing configuration problems with user profiles and mailboxes."
      ]
    },
    {
      title: "Operations Engineer – Azure",
      company: "Microsoft",
      period: "April 2007 – Dec 2017",
      location: "Bengaluru – Karnataka",
      points: [
        "Provided technical support to Microsoft Azure customers via phone and written correspondence, addressing issues related to Azure services and developer technologies.",
        "Worked closely with Support Engineers and DevOps to resolve customer-reported problems.",
        "Shared knowledge with the team to improve customer solutions and stayed informed about upcoming Azure products to ensure effective support.",
        "Reported service issues and customer feedback to the Azure product group and documented known issues for both internal and external use."
      ]
    },
    {
      title: "Pre-Sales Executive",
      company: "Microsoft",
      period: "April 2007 – Dec 2017",
      location: "Bengaluru – Karnataka",
      points: [
        "Collaborated with Microsoft Pre-Sales Technical Support to assist Microsoft Gold and Certified Partners.",
        "Worked with product specialists to help partners resolve challenges during research and testing of Microsoft Enterprise products.",
        "Coordinated product demos conducted by specialists for potential customers of Microsoft Partners."
      ]
    },
    {
      title: "Customer Care Representative",
      company: "24/7 Customer Pvt Ltd",
      period: "Dec 2005 – April 2007",
      location: "Bengaluru – Karnataka",
      points: [
        "Provided technical support to First Data Merchant Services customers.",
        "Troubleshot credit/debit card machines.",
        "Handled transaction and device related queries."
      ]
    }
  ];

  const skills = [
    { name: 'Azure', icon: <AzureIcon /> },
    { name: 'React', icon: <ReactIcon /> },
    { name: 'AWS', icon: <AWSIcon /> },
    { name: 'Jira', icon: <JiraIcon /> },
    { name: 'Agile/Scrum', icon: 'Sprint' },
    { name: 'Kanban', icon: 'Kanban Board' }
  ];

  return (
    <div>
      {/* ==== HEADER ==== */}
      <header className="header">
        <div className="container">
          <h1>Ashwin Torphe</h1>
          <p>ashwin.torphe@gmail.com</p>
          <p>Phone: 9632659200</p>

          <div className="buttons">
            <a href="mailto:ashwin.torphe@gmail.com" className="btn btn-primary">
              Email Me
            </a>
            <a href="/Ashwin_Torphe_Resume.pdf" download className="btn btn-outline">
              Download Resume
            </a>
            <a href="https://www.linkedin.com/in/ashwin-torphe-873123104/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              LinkedIn
            </a>
            <a href="https://github.com/recontour" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              GitHub
            </a>
            <button onClick={toggleTheme} className="dark-toggle">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </header>

      {/* ==== SUMMARY + SKILLS ==== */}
      <section className="section">
        <div className="container">
          <h2>Summary</h2>
          <p>
            Experienced project leader with hands-on expertise across diverse technologies and industries. 
            I am committed to fostering work environments where people are valued. My leadership philosophy 
            focuses on empowering teams, driving innovation, and solving complex problems without sacrificing 
            the well-being of individuals.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            I have successfully managed operations for multiple projects, led cross-functional teams, 
            and overseen the full product development lifecycle. My goal is to contribute to an organization 
            that prioritizes empowering people.
          </p>

          <div className="skills">
            {skills.map((skill, i) => (
              <div key={i} className="skill-icon">
                {skill.icon}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==== EXPERIENCE ==== */}
      <section className="exp-section">
        <div className="container">
          <h2>Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="exp-item">
              <h3>{exp.title} | {exp.company}</h3>
              <p className="meta">{exp.period} • {exp.location}</p>
              <ul>
                {exp.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ==== EDUCATION ==== */}
      <section className="section">
        <div className="container">
          <h2>Education</h2>
          <p>Diploma in Mechanical Engineering 2002</p>
        </div>
      </section>

      {/* ==== FOOTER ==== */}
      <footer className="footer">
        <p>ashwin.torphe@gmail.com | +91 9632659200</p>
        <p>Let’s build the future — one sprint at a time.</p>
      </footer>
    </div>
  );
}

export default App;