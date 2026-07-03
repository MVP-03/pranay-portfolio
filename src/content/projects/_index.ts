import type { Project } from "../../types/project";

/**
 * Curated against github.com/MVP-03 - of ~39 public repos, most are
 * unlabeled scaffold/practice repos (no description, no real content,
 * generated in bulk). Only projects with a real README, working demo, or
 * documented outcome are listed here; the rest are surfaced separately as
 * a categorized "methods & tools" list (see Projects.tsx) rather than
 * padding this list. liveUrl/repoUrl are only set where a real link
 * exists - ProjectDetail only renders links that exist (see
 * .plan/portfolio-plan.md "optional links" rule).
 */
export const projects: Project[] = [
  {
    slug: "ats-resume-agent",
    title: "ResumeAI - ATS Resume Agent",
    cardTitle: "ATS Resume Agent",
    outcomeLine: "AI dashboard that scores, tailors, and tracks job applications end-to-end.",
    tags: ["Next.js", "AI/LLM", "Supabase"],
    image: "/projects/ats-resume-agent.png",
    liveUrl: "https://ats-resume-agent-navy.vercel.app",
    repoUrl: "https://github.com/MVP-03/ats-resume-agent",
    category: "Engineering & Product",
    featured: true,
  },
  {
    slug: "you-me-us",
    title: "You (me) Us.",
    outcomeLine: "Co-founded a mental health blog fostering open, stigma-free dialogue.",
    tags: ["Writing", "Mental Health", "Community"],
    image: "/projects/you-me-us.png",
    category: "Personal",
    featured: true,
  },
  {
    slug: "phishing-detection",
    title: "Quantum-Inspired Attention Fusion Network for Phishing Detection",
    cardTitle: "Phishing Detection Network",
    outcomeLine: "5-model deep-learning ensemble hit 97.02% accuracy, cutting errors 40% vs. a 2019 baseline.",
    tags: ["Python", "PyTorch", "Deep Learning"],
    image: "/projects/phishing-detection.png",
    category: "Cybersecurity",
    featured: true,
  },
  {
    slug: "gan-smote-upsampling",
    title: "Enhancing Datasets Using Upsampling Techniques and Building Deep Learning Models",
    cardTitle: "GAN-SMOTE for Imbalanced Data",
    outcomeLine: "Hybrid GAN-SMOTE + tree-verification pipeline hit 0.9841 F1 on rare-disease detection and nearly doubled fraud-detection reliability over GAN-SMOTE alone.",
    tags: ["Python", "GANs", "PyTorch"],
    image: "/projects/gan-smote-upsampling.png",
    category: "Machine Learning",
  },
  {
    slug: "fuel-split-calc",
    title: "Fuel-Split Calc",
    outcomeLine: "Full-stack app for real-time multi-trip fuel cost splitting, cloud-deployed.",
    tags: ["Full-Stack", "Cloud"],
    image: "/projects/fuel-split-calc.png",
    repoUrl: "https://github.com/MVP-03/carpool-calculator",
    category: "Engineering & Product",
  },
];

/**
 * The remaining ~35 GitHub repos (github.com/MVP-03) are unlabeled
 * scaffold/practice builds - no description, generated in a tight burst,
 * generic tool names. Not real enough to feature individually, but real
 * enough as a signal of range, so they're grouped by method here instead
 * of listed one by one. See Projects.tsx for how this renders.
 */
export const otherRepoGroups: { label: string; count: number }[] = [
  { label: "GTM & market research", count: 10 },
  { label: "Sales & outreach tooling", count: 9 },
  { label: "Product management", count: 12 },
  { label: "Pricing & revenue models", count: 5 },
];

export const githubProfileUrl = "https://github.com/MVP-03";
