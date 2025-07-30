export const wordCloudSkillsGrid = [
  [
    { name: "System Architecture", radius: 10 },
    { name: "LangChain", radius: 12 },
    { name: "Tailwind CSS", radius: 7 },
    { name: "Zustand", radius: 7 },
    { name: "MongoDB", radius: 13 },
    { name: "RAG", radius: 6 },
    { name: "CosmosDB", radius: 8 },
    { name: "Okta", radius: 9 },
  ],
  [
    { name: "Full Stack", radius: 15 },
    { name: "Authentication", radius: 10 },
    { name: "React", radius: 20 },
    { name: "SSO", radius: 9 },
    { name: "Agile", radius: 13 },
    { name: "Storybook", radius: 7 },
    { name: "Azure AI Search", radius: 8 },
    { name: "DevOps", radius: 10 },
  ],
  [
    { name: "Microservices", radius: 7 },
    { name: "OpenStreetMap", radius: 10 },
    { name: "Java", radius: 11 },
    { name: "MUI", radius: 14 },
    { name: "Stripe", radius: 9 },
    { name: "Next.js", radius: 13 },
    { name: "OpenAI", radius: 16 },
    { name: "Product-driven development", radius: 7 },
  ],
  [
    { name: "Docker", radius: 7 },
    { name: "Node.js", radius: 18 },
    { name: "Data Visualization", radius: 7 },
    { name: "Ionic", radius: 11 },
    { name: "Mapbox GL JS", radius: 12 },
    { name: "Apollo", radius: 7 },
    { name: "Azure App Services", radius: 8 },
    { name: "Product Management", radius: 7 },
  ],
  [
    { name: "Backend", radius: 13 },
    { name: "CI/CD", radius: 8 },
    { name: "NestJS", radius: 17 },
    { name: "GeoJSON", radius: 10 },
    { name: "Redux", radius: 7 },
    { name: "Kotlin", radius: 12 },
    { name: "LLMs", radius: 9 },
    { name: "FastAPI", radius: 11 },
  ],
  [
    { name: "React Native", radius: 14 },
    { name: "TypeScript", radius: 20 },
    { name: "Team Collaboration", radius: 8 },
    { name: "Agile", radius: 7 },
    { name: "Prompt Engineering", radius: 12 },
    { name: "Travel & Transportation", radius: 9 },
    { name: "Jest", radius: 8 },
    { name: "Figma", radius: 7 },
  ],
  [
    { name: "GraphQL", radius: 17 },
    { name: "Shopify", radius: 10 },
    { name: "Android", radius: 13 },
    { name: "LlamaIndex", radius: 14 },
    { name: "Gen AI", radius: 15 },
    { name: "Azure OpenAI", radius: 14 },
    { name: "UI/UX", radius: 11 },
    { name: "Gitlab", radius: 10 },
  ],
  [
    { name: "Kotlin", radius: 8 },
    { name: "Agentic Gen AI", radius: 8 },
    { name: "Python", radius: 9 },
    { name: "Frontend", radius: 13 },
    { name: "AWS", radius: 9 },
    { name: "Data Governance", radius: 8 },
    { name: "Nx", radius: 11 },
    { name: "Firebase", radius: 7 },
  ],
];

export const experiences = [
  {
    company: "IBM Consulting",
    period: "July 2022 — Present",
    image: "/images/ibm-logo.png",
    items: [
      {
        title: "Engineering Lead",
        subcompany: "Boston Consulting Group",
        description:
          "Led technical direction for the Gen AI Growth Diagnostic project, transforming manual strategy development into an AI-powered interactive platform. Designed scalable Next.js and MongoDB architecture, implemented authentication with Okta, and integrated generative AI using OpenAI and LangChain.",
        technologies: [
          "Next.js",
          "MongoDB Atlas",
          "Okta",
          "OpenAI",
          "LangChain",
          "Vercel",
        ],
      },
      {
        title: "Engineering Lead",
        subcompany: "Pizza Hut",
        description:
          "Architected and delivered the Pizza Hut Medic Assistant, a React Native app using generative AI to triage technical issues. Integrated with ServiceNow, Azure OpenAI, and deployed infrastructure on Azure while serving as the primary engineering contact for stakeholders.",
        technologies: ["React Native", "Azure", "ServiceNow", "Azure OpenAI"],
      },
      {
        title: "Senior Full Stack Engineer",
        subcompany: "Link Logistics",
        description:
          "Led frontend technical design and contributed full-stack to Property IQ, a Mapbox-based application used internally to manage property data. Implemented advanced geospatial features, optimized performance, and collaborated closely with stakeholders and junior devs.",
        technologies: [
          "React",
          "Node.js",
          "Mapbox",
          "OpenStreetMap",
          "GeoJSON",
        ],
      },
    ],
  },
  {
    company: "Kara & Nate",
    period: "Feb 2021 — Jul 2022",
    image: "/images/kara-and-nate-logo.png",
    items: [
      {
        title: "Senior Full Stack Engineer / Product Manager",
        subcompany: "atlas.co / Faredrop",
        description:
          "Redesigned atlas.co’s frontend in Vue and TypeScript, integrated with Shopify GraphQL API, and scaled seasonal sales. Led mobile app development at Faredrop, boosting revenue and subscribers with intelligent deal scoring algorithms and React/Ionic UX revamp.",
        technologies: [
          "Vue.js",
          "React",
          "TypeScript",
          "Shopify",
          "GraphQL",
          "Ionic",
        ],
      },
    ],
  },
  {
    period: "Aug 2019 — Feb 2021",
    company: "Vrbo",
    image: "/images/vrbo-logo.png",
    items: [
      {
        title: "Android Engineer",
        description:
          "Built core features for the Android Traveler app, including a map-paint search tool that generated $1M+ in revenue. Led Kotlin migration and created social features for group travel planning and polling.",
        technologies: ["Kotlin", "Java", "Android", "Map UX"],
      },
    ],
  },
];
