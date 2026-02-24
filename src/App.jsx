import { useEffect, useRef, useState } from "react";

const REEL_SLIDES = [
  {
    value: "50%",
    label: "Faster federal approvals",
    detail: "ATO delivery without delays.",
  },
  {
    value: "60%",
    label: "Less engineering overhead",
    detail: "Go microservices + automation.",
  },
  {
    value: "Manifesto",
    label: "Momentum without noise",
    detail: "Listen deeply, prototype fast, ship with discipline.",
  },
  {
    value: "Expertise",
    label: "AI + Product + Infra",
    detail: "Gemini, React, Go, AWS + GCP.",
  },
  {
    value: "Leadership",
    label: "Community as product",
    detail: "Meetups, mentorship, inclusive growth.",
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);
  const reelSectionRef = useRef(null);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "reel", label: "Reel" },
    { id: "manifesto", label: "Manifesto" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reelSection = reelSectionRef.current;
    if (!reelSection) {
      return undefined;
    }

    let frame = 0;
    const updateReel = () => {
      frame = 0;
      const viewHeight = window.innerHeight || 1;
      const start = reelSection.offsetTop;
      const end = start + reelSection.offsetHeight - viewHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const rawProgress = Math.min(Math.max((scrollY - start) / Math.max(end - start, 1), 0), 1);
      const lingerRatio = 0.55;
      const progress = Math.min(rawProgress / lingerRatio, 1);
      reelSection.style.setProperty("--reel-progress", progress.toFixed(3));
      const nextIndex = Math.min(Math.floor(progress * REEL_SLIDES.length), REEL_SLIDES.length - 1);
      setReelIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateReel);
    };

    updateReel();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateReel);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateReel);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const handleNavClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-haze text-ink">
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          activeSection === "reel" && !menuOpen ? "pointer-events-none opacity-0 -translate-y-4" : "opacity-100"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate shadow-ember backdrop-blur">
            Ravi Gupta
          </div>
          <button
            type="button"
            className="rounded-full border border-ink/10 bg-ink px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-ember transition hover:bg-ember"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            Menu
          </button>
        </nav>
      </header>
      {menuOpen && (
        <div
          id="site-menu"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 px-6 text-white"
        >
          <button
            type="button"
            className="absolute right-8 top-8 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Navigate</p>
              <div className="flex flex-col gap-4 text-2xl font-display">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    className="transition hover:text-ember"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Signal</p>
                <p className="mt-2 text-lg">Open to 2026 roles · Rockville, MD</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Contact</p>
                <div className="mt-2 space-y-2 text-sm">
                  <a href="mailto:ravgupta20@gmail.com" className="block hover:text-ember">
                    ravgupta20@gmail.com
                  </a>
                  <a href="tel:+15185300153" className="block hover:text-ember">
                    1-518-530-0153
                  </a>
                  <a href="https://www.linkedin.com/in/ravgupta20" target="_blank" rel="noreferrer" className="block hover:text-ember">
                    linkedin.com/in/ravgupta20
                  </a>
                </div>
              </div>
              <a
                href="#contact"
                onClick={handleNavClick}
                className="inline-flex rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:border-ember hover:text-ember"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </div>
      )}

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-ember-glow" />
          <div className="absolute inset-0 -z-20 bg-gold-glow" />
          <div className="absolute inset-0 -z-30 diagonal-grid" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-32">
            <div className="eyebrow">Full-stack engineer · Community builder</div>
            <div className="space-y-6">
              <h1 className="font-display text-5xl tracking-tight text-ink md:text-7xl">
                Ravi Gupta.
                <span className="block text-slate">Builds momentum.</span>
              </h1>
              <p className="max-w-2xl text-base uppercase tracking-[0.35em] text-slate">
                Product engineering · AI systems · Civic tech
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#reel"
                  className="rounded-full bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-ember transition hover:-translate-y-1"
                >
                  Enter the reel
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-ink/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink transition hover:border-ember hover:text-ember"
                >
                  Let’s talk
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="reel" ref={reelSectionRef} className="reel-section">
          <div className="reel-fade" />
          <div className="reel-sticky">
            <div className="reel-frame">
              <div className="reel-media" />
              <div className="reel-overlay">
                <h2 className="reel-title">From signal to story.</h2>
                <p className="reel-body">A calm, cinematic view of outcomes that matter.</p>
                <div className="reel-carousel">
                  <div className="reel-slide">
                    <div className="reel-stat">{REEL_SLIDES[reelIndex].value}</div>
                    <div className="reel-label">{REEL_SLIDES[reelIndex].label}</div>
                    <div className="reel-detail">{REEL_SLIDES[reelIndex].detail}</div>
                  </div>
                  <div className="reel-dots">
                    {REEL_SLIDES.map((slide, index) => (
                      <button
                        key={slide.label}
                        type="button"
                        className={`reel-dot ${index === reelIndex ? "is-active" : ""}`}
                        aria-label={`Show highlight ${index + 1}`}
                        onClick={() => setReelIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="reel-hint">Scroll to zoom in</div>
          </div>
        </section>

        <section id="manifesto" className="relative overflow-hidden afterglow py-20 text-haze">
          <div className="absolute inset-0 spotlight -z-10 opacity-60" />
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4">
              <p className="section-kicker-light">Manifesto</p>
              <h2 className="section-title-light">Momentum without noise.</h2>
            </div>
            <div className="space-y-6 text-lg text-haze/70">
              <p>
                I translate ambiguity into calm, high-performing software. Listen deeply, prototype fast, validate early, and
                ship with operational discipline.
              </p>
            </div>
          </div>
        </section>


        <section id="work" className="bg-ink py-20 text-haze">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-3">
                <p className="section-kicker-light">Featured work</p>
                <h2 className="section-title-light">Products shipped with precision.</h2>
              </div>
              <span className="text-sm uppercase tracking-[0.3em] text-haze/60">Selected projects</span>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Steward Homes",
                  desc: "Property platform with AI insights and modern ops.",
                  tags: ["SvelteKit", "TypeScript", "Vertex AI"],
                  link: "https://www.steward-homes.com/",
                },
                {
                  title: "Support-Devs",
                  desc: "Learning platform for new technologists.",
                  tags: ["SvelteKit", "Firebase", "UX Design"],
                  link: "https://www.support-devs.com/",
                },
                {
                  title: "Strata Application",
                  desc: "Cloud-hosted app with resilient delivery.",
                  tags: ["AWS Amplify", "CI/CD", "Modern JS"],
                  link: "https://strata.cx/",
                },
                {
                  title: "Buy It For Lifetime",
                  desc: "Commerce platform built for durability.",
                  tags: ["Express", "PostgreSQL", "Tailwind"],
                  link: "https://buyitforlifetime.com/",
                },
              ].map((project) => (
                <article key={project.title} className="card-dark p-8 transition hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-display text-haze">{project.title}</h3>
                    <span className="text-xs uppercase tracking-[0.35em] text-ember">Live</span>
                  </div>
                  <p className="mt-4 text-haze/70">{project.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="pill-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-ember"
                  >
                    View project →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>


        <section id="experience" className="bg-ink py-20 text-haze">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-3">
              <p className="section-kicker-light">Experience</p>
              <h2 className="section-title-light">Building momentum across sectors.</h2>
            </div>
            <div className="mt-10 grid gap-6">
              {[
                {
                  company: "Gambix",
                  role: "Full-Stack Engineer",
                  dates: "May 2025 - Present",
                  bullets: [
                    "Architected AI-powered chatbot solutions with Gemini + Vertex AI.",
                    "Built React/TypeScript frontends with Go microservices.",
                  ],
                },
                {
                  company: "iCatalyst · McLean, VA",
                  role: "Technical Lead",
                  dates: "April 2021 - February 2025",
                  bullets: [
                    "Modernized a Department of Education governance platform.",
                    "Led ATO delivery, reducing approval time by 50%.",
                  ],
                },
                {
                  company: "Information Management Services · Rockville, MD",
                  role: "Full-Stack Engineer",
                  dates: "February 2016 - April 2021",
                  bullets: [
                    "Built high-traffic web applications for NIH researchers.",
                    "Improved database response times by 60%.",
                  ],
                },
              ].map((job) => (
                <div key={job.company} className="card-dark p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-display text-haze">{job.company}</h3>
                      <p className="text-sm uppercase tracking-[0.3em] text-haze/60">{job.role}</p>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-haze/70">
                      {job.dates}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-haze/70">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="bg-haze py-20 text-ink">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-3">
              <p className="section-kicker">Education</p>
              <h2 className="section-title">Foundation built for scale.</h2>
            </div>
            <div className="mt-8 card-outline p-8">
              <h3 className="text-2xl font-display text-ink">University at Albany · SUNY</h3>
              <p className="text-sm uppercase tracking-[0.3em] text-slate">B.S. in Computer Science</p>
              <p className="mt-4 text-slate">Rigorous training in software engineering and systems thinking.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-ink" />
          <div className="absolute inset-0 bg-ember-glow opacity-60" />
          <div className="relative mx-auto max-w-6xl px-6 text-white">
            <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <p className="section-kicker text-white/70">Contact</p>
                <h2 className="font-display text-4xl md:text-5xl">Let’s ship something unforgettable.</h2>
                <p className="text-white/80">
                  I am always open to thoughtful conversations about product engineering, AI systems, and community-led
                  innovation.
                </p>
              </div>
              <div className="cutout-panel bg-white/10 text-white">
                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Email</p>
                    <a href="mailto:ravgupta20@gmail.com" className="text-lg font-semibold">
                      ravgupta20@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Phone</p>
                    <a href="tel:+15185300153" className="text-lg font-semibold">
                      1-518-530-0153
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/ravgupta20" target="_blank" rel="noreferrer">
                      linkedin.com/in/ravgupta20
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Location</p>
                    <p className="text-lg font-semibold">Rockville, MD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs uppercase tracking-[0.3em] text-haze/60">
          <span>Ravi Gupta · 2026</span>
          <span>Built with React + Bun</span>
        </div>
      </footer>
    </div>
  )
}

export default App
