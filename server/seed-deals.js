require("dotenv").config();
const mongoose = require("mongoose");
const Deal = require("./src/models/Deal.js");

const MONGO_URI = process.env.MONGODB_URI;
console.log("Mongo URI:", MONGO_URI);


const sampleDeals = [
  {
    title: "50% Off Pro Plan",
    slug: "figma-50-off-pro",
    description: "Get 50% discount on Figma Pro annual subscription for startups",
    category: "Design",
    partnerName: "Figma",
    partnerLogoUrl: "https://cdn.simpleicons.org/figma",
    discountDetails: "50% off annual Pro plan ($96/year instead of $192)",
    isLocked: true,
    eligibilityDescription: "Founders & early-stage startups with < $1M funding",
    tags: ["design", "ui/ux", "tools"],
  },
  {
    title: "Free for 1 Year",
    slug: "github-copilot-free",
    description: "Free GitHub Copilot for verified startup founders",
    category: "Development",
    partnerName: "GitHub",
    partnerLogoUrl: "https://cdn.simpleicons.org/github",
    discountDetails: "Free GitHub Copilot Pro ($20/month) for 12 months",
    isLocked: true,
    eligibilityDescription: "Verified founders with GitHub for Business",
    tags: ["development", "ai", "coding"],
  },
  {
    title: "90% Off Startup Plan",
    slug: "canva-startup-discount",
    description: "Design premium graphics with Canva Pro at massive discount",
    category: "Design",
    partnerName: "Canva",
    partnerLogoUrl: "https://tse3.mm.bing.net/th/id/OIP.efkHbAoZWpnpC5q8qZXueQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    discountDetails: "90% off Canva Pro for 1 year",
    isLocked: true,
    eligibilityDescription: "Early-stage startups and founders",
    tags: ["design", "branding", "graphics"],
  },
  {
    title: "$500 Free Credits",
    slug: "digitalocean-startup-credits",
    description: "Cloud infrastructure credits for startups",
    category: "Infrastructure",
    partnerName: "DigitalOcean",
    partnerLogoUrl: "https://cdn.simpleicons.org/digitalocean",
    discountDetails: "$500 free cloud credits",
    isLocked: true,
    eligibilityDescription: "New startup accounts",
    tags: ["cloud", "hosting", "devops"],
  },
  {
    title: "6 Months Free",
    slug: "zoom-startup-free",
    description: "Free Zoom Pro for startup teams",
    category: "Communication",
    partnerName: "Zoom",
    partnerLogoUrl: "https://cdn.simpleicons.org/zoom",
    discountDetails: "Zoom Pro free for 6 months",
    isLocked: true,
    eligibilityDescription: "Startup teams under 50 users",
    tags: ["video", "meetings", "remote"],
  },
  {
    title: "Free $200 Credits",
    slug: "google-cloud-startup",
    description: "Google Cloud credits to build and scale products",
    category: "Infrastructure",
    partnerName: "Google Cloud",
    partnerLogoUrl: "https://cdn.simpleicons.org/googlecloud",
    discountDetails: "$200 free Google Cloud credits",
    isLocked: false,
    eligibilityDescription: "All new Google Cloud users",
    tags: ["cloud", "google", "infrastructure"],
  },
  {
    title: "50% Off Startup CRM",
    slug: "hubspot-startup-discount",
    description: "CRM and marketing tools for startups",
    category: "Marketing",
    partnerName: "HubSpot",
    partnerLogoUrl: "https://cdn.simpleicons.org/hubspot",
    discountDetails: "50% off HubSpot Starter plans",
    isLocked: true,
    eligibilityDescription: "VC-backed startups",
    tags: ["crm", "sales", "marketing"],
  },
  {
    title: "Free 1 Year Pro Plan",
    slug: "loom-startup-free",
    description: "Async video messaging for startup teams",
    category: "Productivity",
    partnerName: "Loom",
    partnerLogoUrl: "https://cdn.simpleicons.org/loom",
    discountDetails: "Free Loom Pro for 1 year",
    isLocked: false,
    eligibilityDescription: "Teams with verified work email",
    tags: ["video", "productivity", "communication"],
  },
  {
    title: "80% Off Security Tools",
    slug: "snyk-startup-discount",
    description: "Secure your code and dependencies",
    category: "Security",
    partnerName: "Snyk",
    partnerLogoUrl: "https://cdn.simpleicons.org/snyk",
    discountDetails: "80% off Snyk Business plan",
    isLocked: true,
    eligibilityDescription: "Tech startups",
    tags: ["security", "devops", "code"],
  },
  {
    title: "Free Monitoring Credits",
    slug: "datadog-startup-credits",
    description: "Monitor apps and infrastructure in real-time",
    category: "Analytics",
    partnerName: "Datadog",
    partnerLogoUrl: "https://cdn.simpleicons.org/datadog",
    discountDetails: "$500 Datadog monitoring credits",
    isLocked: true,
    eligibilityDescription: "Cloud-native startups",
    tags: ["monitoring", "analytics", "devops"],
  },
  {
    title: "50% Off Email Tools",
    slug: "mailchimp-startup-discount",
    description: "Email marketing tools for early-stage companies",
    category: "Marketing",
    partnerName: "Mailchimp",
    partnerLogoUrl: "https://cdn.simpleicons.org/mailchimp",
    discountDetails: "50% off for first 12 months",
    isLocked: false,
    eligibilityDescription: "New Mailchimp users",
    tags: ["email", "marketing", "automation"],
  },
  {
    title: "Free 6 Months Database",
    slug: "mongodb-startup-atlas",
    description: "Managed MongoDB Atlas free credits",
    category: "Database",
    partnerName: "MongoDB",
    partnerLogoUrl: "https://cdn.simpleicons.org/mongodb",
    discountDetails: "Free Atlas credits for 6 months",
    isLocked: true,
    eligibilityDescription: "Startup accelerator members",
    tags: ["database", "backend", "nosql"],
  },
  {
    title: "70% Off Project Management",
    slug: "asana-startup-discount",
    description: "Manage projects and teams efficiently",
    category: "Productivity",
    partnerName: "Asana",
    partnerLogoUrl: "https://cdn.simpleicons.org/asana",
    discountDetails: "70% off Premium plan",
    isLocked: true,
    eligibilityDescription: "Small startup teams",
    tags: ["tasks", "management", "workflow"],
  },
  {
    title: "Free A/B Testing Credits",
    slug: "optimizely-startup-credit",
    description: "Experimentation and feature testing tools",
    category: "Analytics",
    partnerName: "Optimizely",
    partnerLogoUrl: "https://tse4.mm.bing.net/th/id/OIP.1olOEpOmyoqODyWKn9YjogHaHk?rs=1&pid=ImgDetMain&o=7&rm=3",
    discountDetails: "$300 free experimentation credits",
    isLocked: false,
    eligibilityDescription: "Product-led startups",
    tags: ["testing", "analytics", "product"],
  },
  {
    title: "1 Year Free Auth",
    slug: "auth0-startup-free",
    description: "Authentication and identity management",
    category: "Security",
    partnerName: "Auth0",
    partnerLogoUrl: "https://cdn.simpleicons.org/auth0",
    discountDetails: "Free B2C plan for 12 months",
    isLocked: true,
    eligibilityDescription: "Seed & Series A startups",
    tags: ["auth", "security", "identity"],
  },
  {
    title: "Free UI Components",
    slug: "tailwind-ui-startup",
    description: "Premium Tailwind UI components for startups",
    category: "Development",
    partnerName: "Tailwind UI",
    partnerLogoUrl: "https://cdn.simpleicons.org/tailwindcss",
    discountDetails: "Free access to Tailwind UI library",
    isLocked: true,
    eligibilityDescription: "Indie hackers & startups",
    tags: ["frontend", "ui", "tailwind"],
  },
  {
    title: "50% Off Error Tracking",
    slug: "sentry-startup-discount",
    description: "Real-time error monitoring for applications",
    category: "Development",
    partnerName: "Sentry",
    partnerLogoUrl: "https://cdn.simpleicons.org/sentry",
    discountDetails: "50% off Team plan",
    isLocked: false,
    eligibilityDescription: "All early-stage startups",
    tags: ["errors", "monitoring", "debugging"],
  },
  {
    title: "$100 Free Credit",
    slug: "stripe-startup-credit",
    description: "Get $100 in free Stripe processing credit",
    category: "Payments",
    partnerName: "Stripe",
    partnerLogoUrl: "https://cdn.simpleicons.org/stripe",
    discountDetails: "$100 in free payment processing credit",
    isLocked: false,
    eligibilityDescription: "No restrictions - available to all",
    tags: ["payments", "fintech", "monetization"],
  },
  {
    title: "1 Year Free AWS Credits",
    slug: "aws-startup-credits",
    description: "Get up to $100k in AWS credits for qualified startups",
    category: "Infrastructure",
    partnerName: "Amazon AWS",
    partnerLogoUrl: "https://tse1.mm.bing.net/th/id/OIP.wY5FmmM12ktsK_AmIfGRPQHaEb?rs=1&pid=ImgDetMain&o=7&rm=3",
    discountDetails: "$5k-$100k AWS credits based on funding stage",
    isLocked: true,
    eligibilityDescription: "Registered startup with < 5 years old, raised funding",
    tags: ["cloud", "infrastructure", "devops"],
  },
  {
    title: "75% Off Annual Plan",
    slug: "mixpanel-startup-discount",
    description: "Analytics platform for startups at 75% discount",
    category: "Analytics",
    partnerName: "Mixpanel",
    partnerLogoUrl: "https://cdn.simpleicons.org/mixpanel",
    discountDetails: "75% discount on annual subscription plan",
    isLocked: true,
    eligibilityDescription: "Seed-stage startups with verified founder status",
    tags: ["analytics", "data", "insights"],
  },
  {
    title: "Free Professional Plan",
    slug: "notion-startup-free",
    description: "Free Notion Teams plan for startup teams",
    category: "Productivity",
    partnerName: "Notion",
    partnerLogoUrl: "https://cdn.simpleicons.org/notion",
    discountDetails: "Free Notion Teams (normally $8/user/month)",
    isLocked: true,
    eligibilityDescription: "Teams with 5+ members, verified founders",
    tags: ["productivity", "collaboration", "wiki"],
  },
  {
    title: "30% Off All Plans",
    slug: "slack-startup-discount",
    description: "Communications platform discount for startups",
    category: "Communication",
    partnerName: "Slack",
    partnerLogoUrl: "https://cdn.simpleicons.org/slack",
    discountDetails: "30% recurring discount on all Slack plans",
    isLocked: true,
    eligibilityDescription: "Startup Status approved companies",
    tags: ["communication", "team", "chat"],
  },
  {
    title: "$1000 Free Trial",
    slug: "sendgrid-startup-trial",
    description: "Email marketing platform with $1000 free credits",
    category: "Marketing",
    partnerName: "SendGrid",
    partnerLogoUrl: "https://toppng.com/uploads/preview/sendgrid-logo-11609375862rkahi2s3im.png",
    discountDetails: "$1000 in free email sending credits",
    isLocked: false,
    eligibilityDescription: "All startups eligible",
    tags: ["email", "marketing", "communication"],
  },
];


async function seedDeals() {
  try {
    mongoose.connect(
      MONGO_URI
    )
      .then(() => console.log("MongoDB connected"))
      .catch(err => console.error(err))

    console.log("✅ Connected to MongoDB");

    // Clear existing deals
    await Deal.deleteMany({});
    console.log("🗑️  Cleared existing deals");

    // Insert sample deals
    const inserted = await Deal.insertMany(sampleDeals);
    console.log(`✅ Seeded ${inserted.length} sample deals`);

    console.log("\n📋 Deals created:");
    inserted.forEach((deal, i) => {
      console.log(`${i + 1}. ${deal.title} (${deal.slug})`);
    });

    await mongoose.disconnect();
    console.log("\n✅ Done!");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seedDeals();
