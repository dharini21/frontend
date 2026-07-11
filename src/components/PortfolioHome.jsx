import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root,
  [data-theme="dark"] {
    --purple: #7c3aed;
    --purple-dark: #5b21b6;
    --purple-light: #a78bfa;
    --purple-faint: rgba(124,58,237,0.14);
    --purple-faint2: rgba(124,58,237,0.28);

    --bg: #0b0815;
    --bg-elevated: #15101f;
    --bg-elevated2: #1b1429;
    --white: #ffffff;
    --text: #f3f1f8;
    --muted: #a8a3b8;
    --border: rgba(255,255,255,0.09);
    --surface-tint: rgba(255,255,255,0.03);
    --shadow-soft: 0 8px 30px rgba(124,58,237,0.18);
    --shadow-card: 0 4px 24px rgba(0,0,0,0.3);
    --overlay-scrim: rgba(11,8,21,0.45);
  }

  [data-theme="light"] {
    --purple: #7c3aed;
    --purple-dark: #5b21b6;
    --purple-light: #7c3aed;
    --purple-faint: #f3e8ff;
    --purple-faint2: #ede9fe;

    --bg: #f5f0ff;
    --bg-elevated: #ffffff;
    --bg-elevated2: #f3e8ff;
    --white: #1a1a2e;
    --text: #1a1a2e;
    --muted: #6b7280;
    --border: #e5e7eb;
    --surface-tint: #f8f6fc;
    --shadow-soft: 0 8px 30px rgba(124,58,237,0.12);
    --shadow-card: 0 4px 24px rgba(124,58,237,0.08);
    --overlay-scrim: rgba(245,240,255,0.6);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    transition: background 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }

  img, video, iframe { max-width: 100%; }

  /* ── NAV ── */
  .nav {
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: 76px;
    position: relative;
  }

  .nav-brand {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--purple-light);
    letter-spacing: 0.01em;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
    height: 100%;
    margin-left: auto;
  }

  .nav-links li { height: 100%; display: flex; align-items: center; }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .nav-links button {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 0.98rem;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    padding: 0 16px;
    transition: color 0.2s;
  }

  .nav-links button:hover { color: var(--text); }
  .nav-links button.active { color: var(--purple-light); }

  .nav-links button.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 2px;
    background: var(--purple);
    border-radius: 2px;
  }

  /* ── THEME TOGGLE ── */
  .theme-toggle {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--surface-tint);
    border: 1px solid var(--border);
    color: var(--purple-light);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    flex-shrink: 0;
  }

  .theme-toggle:hover { background: var(--purple-faint); border-color: var(--purple); transform: rotate(15deg); }
  .theme-toggle svg { width: 18px; height: 18px; }

  /* ── HAMBURGER ── */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 6px;
    border-radius: 8px;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--purple-light);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 99;
  }

  .mobile-menu button {
    background: none;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text);
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 10px;
    text-align: left;
    transition: all 0.2s;
  }

  .mobile-menu button:hover { background: var(--purple-faint); color: var(--purple-light); }
  .mobile-menu button.active { background: var(--purple); color: #fff; }

  @media (max-width: 700px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
  }

  /* ── PAGE WRAPPER ── */
  .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 60px;
    animation: fadeUp 0.45s ease;
  }

  .page.inner { padding-top: 20px; }
  .page.home-page { padding-top: 18px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── HOME HERO (video card, 2-col, left-weighted) ── */
  .hero-section {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    align-items: center;
    gap: 28px;
    min-height: 560px;
    padding: 48px 40px;
    margin-bottom: 28px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 24px;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-video-wrap {
    position: relative;
    width: 100%;
    max-width: 360px;
    aspect-ratio: 3 / 4;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 20px 50px rgba(0,0,0,0.45);
    background: var(--bg-elevated);
  }

  .hero-video-wrap video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background: rgba(11,8,21,0.45);
    backdrop-filter: blur(2px);
    transition: opacity 0.3s;
  }

  .play-overlay.hidden { opacity: 0; pointer-events: none; }

  .play-btn {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--purple);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 0 rgba(124,58,237,0.5);
    animation: pulse 2s infinite;
    transition: background 0.2s, transform 0.2s;
  }

  .play-btn:hover { background: var(--purple-dark); transform: scale(1.08); animation: none; }
  .play-btn svg { width: 24px; height: 24px; fill: #fff; margin-left: 3px; }

  .play-label {
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0.9;
  }

  @keyframes pulse {
    0%   { box-shadow: 0 0 0 0 rgba(124,58,237,0.55); }
    70%  { box-shadow: 0 0 0 16px rgba(124,58,237,0); }
    100% { box-shadow: 0 0 0 0 rgba(124,58,237,0); }
  }

  .video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(11,8,21,0.85) 0%, transparent 100%);
    padding: 14px 14px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .hero-video-wrap:hover .video-controls,
  .hero-video-wrap:focus-within .video-controls { opacity: 1; }

  .vc-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 6px;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .vc-btn:hover { background: rgba(255,255,255,0.15); }
  .vc-btn svg { width: 18px; height: 18px; fill: #fff; }

  .hero-img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--muted);
    text-align: center;
    padding: 30px;
  }

  .hero-img-placeholder .icon { font-size: 2.2rem; opacity: 0.6; }
  .hero-img-placeholder .hint { font-size: 0.82rem; max-width: 230px; line-height: 1.6; }
  .hero-img-placeholder code {
    background: var(--surface-tint);
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.78rem;
    color: var(--purple-light);
  }

  .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 18px;
  }

  .hero-eyebrow::after {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: var(--purple-light);
  }

  .hero-name {
    font-family: 'Playfair Display', serif;
    font-size: 3.4rem;
    font-weight: 900;
    color: var(--white);
    line-height: 1.08;
    margin-bottom: 18px;
  }

  .hero-tagline {
    font-size: 1.08rem;
    color: var(--purple-light);
    font-weight: 500;
    margin-bottom: 24px;
    line-height: 1.5;
  }

  .hero-summary {
    font-size: 0.97rem;
    color: var(--muted);
    line-height: 1.85;
    margin-bottom: 34px;
    max-width: 540px;
  }

  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 44px; }

  .btn-primary {
    background: var(--purple);
    color: #fff;
    border: none;
    padding: 14px 26px;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s, transform 0.2s;
  }

  .btn-primary:hover { background: var(--purple-dark); transform: translateY(-2px); }
  .btn-primary:disabled { background: #4c3a73; cursor: not-allowed; transform: none; }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1.5px solid var(--purple-faint2);
    padding: 13px 26px;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .btn-outline:hover { background: var(--purple-faint); border-color: var(--purple); transform: translateY(-2px); }

  /* ── STATS ROW (inside hero, dark cards) ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    max-width: 600px;
  }

  .stat-card {
    background: var(--surface-tint);
    padding: 20px 14px;
    text-align: center;
    border-right: 1px solid var(--border);
    transition: background 0.2s;
  }

  .stat-card:last-child { border-right: none; }
  .stat-card:hover { background: var(--purple-faint); }

  .stat-icon { font-size: 1.4rem; margin-bottom: 8px; display: block; color: var(--purple); font-weight: 700; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--purple-light); margin-bottom: 4px; }
  .stat-label { font-size: 0.72rem; color: var(--muted); font-weight: 500; line-height: 1.3; }

  /* ── SECTION TITLE ── */
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── PROJECTS ── */
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }

  .project-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 26px 28px;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    min-width: 0;
  }

  .project-card:hover {
    border-color: var(--purple);
    box-shadow: 0 8px 30px rgba(124,58,237,0.18);
    transform: translateY(-2px);
  }

  .project-card h3 { font-size: 1.05rem; font-weight: 700; color: var(--white); margin-bottom: 8px; }

  .project-date {
    font-size: 0.78rem;
    color: var(--purple-light);
    font-weight: 600;
    margin-bottom: 16px;
    display: inline-block;
    background: var(--purple-faint);
    padding: 4px 12px;
    border-radius: 20px;
  }

  .project-card ul { padding-left: 18px; color: var(--muted); font-size: 0.88rem; line-height: 1.8; }

  /* Responsive video embed for project demos */
  .project-video {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 14px 0 16px;
    border-radius: 10px;
    overflow: hidden;
    background: var(--surface-tint);
    border: 1px solid var(--border);
  }

  .project-link {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.project-link:hover {
  background: #1d4ed8;
}

  .project-video iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  /* ── CERTS ── */
  .certs-section {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 40px;
    margin-bottom: 28px;
  }

  .cert-list { display: flex; flex-wrap: wrap; gap: 12px; }

  .cert-badge {
    background: var(--surface-tint);
    color: var(--purple-light);
    padding: 9px 18px;
    border-radius: 30px;
    font-size: 0.88rem;
    font-weight: 500;
    border: 1px solid var(--purple-faint2);
    transition: all 0.2s;
  }

  .cert-badge:hover { background: var(--purple); color: #fff; border-color: var(--purple); }

  /* ── ABOUT ── */
  .about-grid { display: grid; gap: 24px; }

  .card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 40px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 8px;
  }

  .skill-item {
    background: var(--surface-tint);
    border: 1px solid var(--border);
    color: var(--text);
    text-align: center;
    padding: 11px 8px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 500;
    transition: all 0.2s;
    cursor: default;
  }

  .skill-item:hover { background: var(--purple); border-color: var(--purple); color: #fff; }

  .skill-cat-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--purple-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 18px 0 8px;
  }

  .timeline-item {
    border-left: 2px solid var(--border);
    padding-left: 22px;
    margin-bottom: 30px;
    position: relative;
  }

  .timeline-item::before {
    content: '';
    width: 11px;
    height: 11px;
    background: var(--purple);
    border-radius: 50%;
    position: absolute;
    left: -6.5px;
    top: 4px;
    box-shadow: 0 0 0 3px var(--bg-elevated);
  }

  .timeline-item h3 { font-size: 1.02rem; font-weight: 700; color: var(--white); margin-bottom: 2px; }
  .timeline-item .org { font-size: 0.9rem; color: var(--purple-light); font-weight: 600; margin: 3px 0 8px; }

  .date-badge {
    display: inline-block;
    background: var(--purple-faint);
    color: var(--purple-light);
    font-size: 0.78rem;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .timeline-item ul { padding-left: 16px; color: var(--muted); font-size: 0.88rem; line-height: 1.8; }
  .timeline-item p { color: var(--muted); }
  .timeline-item strong { color: var(--text); }

  /* ── CONTACT ── */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  .contact-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 26px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    min-width: 0;
  }

  .contact-card:hover { transform: translateY(-3px); border-color: var(--purple); box-shadow: 0 8px 32px rgba(124,58,237,0.18); }

  .contact-icon {
    width: 48px;
    height: 48px;
    background: var(--purple-faint);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .contact-card .c-label { font-size: 0.75rem; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
  .contact-card .c-value { font-size: 0.93rem; font-weight: 500; color: var(--text); word-break: break-word; min-width: 0; }
  .contact-card > div { min-width: 0; }
  .contact-card a { color: var(--purple-light); text-decoration: none; }
  .contact-card a:hover { text-decoration: underline; }

  .contact-form-wrap {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px;
  }

  .form-group { margin-bottom: 18px; }
  .form-group label { display: block; font-size: 0.88rem; font-weight: 600; color: var(--text); margin-bottom: 6px; }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px 14px;
    background: var(--surface-tint);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    color: var(--text);
    transition: border-color 0.2s;
    outline: none;
    resize: vertical;
  }

  .form-group input::placeholder, .form-group textarea::placeholder { color: #6b6680; }
  .form-group input:focus, .form-group textarea:focus { border-color: var(--purple); }
  .form-group input.err, .form-group textarea.err { border-color: #ef4444; }
  .err-text { color: #f87171; font-size: 0.8rem; margin-top: 4px; }

  .alert { padding: 14px 18px; border-radius: 10px; font-size: 0.92rem; font-weight: 500; margin-bottom: 20px; }
  .alert-success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); }
  .alert-error   { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .hero-section {
      grid-template-columns: 1fr;
      min-height: auto;
      padding: 36px 24px;
      gap: 32px;
    }
    .hero-right { order: -1; }
    .hero-video-wrap { max-width: 280px; }
    .hero-left { padding: 0; text-align: center; }
    .hero-eyebrow { justify-content: center; }
    .hero-name { font-size: 2.6rem; }
    .hero-btns { justify-content: center; }
    .stats-row { max-width: 100%; margin: 0 auto; }
    .projects-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .nav { padding: 0 16px; height: 64px; }
    .nav-brand { font-size: 1.05rem; }
    .mobile-menu { top: 64px; padding: 10px; }
    .page { padding: 0 16px 44px; }
    .page.inner { padding-top: 14px; }
    .page.home-page { padding-top: 12px; }

    .hero-section { padding: 24px 16px; margin-bottom: 20px; border-radius: 18px; gap: 24px; }
    .hero-name { font-size: 1.9rem; margin-bottom: 12px; }
    .hero-tagline { font-size: 0.95rem; margin-bottom: 16px; }
    .hero-summary { font-size: 0.9rem; line-height: 1.7; margin-bottom: 22px; }
    .hero-video-wrap { max-width: 200px; }
    .hero-btns { margin-bottom: 28px; gap: 10px; width: 100%; }
    .hero-btns button { flex: 1 1 auto; justify-content: center; padding: 12px 16px; font-size: 0.88rem; }

    .stats-row { grid-template-columns: repeat(2, 1fr); border-radius: 12px; }
    .stat-card { border-right: none; border-bottom: 1px solid var(--border); padding: 14px 10px; }
    .stat-icon { font-size: 1.15rem; margin-bottom: 5px; }
    .stat-value { font-size: 0.85rem; }
    .stat-label { font-size: 0.66rem; }

    .section-title { font-size: 1.4rem; margin-bottom: 18px; gap: 10px; }

    .card, .contact-form-wrap, .certs-section { padding: 18px 16px; border-radius: 16px; }

    .projects-grid { gap: 14px; margin-bottom: 20px; }
    .project-card { padding: 18px 16px; border-radius: 14px; }
    .project-card h3 { font-size: 0.98rem; line-height: 1.35; }
    .project-date { font-size: 0.7rem; padding: 3px 10px; margin-bottom: 10px; }
    .project-card ul { font-size: 0.82rem; line-height: 1.65; padding-left: 16px; }
    .project-video { margin: 10px 0 12px; border-radius: 8px; }

    .cert-list { gap: 8px; }
    .cert-badge { font-size: 0.78rem; padding: 7px 13px; }

    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .skill-item { font-size: 0.82rem; padding: 10px 6px; }

    .timeline-item { padding-left: 18px; margin-bottom: 22px; }
    .timeline-item h3 { font-size: 0.95rem; }
    .timeline-item .org { font-size: 0.85rem; }
    .timeline-item ul { font-size: 0.82rem; padding-left: 14px; }

    .contact-grid { gap: 12px; }
    .contact-card { padding: 16px; gap: 12px; border-radius: 14px; }
    .contact-icon { width: 40px; height: 40px; font-size: 1.15rem; border-radius: 10px; }
    .contact-card .c-value { font-size: 0.85rem; }

    .form-group input, .form-group textarea { padding: 11px 12px; font-size: 0.9rem; }
    .btn-primary, .btn-outline { width: 100%; justify-content: center; }
  }

  @media (max-width: 380px) {
    .hero-name { font-size: 1.6rem; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .skills-grid { grid-template-columns: 1fr 1fr; }
  }


`;

// ─── HERO VIDEO with play/pause/mute controls ─────────────────
// Drop your intro video into the project as /Intro_for_sri.mp4
// and it will render automatically. Until then a placeholder is shown.
function HeroVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [errored, setErrored] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  if (errored) {
    return (
      <div className="hero-video-wrap">
        <div className="hero-img-placeholder">
          <span className="icon">🎬</span>
          <span className="hint">
            Add your intro video as <code>/Intro_for_sri.mp4</code> in the
            project root and it will appear here.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-video-wrap">
      <video
        ref={videoRef}
        src="/Intro_for_sri.mp4"
        playsInline
        onEnded={() => setPlaying(false)}
        onError={() => setErrored(true)}
      />

      {/* Big play overlay — shown before first play */}
      <div className={`play-overlay ${playing ? "hidden" : ""}`}>
        <button
          className="play-btn"
          onClick={handlePlay}
          aria-label="Play video"
        >
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <span className="play-label">Play Intro</span>
      </div>

      {/* Bottom controls bar — shown on hover/focus after playing starts */}
      {playing && (
        <div className="video-controls">
          <button
            className="vc-btn"
            onClick={togglePlayPause}
            aria-label="Play or pause"
          >
            {playing ? (
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            className="vc-btn"
            onClick={toggleMute}
            aria-label="Mute or unmute"
          >
            {muted ? (
              <svg viewBox="0 0 24 24">
                <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18l2 2L21 18.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────
function Home({ navigate }) {
  return (
    <>
      <div className="page home-page">
        <div className="hero-section">
          <div className="hero-left">
            <div className="hero-eyebrow">Hello, I'm</div>
            <h1 className="hero-name">Sri Dharini S</h1>
            <p className="hero-tagline">
              IT Graduate · MERN Stack Intern · Aspiring Developer
            </p>
            <p className="hero-summary">
              Results-driven IT graduate with hands-on experience in MERN stack
              development and 10 months of industry experience at Neeyamo.
              Demonstrated ability to develop full-stack applications, implement
              secure authentication systems, and manage structured data
              efficiently. Actively seeking an entry-level software development
              role.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate("about")}>
                View My Profile →
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate("contact")}
              >
                Get In Touch →
              </button>
            </div>

            <div className="stats-row">
              {[
                {
                  icon: "🎓",
                  value: "IT Graduate",
                  label: "B.Sc. Information Technology",
                },
                {
                  icon: "💼",
                  value: "10 Months",
                  label: "Industry Experience",
                },
                {
                  icon: "</>",
                  value: "MERN Stack",
                  label: "Full Stack Development",
                },
                { icon: "🚀", value: "Aspiring", label: "Developer" },
              ].map((s) => (
                <div className="stat-card" key={s.value}>
                  <span className="stat-icon">{s.icon}</span>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <HeroVideo />
          </div>
        </div>

        {/* Projects */}
        <div className="card" style={{ marginBottom: 28 }}>
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid" style={{ marginBottom: 0 }}>
            <div className="project-card">
              <h3>Student Result Management System</h3>
              <span className="project-date">May 2026 – June 2026</span>
              <ul>
                <li>
                  Full-stack MERN application with role-based authentication
                  (Admin & Student).
                </li>
                <li>
                  Complete CRUD operations for students, subjects, and marks
                  using MongoDB/Mongoose.
                </li>
                <li>
                  Implemented automatic total marks calculation and dynamic PDF
                  marksheet generation.
                </li>
                <li>
                  Built responsive React dashboards with real-time data
                  integration through REST APIs.
                </li>
                <li>
                  Implemented JWT-based authentication and authorization for
                  secure user access.
                </li>
              </ul>
            </div>
            <div className="project-card">
              <h3>Doctor User Appointment System</h3>
              <span className="project-date">
                July 2024 – Sep 2024 · Node.js, Express.js, MongoDB
              </span>
              <ul>
                <li>
                  Developed a full-stack doctor appointment management system
                  using Node.js, Express.js, and MongoDB.
                </li>
                <li>
                  Implemented authentication and authorization to secure user
                  and doctor access.
                </li>
                <li>
                  Designed role-based authentication allowing doctors to manage
                  appointments and users to book appointments.
                </li>
                <li>
                  Created RESTful APIs for user management, doctor profiles, and
                  appointment scheduling.
                </li>
                <li>
                  Integrated MongoDB database for efficient storage and
                  management of user, doctor, and appointment data.
                </li>
              </ul>
            </div>
            <div className="project-card">
              <h3>Learning Management System</h3>
              <span className="project-date">
                Apr 2026 – May 2026 · MERN Stack
              </span>
              <ul>
                <li>
                  Enrollment Code Access – Students join courses using manually
                  generated codes.
                </li>
                <li>
                  Course Management – Admins create and manage learning content.
                </li>
                <li>
                  Drive Link Integration – Learning materials are stored and
                  accessed through cloud links.
                </li>
                <li>
                  Embedded Content Viewing – Students view resources directly
                  within the LMS.
                </li>
                <li>
                  Secure Student Access – Only enrolled students can access
                  course materials.
                </li>
              </ul>
            </div>

            <div className="project-card">
              <h3>Personal Portfolio Website</h3>
              <span className="project-date">Dec 2025 – Jun 2026</span>
              <ul>
                <li>
                  Responsive React.js portfolio with clean, modern UI/UX design.
                </li>
                <li>EmailJS integration for backend-free contact form.</li>
                <li>
                  Implemented component-based architecture for reusability and
                  maintainability.
                </li>
                <li>
                  Optimized for all screen sizes using responsive design
                  techniques.
                </li>
                <li>Deployed on Netlify for fast and reliable hosting.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="certs-section">
          <h2 className="section-title">Certifications</h2>
          <div className="cert-list">
            {[
              "TCS iON Career Edge – Young Professional",
              "Python Programming – SSI Education",
              "Postman API Fundamentals – Postman Academy",
              "Node.js – Absera Academy",
              "Typewriting English Junior",
              "Mern Stack Development - SharpenedMind Tech",
            ].map((c) => (
              <span className="cert-badge" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────
function About() {
  return (
    <div className="page inner">
      <div className="about-grid">
        <div className="card">
          <h2 className="section-title">Technical Skills</h2>
          {[
            {
              label: "Frontend",
              skills: ["React.js", "HTML5", "CSS3", "JavaScript"],
            },
            { label: "Backend", skills: ["Node.js", "Express.js"] },
            { label: "Database", skills: ["MongoDB", "Mongoose"] },
            { label: "Tools", skills: ["Git", "Postman", "VS Code"] },
            {
              label: "Concepts",
              skills: ["REST API", "JWT Auth", "CRUD", "Async JS"],
            },
          ].map(({ label, skills }) => (
            <div key={label}>
              <div className="skill-cat-label">{label}</div>
              <div className="skills-grid">
                {skills.map((s) => (
                  <div className="skill-item" key={s}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="section-title">Education</h2>
          <div className="timeline-item">
            <h3>B.Sc. Information Technology</h3>
            <div className="org">The Madura College, Madurai</div>
            <span className="date-badge">2021 – 2024</span>
            <p style={{ fontSize: "0.9rem" }}>
              CGPA: <strong>8.1</strong>
            </p>
          </div>
          <div className="timeline-item">
            <h3>Higher Secondary Certificate (HSC)</h3>
            <div className="org">Sourashtra Girls Higher Secondary School</div>
            <span className="date-badge">2020 – 2021</span>
            <p style={{ fontSize: "0.9rem" }}>
              Percentage: <strong>83%</strong>
            </p>
          </div>
          <div className="timeline-item">
            <h3>Secondary School Leaving Certificate (SSLC)</h3>
            <div className="org">Sourashtra Girls Higher Secondary School</div>
            <span className="date-badge">2018 – 2019</span>
            <p style={{ fontSize: "0.9rem" }}>
              Percentage: <strong>74%</strong>
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Experience</h2>
          <div className="timeline-item">
            <h3>MERN Stack Intern</h3>
            <div className="org">SharpenedMind Tech</div>
            <span className="date-badge">Dec 2025 – Apr 2026</span>
            <ul>
              <li>
                Implemented JWT-based role authentication for Admin and Student
                roles.
              </li>
              <li>
                Built full CRUD operations for students, subjects, and marks.
              </li>
              <li>
                Designed scalable MongoDB schemas with Mongoose relationship
                handling.
              </li>
              <li>
                Integrated React frontend with Node/Express backend via REST
                APIs.
              </li>
              <li>
                Built PDF marksheet generation and download functionality.
              </li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>Background Verification Specialist</h3>
            <div className="org">Neeyamo Enterprise Solutions</div>
            <span className="date-badge">Mar 2025 – Dec 2025</span>
            <ul>
              <li>
                Performed U.S. criminal background checks by analyzing court
                records.
              </li>
              <li>
                Reviewed legal documents to identify discrepancies and ensure
                accuracy.
              </li>
              <li>
                Maintained strict confidentiality while handling sensitive
                candidate data.
              </li>
              <li>
                Met daily/weekly TAT targets with consistent quality output.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────────
function Projects() {
  return (
    <div className="page inner">
      <div className="card" style={{ marginBottom: 24 }}>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="projects-grid" style={{ marginBottom: 28 }}>
        <div className="project-card">
          <h3>Student Result Management System</h3>
          <span className="project-date">
            May 2026 – June 2026 · MERN Stack
          </span>
          <br />
          <span className="project-date">
            Test Credentials (Teacher Login): Email: tharun@gmail.com, Password:
            123456
          </span>
          <br />
          <span className="project-date">
            Student Credentials (Student Login): Email:sridharini2103@gmail.com,
            class:1 , Section:A
          </span>
          <p>
            <a
              href="https://srmsfront.vercel.app/teacher/login"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              🚀 Live Website
            </a>
          </p>
          <div className="project-video">
            <iframe
              src="https://drive.google.com/file/d/1AuD6yl4rUcZLTVM-7gYbPE_LVBLoVFy8/preview"
              allow="autoplay"
              title="Student Result Management System Demo"
            ></iframe>
          </div>
          <ul>
            <li>
              Full-stack application with role-based authentication for Admin
              and Students using JWT.
            </li>
            <li>
              Built complete CRUD operations for managing admins, students,
              subjects, and marks.
            </li>
            <li>
              Designed modular backend architecture with structured Mongoose
              models.
            </li>
            <li>
              Established relationships between students, subjects, and marks
              for efficient data handling.
            </li>
            <li>
              Implemented automatic total marks calculation based on
              subject-wise scores.
            </li>
            <li>
              Built PDF marksheet generation and download functionality
              dynamically.
            </li>
            <li>
              Created responsive Admin and Student dashboards with real-time
              data integration.
            </li>
          </ul>
        </div>
        <div className="project-card">
          <h3>Agricultural Marketplace & Farm Management System</h3>
          <span className="project-date">Apr 2026 – May 2026 · MERN Stack</span>

          <div className="project-video">
            <iframe
              src="https://drive.google.com/file/d/1PxVMRuJPVVenwT3jCArhHZ1bR5KpNtKe/preview"
              allow="autoplay"
              title="Agricultural Marketplace & Farm Management System Demo"
            ></iframe>
          </div>

          <ul>
            <li>
              Developed a full-stack agricultural marketplace and farm
              management web application using the MERN Stack.
            </li>
            <li>
              Implemented secure role-based authentication and authorization for
              administrators, farmers, and customers.
            </li>
            <li>
              Built farmer dashboards to upload, manage, and update agricultural
              products with image upload functionality.
            </li>
            <li>
              Enabled customers to browse products, book farm services, and
              submit reviews through an intuitive user interface.
            </li>
            <li>
              Created admin modules for managing users, bookings, products, and
              platform operations with complete CRUD functionality.
            </li>
            <li>
              Designed a responsive, deployment-ready architecture with MongoDB,
              Express.js, React.js, and Node.js for scalable performance.
            </li>
            <li>
              Integrated RESTful APIs for seamless communication between the
              frontend and backend with efficient data handling.
            </li>
            <li>
              Optimized database queries and state management to provide faster
              product browsing and booking experiences.
            </li>
            <li>
              Followed a modular component-based architecture and Git version
              control to ensure maintainable, scalable, and collaborative
              development.
            </li>
          </ul>
        </div>

        <div className="project-card">
          <h3>Learning Management System</h3>
          <span className="project-date">Apr 2026 – May 2026 · MERN Stack</span>
          <div className="project-video">
            <iframe
              src="https://drive.google.com/file/d/1hjHl-f3SagR3so7L466jDxIovclWSiqh/preview"
              allow="autoplay"
              title="Learning Management System Demo"
            ></iframe>
          </div>
          <ul>
            <li>
              Developed a full-stack learning platform with enrollment
              code-based access for students.
            </li>
            <li>
              Implemented course and content management features for organizing
              learning resources.
            </li>
            <li>
              Created manual enrollment code generation and validation for
              secure student access.
            </li>
            <li>
              Integrated cloud drive links and embedded frames for seamless
              content viewing.
            </li>
            <li>
              Designed structured backend architecture with MongoDB models for
              managing courses and resources.
            </li>
            <li>
              Built responsive dashboards for admins and students with efficient
              learning content management.
            </li>
          </ul>
        </div>
        <div className="project-card">
          <h3>Doctor User Appointment System</h3>
          <span className="project-date">
            July 2024 – Sep 2024 · Node.js, Express.js, MongoDB
          </span>
          <ul>
            <li>
              Developed a full-stack doctor appointment management system using
              Node.js, Express.js, and MongoDB with a scalable RESTful
              architecture.
            </li>

            <li>
              Implemented JWT-based authentication and role-based authorization
              for users, doctors, and administrators.
            </li>

            <li>
              Designed secure login and registration workflows with password
              hashing using bcrypt.
            </li>

            <li>
              Built RESTful APIs for user management, doctor profiles,
              appointment booking, cancellation, and status updates.
            </li>

            <li>
              Developed appointment scheduling logic to prevent duplicate
              bookings and manage doctor availability.
            </li>

            <li>
              Integrated MongoDB with Mongoose for efficient schema design, data
              validation, and database relationships.
            </li>

            <li>
              Implemented middleware for authentication, authorization, request
              validation, and centralized error handling.
            </li>

            <li>
              Added input validation using Express Validator/Joi to improve data
              integrity and application security.
            </li>

            <li>
              Optimized database queries using indexing and efficient CRUD
              operations for better performance.
            </li>

            <li>
              Followed the MVC architecture to maintain clean, modular, and
              reusable code.
            </li>

            <li>
              Tested API endpoints using Postman to ensure functionality and
              reliability.
            </li>

            <li>
              Implemented pagination and filtering for doctor listings and
              appointment history.
            </li>

            <li>
              Enabled users to view, book, reschedule, and cancel appointments
              through secure APIs.
            </li>
          </ul>
        </div>
      </div>
      <div className="certs-section">
        <h2 className="section-title">Certifications</h2>
        <div className="cert-list">
          {[
            "TCS iON Career Edge – Young Professional",
            "Python Programming – SSI Education",
            "Postman API Fundamentals – Postman Academy",
            "Node.js – Absera Academy",
            "Typewriting English Junior",
            "Mern Stack Development - SharpenedMind Tech",
          ].map((c) => (
            <span className="cert-badge" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  // ...inside your component, replace handleSubmit with:

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        "service_ff1ostc",
        "template_6scc1ng",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: "UFCMLnf7voMhou68h" }, // ✅ object, not a string
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err); // ✅ so you can actually see what failed
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page inner">
      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-icon">📮</div>
          <div>
            <div className="c-label">Email</div>
            <div className="c-value">
              <a href="mailto:sridharini2103@gmail.com">
                sridharini2103@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📱</div>
          <div>
            <div className="c-label">Instagram</div>
            <div className="c-value">
              <a
                href="https://www.instagram.com/sri_dharini21/"
                target="_blank"
                rel="noreferrer"
              >
                @sri_dharini21
              </a>
            </div>
          </div>
        </div>
        <div className="contact-card">
          <div className="contact-icon">🤖</div>
          <div>
            <div className="c-label">GitHub</div>
            <div className="c-value">
              <a
                href="https://github.com/dharini21?tab=repositories"
                target="_blank"
                rel="noreferrer"
              >
                dharini21
              </a>
            </div>
          </div>
        </div>

        <div className="contact-card">
          <div className="contact-icon">🌐</div>
          <div>
            <div className="c-label">LinkedIn</div>
            <div className="c-value">
              <a
                href="https://www.linkedin.com/in/sri-dharini-301154293"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/sri-dharini-301154293
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form-wrap">
        <h2 className="section-title">Send a Message</h2>
        {status === "success" && (
          <div className="alert alert-success">
            ✅ Message sent! I'll get back to you soon.
          </div>
        )}
        {status === "error" && (
          <div className="alert alert-error">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "err" : ""}
          />
          {errors.name && <div className="err-text">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="john@email.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "err" : ""}
          />
          {errors.email && <div className="err-text">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="5"
            name="message"
            placeholder="Hi Sri, I'd love to connect..."
            value={form.message}
            onChange={handleChange}
            className={errors.message ? "err" : ""}
          />
          {errors.message && <div className="err-text">{errors.message}</div>}
        </div>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message 🚀"}
        </button>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────
const NAV_PAGES = ["home", "about", "projects", "contact"];

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
  };
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div
      data-theme={theme}
      style={{ background: "var(--bg)", minHeight: "100vh" }}
    >
      <style>{styles}</style>

      <nav className="nav">
        <span className="nav-brand">Sri Dharini S</span>

        <ul className="nav-links">
          {NAV_PAGES.map((p) => (
            <li key={p}>
              <button
                className={page === p ? "active" : ""}
                onClick={() => navigate(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV_PAGES.map((p) => (
              <button
                key={p}
                className={page === p ? "active" : ""}
                onClick={() => navigate(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {page === "home" && <Home navigate={navigate} />}
      {page === "about" && <About />}
      {page === "projects" && <Projects />}
      {page === "contact" && <Contact />}
    </div>
  );
}
