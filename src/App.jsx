import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Smartphone,
  CodeXml,
  Database,
  CreditCard,
  Layers,
  Mail,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { content } from './data/content';
import './App.css';

/* Social SVG Icons */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 24 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.297 3.297-8.502-9.24-7.227 8.26h-3.308l7.227-8.26-8.502-9.24 3.297-3.297 8.502 9.24 7.227-8.26z" />
    </svg>
  );
}

/* Scroll Progress Bar */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? scrollY / totalHeight : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

/* Header & Navbar */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sectionElements = content.nav
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const current = sectionElements.find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeydown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <a className="logo" href="#home" onClick={closeMenu} aria-label={`${content.identity.name}, home`}>
          <span>{content.identity.initials}</span>
        </a>

        <nav className="nav" role="navigation" aria-label="Main navigation">
          <div className="nav-links">
            {content.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            <span>Let's talk</span>
            <ArrowUpRight size={16} />
          </a>
        </nav>

        <button
          className="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="navigation" aria-label="Mobile navigation">
        {content.nav.map((item, idx) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={closeMenu}
            style={{ transitionDelay: `${idx * 0.05}s` }}
          >
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          <span>Let's talk</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </>
  );
}

/* Hero Section */
function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="hero" id="home">
      <div className="bg-layer" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <div className="container hero-grid">
        <div>
          <div className="hero-badge reveal">
            <span>🇳🇬 {content.hero.badge}</span>
          </div>

          <h1 className="hero-title reveal reveal-delay-1">
            Building <span className="accent">scalable</span> software
          </h1>

          <p className="hero-desc reveal reveal-delay-2">
            {content.hero.subtext}
          </p>

          <div className="hero-actions reveal reveal-delay-3">
            <a className="btn btn-primary" href="#work">
              <span>View Work</span>
              <ArrowUpRight size={18} />
            </a>
            <a className="btn btn-secondary" href="#contact">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        <div className="hero-visual reveal reveal-delay-2">
          {!imageError ? (
            <div className="hero-portrait-card">
              <img
                src="/profile.svg"
                alt={content.identity.name}
                className="hero-portrait-img"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="orb" aria-hidden="true">
              <div className="orb-ring orb-ring-1" />
              <div className="orb-ring orb-ring-2" />
              <div className="orb-ring orb-ring-3" />
              <div className="orb-core">
                <span className="label">{content.identity.initials}</span>
                <span className="sub">Systems / 01</span>
              </div>
              <div className="orb-particles">
                <span className="orb-particle" />
                <span className="orb-particle" />
                <span className="orb-particle" />
                <span className="orb-particle" />
                <span className="orb-particle" />
                <span className="orb-particle" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll to explore</span>
        <ArrowDown size={20} />
      </div>
    </section>
  );
}

/* About Section */
function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Computer Science student <span className="accent">shipping products</span>
          </h2>
          <p className="section-desc">
            Undergraduate at Afe Babalola University (ABUAD), focused on Flutter, scalable web engineering, and backend architectures.
          </p>
        </header>

        <div className="about-grid">
          <div className="about-text">
            <p className="reveal reveal-delay-1">
              {content.about.paragraph}
            </p>
            <p className="reveal reveal-delay-2">
              Beyond pure syntax, I care deeply about the nuances that turn code into trusted products: responsive animations, accessible design, reliable offline sync, and sound academic foundations in algorithms and software engineering.
            </p>

            <div className="about-stats reveal reveal-delay-3">
              <div className="stat">
                <div className="stat-value">6+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat">
                <div className="stat-value">3</div>
                <div className="stat-label">Platforms</div>
              </div>
              <div className="stat">
                <div className="stat-value">4+</div>
                <div className="stat-label">Core Stacks</div>
              </div>
            </div>
          </div>

          <div className="about-card reveal reveal-delay-4">
            <h3>Currently Focused On</h3>
            <p>{content.about.focus}</p>
            <div className="about-pills">
              <span className="about-pill">🇳🇬 Nigeria Tech Ecosystem</span>
              <span className="about-pill">Flutter & Dart</span>
              <span className="about-pill">Modern React</span>
              <span className="about-pill">ABUAD CS</span>
              <span className="about-pill">REST APIs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Services Section */
const serviceIcons = [Smartphone, CodeXml, Database, CreditCard, Layers];

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">What I Do</span>
          <h2 className="section-title">
            Services <span className="accent">tailored</span> to your vision
          </h2>
          <p className="section-desc">
            From architecture to production release, I engineer end-to-end digital experiences with craft and reliability.
          </p>
        </header>

        <div className="services-grid">
          {content.services.map((service, idx) => {
            const IconComponent = serviceIcons[idx] || Layers;
            return (
              <article
                key={service.number}
                className="service-card reveal"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="service-icon">
                  <IconComponent size={24} strokeWidth={1.8} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Projects / Work Section */
function Work() {
  const [filter, setFilter] = useState('All work');
  const categories = ['All work', 'Mobile', 'Web', 'Full-stack'];

  const filteredProjects =
    filter === 'All work'
      ? content.projects
      : content.projects.filter(
          (project) => project.category.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="work-header reveal">
          <div>
            <span className="section-tag">Selected Work</span>
            <h2 className="section-title">
              Projects <span className="accent">shipped</span> recently
            </h2>
          </div>

          <div className="work-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn${filter === category ? ' active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="project-card reveal"
              style={{ transitionDelay: `${idx * 0.08}s` }}
            >
              {project.image && (
                <div className="project-image-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="project-content">
                <div className="project-meta">
                  <span className="badge">{project.category}</span>
                  <span className="dot" />
                  <span>{project.stack}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Skills Section */
function Skills() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    const skillsElement = document.getElementById('skills');
    if (skillsElement) observer.observe(skillsElement);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Skills</span>
          <h2 className="section-title">
            Technical <span className="accent">proficiency</span>
          </h2>
          <p className="section-desc">
            Core competencies grounded in Computer Science principles and hardened through continuous shipping.
          </p>
        </header>

        <div className="skills-grid">
          <div className="skill-bars">
            {content.skills.map((skill, idx) => (
              <div
                key={skill.name}
                className={`skill-bar${visible ? ' visible' : ''}`}
                style={{
                  '--level': skill.level / 100,
                  transitionDelay: `${idx * 0.1}s`,
                }}
              >
                <div className="skill-bar-header">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" />
                </div>
              </div>
            ))}
          </div>

          <div className="skill-categories">
            {content.skillGroups.map((group, idx) => (
              <div
                key={group.title}
                className="skill-category reveal"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <h4>{group.title}</h4>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Contact Section */
function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <header
          className="section-header reveal"
          style={{ textAlign: 'left', maxWidth: 'none', marginBottom: '50px' }}
        >
          <span className="section-tag">Contact</span>
          <h2 className="section-title">
            Let's <span className="accent">build something</span> great
          </h2>
          <p className="section-desc">
            Have an opportunity, internship, project collaboration, or just want to connect? Reach out below!
          </p>
        </header>

        <div className="contact-grid">
          <form
            className="contact-form reveal reveal-delay-1"
            action={`mailto:${content.identity.email}`}
            method="POST"
            encType="text/plain"
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project, team, or opportunity..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary form-submit">
              <span>Send Message</span>
              <ArrowUpRight size={18} />
            </button>
          </form>

          <div className="contact-info reveal reveal-delay-2">
            <div className="contact-card">
              <h4>Direct Email</h4>
              <p>
                <a href={`mailto:${content.identity.email}`}>{content.identity.email}</a>
              </p>
            </div>

            <div className="contact-card">
              <h4>Location & Education</h4>
              <p>{content.identity.institution}</p>
              <p style={{ marginTop: '4px', color: 'var(--accent)' }}>
                📍 {content.identity.location}
              </p>
            </div>

            <div className="contact-links">
              <a
                className="contact-link"
                href={content.identity.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
                <span>GitHub Profile</span>
              </a>

              <a
                className="contact-link"
                href={content.identity.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon />
                <span>LinkedIn Profile</span>
              </a>

              <a
                className="contact-link"
                href={content.identity.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Footer Section */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="logo" href="#home">
              <span>{content.identity.initials}</span>
            </a>
            <p>
              {content.identity.name} — Nigerian Computer Science student at Afe Babalola University (ABUAD) building clean, high-performance mobile and web software.
            </p>
            <div className="footer-social">
              <a href={content.identity.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href={content.identity.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href={content.identity.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>

          <nav className="footer-col" aria-label="Navigation">
            <h4>Navigation</h4>
            <ul>
              {content.nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Services">
            <h4>Services</h4>
            <ul>
              {content.services.map((service) => (
                <li key={service.number}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-contact">
            <h4>Contact</h4>
            <p>{content.identity.location}</p>
            <p style={{ marginTop: '8px' }}>
              <a href={`mailto:${content.identity.email}`}>{content.identity.email}</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {content.identity.name}. All rights reserved.</p>
          <a href="#home">
            <span>Back to top</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* Main App Component */
export default function App() {
  useEffect(() => {
    // Reveal animation observer
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
