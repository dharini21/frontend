import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Outfit', sans-serif;
    background: #f5f0ff;
    color: #1a1a2e;
  }

  /* ── NAVBAR ── */
  .nav {
    background: #fff;
    box-shadow: 0 2px 20px rgba(160,100,220,0.12);
    border-radius: 16px;
    margin: 10px 24px 0px 24px;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    position: sticky;
    top: 12px;
    z-index: 100;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nav-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid #7c3aed;
    flex-shrink: 0;
  }

  .nav-brand {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #7c3aed;
    text-decoration: none;
    letter-spacing: 0.01em;
  }

  .nav-links {
    display: flex;
    gap: 6px;
    list-style: none;
  }

  .nav-links button {
    background: none;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: #555;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .nav-links button:hover { background: #f3e8ff; color: #7c3aed; }
  .nav-links button.active { background: #7c3aed; color: #fff; }

  /* ── PAGE ── */
  .page {
    max-width: 900px;
    margin: 0 auto;
    padding: 12px 24px 80px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── HOME HERO ── */
  .home-hero {
    background: #fff;
    border-radius: 10px;
    padding: 56px 48px;
    box-shadow: 0 8px 40px rgba(124,58,237,0.1);
    text-align: center;
    margin-bottom: 28px;
  }

  .hero-avatar {
  width: 220px;
  height: 280px;
  border-radius: 10px; /* 👈 square with slight rounding */
  object-fit: cover;
  border: 4px solid #7c3aed;
  margin-bottom: 20px;
  box-shadow: 0 4px 24px rgba(124,58,237,0.2);
}

  .home-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 10px;
  }

  .home-hero .tagline {
    font-size: 1.1rem;
    color: #7c3aed;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .home-hero .summary {
    font-size: 1rem;
    color: #666;
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto 32px;
  }

  .btn-primary {
    background: #7c3aed;
    color: #fff;
    border: none;
    padding: 12px 28px;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    margin: 6px;
    transition: background 0.2s, transform 0.2s;
  }

  .btn-primary:hover { background: #6d28d9; transform: translateY(-2px); }
  .btn-primary:disabled { background: #a78bfa; cursor: not-allowed; transform: none; }

  .btn-outline {
    background: transparent;
    color: #7c3aed;
    border: 2px solid #7c3aed;
    padding: 10px 28px;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    margin: 6px;
    transition: all 0.2s;
  }

  .btn-outline:hover { background: #7c3aed; color: #fff; transform: translateY(-2px); }

  /* ── HOME PROJECTS ── */
  .home-projects {
    background: #fff;
    border-radius: 20px;
    padding: 36px 40px;
    box-shadow: 0 4px 24px rgba(124,58,237,0.08);
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(to right, #7c3aed33, transparent);
    border-radius: 2px;
  }

  .project-card {
    border: 1.5px solid #ede9fe;
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 16px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .project-card:hover {
    border-color: #7c3aed;
    box-shadow: 0 4px 16px rgba(124,58,237,0.1);
  }

  .project-card h3 { font-size: 1rem; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
  .project-card .date { font-size: 0.8rem; color: #7c3aed; font-weight: 500; margin-bottom: 10px; }
  .project-card ul { padding-left: 18px; color: #555; font-size: 0.9rem; line-height: 1.7; }

  .cert-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
  .cert-badge {
    background: #f3e8ff;
    color: #7c3aed;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  /* ── ABOUT ── */
  .about-grid { display: grid; gap: 24px; }

  .card {
    background: #fff;
    border-radius: 20px;
    padding: 36px 40px;
    box-shadow: 0 4px 24px rgba(124,58,237,0.08);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 8px;
  }

  .skill-item {
    background: #f3e8ff;
    color: #6d28d9;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background 0.2s;
  }

  .skill-item:hover { background: #7c3aed; color: #fff; }

  .skill-category-label {
    font-size: 0.82rem;
    font-weight: 600;
    color: #7c3aed;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }

  .timeline-item {
    border-left: 3px solid #ede9fe;
    padding-left: 20px;
    margin-bottom: 24px;
    position: relative;
  }

  .timeline-item::before {
    content: '';
    width: 12px;
    height: 12px;
    background: #7c3aed;
    border-radius: 50%;
    position: absolute;
    left: -7.5px;
    top: 4px;
  }

  .timeline-item h3 { font-size: 1rem; font-weight: 600; color: #1a1a2e; }
  .timeline-item .org { font-size: 0.9rem; color: #7c3aed; font-weight: 500; margin: 2px 0 6px; }
  .timeline-item .date-badge {
    display: inline-block;
    background: #f3e8ff;
    color: #7c3aed;
    font-size: 0.78rem;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .timeline-item ul { padding-left: 16px; color: #555; font-size: 0.9rem; line-height: 1.7; }

  /* ── CONTACT ── */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  .contact-detail-card {
    background: #fff;
    border-radius: 16px;
    padding: 28px;
    box-shadow: 0 4px 20px rgba(124,58,237,0.08);
    display: flex;
    align-items: center;
    gap: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .contact-detail-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(124,58,237,0.15);
  }

  .contact-icon {
    width: 48px;
    height: 48px;
    background: #f3e8ff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .contact-detail-card .label {
    font-size: 0.78rem;
    color: #999;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  .contact-detail-card .value { font-size: 0.95rem; font-weight: 500; color: #1a1a2e; word-break: break-all; }
  .contact-detail-card a { color: #7c3aed; text-decoration: none; }
  .contact-detail-card a:hover { text-decoration: underline; }

  .contact-form-card {
    background: #fff;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(124,58,237,0.08);
  }

  .form-group { margin-bottom: 18px; }
  .form-group label { display: block; font-size: 0.88rem; font-weight: 500; color: #444; margin-bottom: 6px; }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    color: #1a1a2e;
    transition: border-color 0.2s;
    outline: none;
    resize: vertical;
  }

  .form-group input:focus,
  .form-group textarea:focus { border-color: #7c3aed; }
  .form-group input.error,
  .form-group textarea.error { border-color: #ef4444; }

  .error-text { color: #ef4444; font-size: 0.8rem; margin-top: 4px; }

  .alert {
    padding: 14px 18px;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 500;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .alert-success { background: #f0fdf4; color: #16a34a; border: 1.5px solid #bbf7d0; }
  .alert-error   { background: #fef2f2; color: #dc2626; border: 1.5px solid #fecaca; }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .contact-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .home-hero { padding: 36px 24px; }
    .home-hero h1 { font-size: 2rem; }
    .card, .home-projects, .contact-form-card { padding: 24px; }
    .nav { margin: 8px 12px 0; padding: 0 16px; }
  }
`;

// ─── HOME ────────────────────────────────────────────────────
function Home({ navigate }) {
  return (
    <div className="page">
      <div className="home-hero">
        <img src="/srilogo.png" alt="Sri Dharini S" className="hero-avatar" />
        <h1>Sri Dharini S</h1>
        <p className="tagline">IT Graduate · MERN Stack Intern · Aspiring Developer</p>
        <p className="summary">
          Motivated IT graduate with hands-on experience in MERN stack development and 10 months as a
          Background Verification Specialist at Neeyamo. Skilled in building full-stack applications,
          handling confidential data, and meeting deadlines. Seeking IT opportunities to apply and enhance
          technical skills while contributing to organizational growth.
        </p>
        <button className="btn-primary" onClick={() => navigate("about")}>View My Profile</button>
        <button className="btn-outline" onClick={() => navigate("contact")}>Get In Touch</button>
      </div>

      <div className="home-projects">
        <h2 className="section-title">Projects</h2>

        <div className="project-card">
          <h3>Doctor User Appointment System (MERN Stack Application)</h3>
          <div className="date">Mar 2026 – May 2026</div>
          <ul>
            <li>Built a full-stack application using the MERN stack (MongoDB, Express, React, Node.js).</li>
            <li>Implemented user authentication, appointment scheduling, and data management features.</li>
            <li>Applied modular architecture to ensure scalability and clean code structure.</li>
            <li>Gained hands-on experience in end-to-end MERN stack development.</li>
          </ul>
        </div>

        <div className="project-card">
          <h3>Personal Portfolio</h3>
          <ul>
            <li>Built a responsive personal portfolio using React.js to showcase projects and skills, with backend integration enabling email communication via Nodemailer.</li>
          </ul>
        </div>

        <h2 className="section-title" style={{ marginTop: 28 }}>Certifications</h2>
        <div className="cert-list">
          {[
            "TCS iON Career Edge – Young Professional",
            "Python Programming – SSI Education",
            "Postman API Fundamentals – Postman Academy",
            "Node.js – Absera Academy",
            "Typewriting English Junior"
          ].map(c => (
            <span className="cert-badge" key={c}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────
function About() {
  const skillSections = [
    { label: "Frontend",  skills: ["React.js", "HTML", "CSS", "JavaScript"] },
    { label: "Backend",   skills: ["Node.js", "Express.js"] },
    { label: "Database",  skills: ["MongoDB", "Mongoose"] },
    { label: "Tools",     skills: ["Git", "Postman", "VS Code"] },
    { label: "Concepts",  skills: ["REST API", "CRUD Operations", "Authentication", "Async Programming"] },
  ];

  return (
    <div className="page">
      <div className="about-grid">

        <div className="card">
          <h2 className="section-title">Technical Skills</h2>
          {skillSections.map(({ label, skills }) => (
            <div key={label} style={{ marginBottom: "16px" }}>
              <div className="skill-category-label">{label}</div>
              <div className="skills-grid">
                {skills.map(s => <div className="skill-item" key={s}>{s}</div>)}
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="section-title">Education</h2>
          <div className="timeline-item">
            <h3>B.Sc. Information Technology</h3>
            <div className="org">The Madura College</div>
            <span className="date-badge">2021 – 2024</span>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>CGPA: <strong>8.1</strong></p>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Experience</h2>

          <div className="timeline-item">
            <h3>MERN Stack Intern</h3>
            <div className="org">SharpenedMind Tech</div>
            <span className="date-badge">Mar 2026 – May 2026</span>
            <ul>
              <li>Built a Doctor-User Appointment System using the MERN stack.</li>
              <li>Developed RESTful APIs with Node.js and Express.js for scheduling and authentication.</li>
              <li>Designed responsive UI components using React.js.</li>
              <li>Managed data with MongoDB and Mongoose for appointments and user records.</li>
            </ul>
          </div>

          <div className="timeline-item">
            <h3>Background Verification Specialist</h3>
            <div className="org">Neeyamo Enterprise Solutions</div>
            <span className="date-badge">Mar 2025 – Dec 2025</span>
            <ul>
              <li>Performed U.S. criminal background checks ensuring accuracy and timely case completion.</li>
              <li>Reviewed legal records and documentation to identify discrepancies.</li>
              <li>Maintained confidentiality and achieved daily/weekly targets.</li>
              <li>Coordinated with teams to resolve verification issues efficiently.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────
function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

const handleSubmit = async () => {
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);
  setStatus(null);

  try {
    const res = await fetch(`${API_URL}/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }

  } catch {
    setStatus("error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page">
      <div className="contact-grid">
        <div className="contact-detail-card">
          <div className="contact-icon">📞</div>
          <div>
            <div className="label">Phone</div>
            <div className="value">8973513797</div>
          </div>
        </div>

        <div className="contact-detail-card">
          <div className="contact-icon">📧</div>
          <div>
            <div className="label">Email</div>
            <div className="value">
              <a href="mailto:sridharini2103@gmail.com">sridharini2103@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="contact-detail-card" style={{ gridColumn: "1 / -1" }}>
          <div className="contact-icon">💼</div>
          <div>
            <div className="label">LinkedIn</div>
            <div className="value">
              <a href="https://www.linkedin.com/in/sri-dharini-301154293" target="_blank" rel="noreferrer">
                linkedin.com/in/sri-dharini-301154293
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form-card">
        <h2 className="section-title">Send a Message</h2>

        {status === "success" && (
          <div className="alert alert-success">✅ Message sent! I'll get back to you soon.</div>
        )}
        {status === "error" && (
          <div className="alert alert-error">❌ Something went wrong. Make sure the backend is running on port 5000.</div>
        )}

        <div className="form-group">
          <label>Your Name</label>
          <input type="text" name="name" placeholder="John Doe"
            value={form.name} onChange={handleChange} className={errors.name ? "error" : ""} />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" placeholder="john@email.com"
            value={form.email} onChange={handleChange} className={errors.email ? "error" : ""} />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea rows="5" name="message" placeholder="Hi Sri, I'd love to connect..."
            value={form.message} onChange={handleChange} className={errors.message ? "error" : ""} />
          {errors.message && <div className="error-text">{errors.message}</div>}
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send Message 🚀"}
        </button>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <style>{styles}</style>

      <nav className="nav">
        {/* Profile photo + name */}
        <div className="nav-left">
          <img src="/srilogo.png" alt="Sri Dharini S" className="nav-avatar" />
          <span className="nav-brand">Sri Dharini S</span>
        </div>

        {/* Navigation links */}
        <ul className="nav-links">
          {["home", "about", "contact"].map(p => (
            <li key={p}>
              <button className={page === p ? "active" : ""} onClick={() => setPage(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {page === "home"    && <Home navigate={setPage} />}
      {page === "about"   && <About />}
      {page === "contact" && <Contact />}
    </>
  );
}