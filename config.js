/* ==========================================================================
   config.js  -  the ONE file you edit to maintain this portfolio.
   Empty strings ("") mean "not provided yet": the site hides that link or
   shows a clear fallback instead of a broken button.
   ========================================================================== */

const CONFIG = {
  /* ---- Profile links (taken from the hyperlinks inside your résumé PDF) ---- */
  links: {
    github:   "https://github.com/PotluriLalith",
    linkedin: "https://www.linkedin.com/in/potluri-lalith-chandh-a008632a9/",
    email:    "potlurilalith11@gmail.com",
    phone:    "+919885533007",            // used for tel:
    phoneDisplay: "+91 98855 33007"
  },

  /* ---- Résumé ---- */
  resume: {
    file: "assets/resume.pdf",
    downloadName: "Lalith_Chandh_Resume.pdf"
  },

  /* ---- Hero availability label. Leave "" to hide it.
          Only set this if it is true, e.g. "Open to relevant opportunities". ---- */
  availabilityLabel: "",

  /* ---- Verified academic figure used in the stats card ---- */
  cgpa: "9.24"
};

/* ==========================================================================
   SKILLS  -  delete any entry you cannot back up in an interview.
   icon  = Font Awesome class, or use  text: "C"  for a letter badge.
   ========================================================================== */
const skillGroups = [
  {
    title: "Programming languages",
    icon: "fa-solid fa-code",
    items: [
      { name: "C",      text: "C",                  desc: "Core programming and problem solving" },
      { name: "Python", icon: "fa-brands fa-python", desc: "Scripting and application logic" }
    ]
  },
  {
    title: "Web development and tools",
    icon: "fa-solid fa-laptop-code",
    items: [
      { name: "HTML",       icon: "fa-brands fa-html5",    desc: "Semantic, accessible markup" },
      { name: "CSS",        icon: "fa-brands fa-css3-alt", desc: "Responsive layouts and styling" },
      { name: "JavaScript", icon: "fa-brands fa-js",       desc: "Interactive front-end behaviour" },
      { name: "Node.js",    icon: "fa-brands fa-node-js",  desc: "Server-side JavaScript and REST APIs" },
      { name: "VS Code",    icon: "fa-solid fa-terminal",  desc: "Day-to-day development environment" },
      { name: "Git",        icon: "fa-brands fa-git-alt",  desc: "Version control" },
      { name: "GitHub",     icon: "fa-brands fa-github",   desc: "Repositories and collaboration" }
    ]
  },
  {
    title: "Cloud and databases",
    icon: "fa-solid fa-cloud",
    items: [
      { name: "Microsoft Azure", icon: "fa-brands fa-microsoft", desc: "Functions, Automation, Monitor, Log Analytics" },
      { name: "AWS",             icon: "fa-brands fa-aws",       desc: "Lambda, API Gateway, DynamoDB" },
      { name: "Google Cloud",    icon: "fa-brands fa-google",    desc: "Cloud Monitoring and health checks" },
      { name: "MongoDB",         icon: "fa-solid fa-leaf",       desc: "Document database administration" },
      { name: "MySQL",           icon: "fa-solid fa-database",   desc: "Relational database work" }
    ]
  },
  {
    title: "Additional skills",
    icon: "fa-solid fa-lightbulb",
    items: [
      { name: "Problem solving", icon: "fa-solid fa-puzzle-piece" },
      { name: "Self-learning",   icon: "fa-solid fa-book-open" },
      { name: "Presentation",    icon: "fa-solid fa-chalkboard-user" },
      { name: "Adaptability",    icon: "fa-solid fa-arrows-rotate" }
    ]
  }
];

/* ==========================================================================
   PROJECTS
   - repoUrl / liveUrl: paste the real URL. Leave "" to hide the button
     (repoUrl falls back to "Source code available on request").
   - metrics: figures from your résumé. They stay HIDDEN until you set
     metricsConfirmed: true, after you have checked they are measured and
     belong to that project.
   ========================================================================== */
const projects = [
  {
    id: "uptime-monitoring",
    title: "Website Uptime & Latency Monitoring System",
    icon: "fa-solid fa-chart-line",
    summary: "Cloud-based monitoring for website uptime, latency and service availability across multiple endpoints.",
    overview: "Developed a cloud-based monitoring system to track website uptime, latency, and service availability across multiple endpoints.",
    tech: ["Google Cloud Platform", "Google Cloud Monitoring", "Cloud-native monitoring tools"],
    contributions: [
      "Designed monitoring for more than 10 endpoints.",
      "Configured automated health-check pipelines using Google Cloud Monitoring.",
      "Worked on automated logging, performance monitoring, and reliability improvements."
    ],
    metrics: [
      "99.9% reliability reported across monitored endpoints",
      "40% reduction in false-positive alerts",
      "60% reduction in mean time to detect (MTTD) outages"
    ],
    metricsConfirmed: false,
    repoUrl: "",   // e.g. "https://github.com/PotluriLalith/uptime-monitoring"
    liveUrl: ""
  },
  {
    id: "serverless-enquiry",
    title: "Serverless Contact Form & Enquiry Management System",
    icon: "fa-solid fa-bolt",
    summary: "Event-driven enquiry handling built on AWS Lambda, API Gateway and DynamoDB.",
    overview: "Built a serverless enquiry management application using AWS Lambda, API Gateway, and DynamoDB to handle requests through a scalable, event-driven architecture.",
    tech: ["AWS Lambda", "Amazon API Gateway", "Amazon DynamoDB"],
    contributions: [
      "Integrated backend APIs for enquiry processing.",
      "Focused on improving backend response time and request handling."
    ],
    metrics: [
      "Average response time reduced from 3 seconds to 1 second during peak usage"
    ],
    metricsConfirmed: false,
    repoUrl: "",
    liveUrl: ""
  },
  {
    id: "onboarding-system",
    title: "Employee Training & Onboarding Management System",
    icon: "fa-solid fa-users-gear",
    summary: "Full-stack onboarding and training platform with authentication and role-based access.",
    overview: "Developed a full-stack employee onboarding and training management platform with authentication, role-based access, course management, and responsive user interfaces.",
    // VERIFY: your résumé lists MySQL in the heading but MongoDB in the bullets.
    // Put the database you actually used here, and change/remove the tag below.
    tech: ["HTML", "CSS", "Node.js", "MySQL", "Git", "GitHub"],
    contributions: [
      "Implemented secure authentication and role-based access control.",
      "Designed responsive interfaces and reusable components.",
      "Integrated REST APIs and database operations for efficient data management."
    ],
    metrics: [],
    metricsConfirmed: false,
    repoUrl: "",
    liveUrl: ""   // only add if a real deployment exists
  }
];

/* ==========================================================================
   CERTIFICATES  -  add a new one by appending an object to this array.
   file: path to a PDF or image (png/jpg/jpeg/webp/svg) inside assets/certificates/
   Leave verificationUrl / issueDate / expiryDate / credentialId as "" until
   you have the real values. Nothing is ever shown as "verified" automatically.
   ========================================================================== */
const certificates = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    icon: "fa-brands fa-microsoft",
    file: "assets/certificates/azure-fundamentals.pdf",
    verificationUrl: "",
    issueDate: "",
    expiryDate: "",
    credentialId: ""
  },
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    icon: "fa-brands fa-aws",
    file: "assets/certificates/aws-certified-developer-associate.pdf",
    verificationUrl: "https://aws.amazon.com/verification",
    issueDate: "May 6, 2026",
    expiryDate: "May 6, 2029",
    credentialId: ""
  },
  {
    title: "MongoDB Associate Database Administrator",
    issuer: "MongoDB",
    icon: "fa-solid fa-leaf",
    file: "assets/certificates/mongodb-associate-database-administrator.pdf",
    verificationUrl: "https://www.credly.com/go/hz7tNtuj",
    issueDate: "April 19, 2026",
    expiryDate: "",
    credentialId: ""
  },
  {
    title: "Certified Advanced Automation Professional",
    issuer: "",   // add the issuing organisation once confirmed
    icon: "fa-solid fa-gears",
    file: "",
    verificationUrl: "",
    issueDate: "",
    expiryDate: "",
    credentialId: ""
  },
  {
    title: "Linguaskill English Certification (B2)",
    issuer: "Cambridge English",
    icon: "fa-solid fa-language",
    file: "",
    verificationUrl: "",
    issueDate: "",
    expiryDate: "",
    credentialId: ""
  }
];
