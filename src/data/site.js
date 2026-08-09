// ─────────────────────────────────────────────────────────────────────────────
//  SITE CONTENT — single source of truth.
//  Search for "TODO" to fill the four items the site couldn't derive from code.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Anjit Kumar Yadav",
  role: "Software Engineer",
  tagline:
    "Software Engineer focused on building scalable backend systems, full-stack applications, APIs, and automation platforms.",
  location: "India",
  // TODO: drop your resume PDF at public/Anjit-Kumar-Yadav-Resume.pdf
  resume: "/Anjit-Kumar-Yadav-Resume.pdf",
  email: "anjitaniket@gmail.com",
};

export const links = {
  email: "mailto:anjitaniket@gmail.com",
  linkedin: "https://www.linkedin.com/in/anjit-kumar-yadav-7ba31a227/",
  // TODO: add your GitHub profile URL (not present in the old site)
  github: "https://github.com/anjitkumaryadav",
  twitter: "https://x.com/AnjitYG",
  telegram: "https://t.me/anonymusGroupV",
};

export const nav = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Projects", target: "projects" },
  { label: "Skills", target: "skills" },
  { label: "Contact", target: "contact" },
];

// Words drifting behind the hero
export const heroFloaters = [
  "Node.js",
  "NestJS",
  "React",
  "PostgreSQL",
  "AWS",
  "REST APIs",
  "Sequelize",
  "JWT",
  "MongoDB",
  "Docker",
  "Automation",
  "Redux Toolkit",
];

export const stats = [
  { value: "3", label: "Major projects" },
  { value: "Backend", label: "+ Full stack" },
  { value: "Automation", label: "& Testing" },
];

export const experience = [
  {
    id: "impulsive",
    role: "Software Engineer",
    company: "Impulsive Web Pvt Ltd",
    period: "Jan 2025 — Present",
    summary:
      "Building production backends and full-stack features for real customer-facing products.",
    responsibilities: [
      "Design and ship REST APIs powering web platforms end to end.",
      "Model relational schemas in PostgreSQL and wire them up with Sequelize.",
      "Implement JWT auth, role-based access, and business-logic-heavy workflows.",
      "Own features across the stack — NestJS/Express services through to React clients.",
    ],
    stack: ["NestJS", "Node.js", "PostgreSQL", "Sequelize", "React", "AWS", "JWT"],
  },
  {
    id: "lnb",
    role: "Software Intern",
    // TODO: expand "L&B" to the full company name
    company: "L&B",
    period: "Apr 2023 — Jun 2023",
    summary:
      "First hands-on exposure to shipping software as part of a team.",
    responsibilities: [
      "Contributed to feature development on live codebases.",
      "Worked with version control and collaborative Git workflows.",
      "Learned to translate requirements into working, reviewed code.",
    ],
    stack: ["JavaScript", "Node.js", "Git"],
  },
  {
    id: "education",
    role: "B.Tech, Computer Science & Engineering",
    company: "Shambhunath Institute of Engineering and Technology",
    period: "2024",
    summary: "Engineering foundation — data structures, systems, and databases.",
    responsibilities: [],
    stack: [],
    isEducation: true,
  },
];

export const projects = [
  {
    index: "01",
    id: "hrms",
    name: "HRMS Portal",
    kind: "Human Resource Management System",
    mockup: "hrms",
    blurb:
      "A complete HRMS to manage employees and organizational workflows end to end — from authentication and role-based access to attendance, profiles, and an admin dashboard, all driven by a database-backed REST API.",
    stack: ["Node.js", "Express.js", "REST APIs", "JWT", "PostgreSQL", "Role-Based Access"],
    caseStudy: {
      problem:
        "HR teams juggle employee records, roles, attendance, and approvals across spreadsheets and disconnected tools. The portal centralizes all of it behind one authenticated, role-aware system.",
      architecture: [
        "REST API backend with layered controllers, services, and data access.",
        "Relational schema for employees, roles, and attendance with enforced integrity.",
        "JWT-based authentication with role-based authorization guarding every route.",
        "Admin dashboard consuming the API for management and reporting views.",
      ],
      role: "Backend and full-stack engineering — API design, auth and authorization, data modeling, and the workflows connecting them.",
      modules: [
        "Employee management & profiles",
        "Authentication & authorization",
        "Role-based access control",
        "Attendance & HR workflows",
        "Admin dashboard",
        "Database-driven REST backend",
      ],
    },
  },
  {
    index: "02",
    id: "bukmuk",
    name: "Bukmuk",
    kind: "Online Book Subscription & Library Platform",
    mockup: "bukmuk",
    blurb:
      "A production full-stack library and book-subscription platform for children, teens, and families — discovery and age/genre filtering, membership and gifting, wishlist and ordering, referrals and rewards, right through to a doorstep delivery workflow.",
    stack: ["NestJS", "PostgreSQL", "Sequelize", "React", "Redux Toolkit", "JWT", "AWS"],
    caseStudy: {
      problem:
        "Families want an easy way to discover age-appropriate books and keep a steady stream of reading arriving at home. Bukmuk turns that into a subscription product — discovery, membership, ordering, and doorstep delivery under one platform.",
      architecture: [
        "NestJS service layer over PostgreSQL, modeled with Sequelize.",
        "React + Redux Toolkit client for discovery, cart, and account flows.",
        "JWT auth spanning customer and admin surfaces.",
        "AWS-hosted deployment; admin dashboard for inventory and content.",
      ],
      role: "Full-stack delivery across subscription workflows, ordering, inventory, and the reward/referral systems.",
      modules: [
        "Book discovery, search & filtering",
        "Age & genre-based discovery",
        "Subscription / membership management",
        "Book ordering & inventory",
        "Wishlist / My Bag",
        "Referral & reward system",
        "Membership gifting",
        "Content / blog management",
        "Doorstep delivery workflow",
      ],
    },
  },
  {
    index: "03",
    id: "testmind",
    name: "Test Mind",
    kind: "Scriptless & Scripted Test Automation Platform",
    mockup: "testmind",
    blurb:
      "A web-based test automation platform supporting both scriptless and scripted testing. A Chrome Extension captures element XPaths; captures import into the dashboard, become reusable test cases, group into suites, and execute — with scripted cases for custom logic.",
    stack: ["Chrome Extensions", "Test Automation", "Node.js", "React", "Scriptless Testing"],
    pipeline: [
      { key: "extension", label: "Chrome Extension", note: "Capture from any page" },
      { key: "capture", label: "XPath Capture", note: "Elements → selectors" },
      { key: "import", label: "Dashboard Import", note: "Into Test Mind" },
      { key: "case", label: "Test Case", note: "Reusable steps" },
      { key: "suite", label: "Test Suite", note: "Organized runs" },
      { key: "execute", label: "Execute", note: "Run & report" },
    ],
    caseStudy: {
      problem:
        "Writing and maintaining UI test automation is slow and brittle, and it locks non-coders out. Test Mind lets anyone capture real elements from a browser and assemble them into runnable tests — while still allowing scripted cases where custom logic is needed.",
      architecture: [
        "Chrome Extension that captures element XPaths directly from live pages.",
        "Import pipeline bringing captured elements into the Test Mind dashboard.",
        "Reusable test cases built from captured elements, grouped into suites.",
        "Execution engine that runs suites and reports results; scripted-case support for custom automation.",
      ],
      role: "Software engineering across the platform — the browser extension, capture/import flow, and the test-building and execution model.",
      modules: [
        "Chrome Extension XPath capture",
        "Element import pipeline",
        "Reusable test case builder",
        "Test suite organization",
        "Suite execution & reporting",
        "Scripted test-case support",
      ],
    },
  },
];

export const skillClusters = [
  {
    id: "backend",
    label: "Backend",
    skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "JWT"],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React.js", "JavaScript", "Redux Toolkit"],
  },
  {
    id: "database",
    label: "Database",
    skills: ["PostgreSQL", "MongoDB", "Sequelize", "Mongoose"],
  },
  {
    id: "devops",
    label: "DevOps / Cloud",
    skills: ["AWS", "Git", "GitHub", "Docker", "Deployment"],
  },
  {
    id: "testing",
    label: "Testing / Automation",
    skills: ["Test Automation", "Chrome Extensions", "Scriptless Testing"],
  },
];

// Genuinely related skills — used to light edges on hover
export const skillRelations = [
  ["NestJS", "Sequelize"],
  ["Sequelize", "PostgreSQL"],
  ["NestJS", "PostgreSQL"],
  ["NestJS", "REST APIs"],
  ["Express.js", "REST APIs"],
  ["Node.js", "Express.js"],
  ["Node.js", "NestJS"],
  ["REST APIs", "JWT"],
  ["React.js", "Redux Toolkit"],
  ["React.js", "JavaScript"],
  ["Node.js", "JavaScript"],
  ["MongoDB", "Mongoose"],
  ["Docker", "AWS"],
  ["AWS", "Deployment"],
  ["Git", "GitHub"],
  ["Chrome Extensions", "Test Automation"],
  ["Test Automation", "Scriptless Testing"],
];

export const philosophy = [
  {
    index: "01",
    title: "Build for scale",
    body: "I care about architecture that can evolve with the product, not just pass today's demo.",
  },
  {
    index: "02",
    title: "Keep it maintainable",
    body: "Readable code and clear structure matter as much as functionality. The next engineer is a user too.",
  },
  {
    index: "03",
    title: "Automate repetitive work",
    body: "I enjoy building systems that reduce manual effort — that instinct is where Test Mind came from.",
  },
  {
    index: "04",
    title: "Solve the actual problem",
    body: "Technology should serve the product, not the other way around. I optimize for outcomes, not novelty.",
  },
];

export const aboutParagraphs = [
  "I'm a Software Engineer specializing in backend and full-stack development. My work sits where product logic meets infrastructure — designing REST APIs, modeling relational and document databases, enforcing auth and access, and shipping the systems that carry real business workflows.",
  "Across a production HRMS, a full-stack subscription platform, and a test-automation product with its own browser extension, the throughline is the same: I don't just write code, I build software systems that solve real problems.",
];
