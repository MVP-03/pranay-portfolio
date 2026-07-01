const experience = [
  {
    role: "GTM Product Manager",
    org: "StepsAI",
    dates: "Apr 2026 — Present",
    bullets: [
      "Owned GTM and product execution for an AI SaaS product — market research, competitor analysis, customer segmentation, outbound, demos, and sales follow-up.",
      "Built and managed a 100K+ lead database; created sales playbooks, outreach campaigns, pitch decks, and customer personas.",
      "Ran customer demos and translated pain points into product requirements; personally contributed ₹1L+ in MRR through solution-led selling.",
    ],
  },
  {
    role: "Operations Manager",
    org: "Curvedge Modulars",
    dates: "Nov 2025 — Apr 2026",
    bullets: [
      "Reduced order delays by 20% and improved on-time deliveries by 27% through order coordination, inventory tracking, and vendor follow-ups.",
      "Cut manual follow-ups by 30% via website updates, product listings, and order-flow tracking improvements.",
      "Improved issue resolution turnaround by 35% by aligning sales, warehouse, production, and support teams.",
    ],
  },
  {
    role: "AI/ML Research Intern",
    org: "GITAM Deemed to be University",
    dates: "May 2025 — Jul 2025",
    bullets: [
      "Built a phishing detector reaching 97% accuracy, cutting errors ~40% vs. prior work.",
      "Improved data quality and feature selection; validated with 5-fold cross-validation at <1ms prediction time for real-time use.",
      "Tools: Python, PyTorch, scikit-learn.",
    ],
  },
];

const education = [
  { school: "GITAM University", program: "B.Tech, Computer Science Engineering", dates: "Aug 2022 — May 2026", detail: "GPA: 7.83" },
];

const leadership = [
  {
    role: "Vice-President",
    org: "The Filmmakers Club",
    dates: "Aug 2025 — Apr 2026",
    bullets: ["Led creative marketing campaigns increasing student engagement by 50%.", "Coordinated collaborations with external partners and club growth initiatives."],
  },
  {
    role: "Vice-President & Cultural Team Lead",
    org: "KALAKRITHI",
    dates: "Jun 2024 — Jun 2025",
    bullets: ["Organized large-scale cultural events attracting over 3,000 students.", "Improved organizational visibility by 30% through strategic promotion."],
  },
];

const certifications = [
  { name: "Programming for Everybody (Getting Started with Python)", org: "University of Michigan", dates: "Apr 2024" },
];

const skills = {
  soft: ["Communication", "Leadership", "Problem-solving", "Interpersonal skills", "Management", "Critical Thinking"],
  hard: ["Python", "SQL", "Jira", "MS Tools", "Claude"],
};

function ResumeSection({
  title,
  items,
}: {
  title: string;
  items: { role: string; org: string; dates: string; bullets: string[] }[];
}) {
  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold tracking-widest text-ink/60 uppercase">{title}</h2>
      <ul className="mt-4 space-y-6">
        {items.map((item) => (
          <li key={`${item.role}-${item.org}`} className="border-b border-ink/10 pb-6">
            <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
              <p className="font-medium">
                {item.role} · {item.org}
              </p>
              <p className="mt-1 text-sm whitespace-nowrap text-ink/60 sm:mt-0">{item.dates}</p>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/70">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Resume() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Resume</h1>
        <a
          href="/resume.pdf"
          download
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-cream transition hover:opacity-90"
        >
          Download PDF
        </a>
      </div>

      <ResumeSection title="Experience" items={experience} />

      <section className="mt-10">
        <h2 className="text-sm font-semibold tracking-widest text-ink/60 uppercase">Education</h2>
        <ul className="mt-4 space-y-4">
          {education.map((item) => (
            <li key={item.school} className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <p className="font-medium">{item.school}</p>
                <p className="text-sm text-ink/70">{item.program}</p>
              </div>
              <p className="mt-1 text-sm whitespace-nowrap text-ink/60 sm:mt-0">
                {item.dates} · {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ResumeSection title="Leadership & Volunteer" items={leadership} />

      <section className="mt-10">
        <h2 className="text-sm font-semibold tracking-widest text-ink/60 uppercase">Certifications</h2>
        <ul className="mt-4 space-y-2">
          {certifications.map((cert) => (
            <li key={cert.name} className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
              <p className="text-sm text-ink/80">
                {cert.name} — <span className="text-ink/60">{cert.org}</span>
              </p>
              <p className="mt-1 text-sm whitespace-nowrap text-ink/60 sm:mt-0">{cert.dates}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold tracking-widest text-ink/60 uppercase">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[...skills.hard, ...skills.soft].map((skill) => (
            <span key={skill} className="rounded-full bg-accent-soft px-3 py-1 text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
