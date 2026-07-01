import type { Project } from "../../types/project";

/**
 * liveUrl/repoUrl intentionally omitted until real links are provided —
 * ProjectDetail only renders links that exist (see .plan/portfolio-plan.md
 * "optional links" rule). Add them here once available.
 */
export const projects: Project[] = [
  {
    slug: "you-me-us",
    title: "You (me) Us.",
    outcomeLine: "Co-founded a mental health blog fostering open, stigma-free dialogue.",
    tags: ["Writing", "Mental Health", "Community"],
    image: "/projects/you-me-us.png",
  },
  {
    slug: "fuel-split-calc",
    title: "Fuel-Split Calc",
    outcomeLine: "Full-stack app for real-time multi-trip fuel cost splitting, cloud-deployed.",
    tags: ["Full-Stack", "Cloud"],
    image: "/projects/fuel-split-calc.png",
  },
  {
    slug: "phishing-detection",
    title: "Quantum-Inspired Attention Fusion Network for Phishing Detection",
    cardTitle: "Phishing Detection Network",
    outcomeLine: "5-model deep-learning ensemble hit 97.02% accuracy, cutting errors 40% vs. a 2019 baseline.",
    tags: ["Python", "PyTorch", "Deep Learning"],
    image: "/projects/phishing-detection.png",
  },
];
