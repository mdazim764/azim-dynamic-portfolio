require("dotenv").config();
const mongoose = require("mongoose");

// Import all models
const Profile = require("./models/Profile");
const Education = require("./models/Education");
const Experience = require("./models/Experience");
const Project = require("./models/Project");
const Skill = require("./models/Skill");
const Achievement = require("./models/Achievement");
const Course = require("./models/Course");

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected for Seeding...");

  // 1. Clear all old data
  await Promise.all([
    Profile.deleteMany({}),
    Education.deleteMany({}),
    Experience.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Achievement.deleteMany({}),
    Course.deleteMany({}),
  ]);
  console.log("Old data cleared!");

  // 2. Insert Profile (The single source of truth)
  await Profile.create({
    name: "Azim Khairdi",
    eyebrow: "M.Tech CSE @ IIT Patna | Roll No. 2611CS05",
    heroSubtitle:
      "Software Engineer building robust products with strong CS foundations.",
    heroLead:
      "I work across backend systems, full-stack applications, and mobile development. My focus is clean architecture, practical scalability, and meaningful user impact.",
    currentProgram: "M.Tech in CSE, IIT Patna",
    specialization: "Backend, Full-Stack, React Native, REST API Integration",
    aboutText:
      "My software journey began with deep curiosity for problem solving and systems thinking. From Urdu-medium schooling to M.Tech at IIT Patna, I have continuously grown through disciplined learning and project-first execution.\nI enjoy translating ideas into working products, whether it is a React Native app for farmers, a data-driven web platform, or a backend service with clean API architecture.",
    phone: "+91 8600836379",
    emailAcademic: "azim_2611cs05@iitp.ac.in",
    emailPersonal: "khairdimdazim@gmail.com",
    github: "https://github.com/mdazim764",
    linkedin: "https://www.linkedin.com/in/azim-khairdi-680972209",
    contactIntro:
      "I am currently focused on M.Tech coursework and advanced algorithms, but I am always open to discussing software projects, internships, and full-time opportunities.",
  });

  // 3. Insert Education (Ordered by newest first)
  await Education.insertMany([
    {
      degree: "M.Tech. (CSE)",
      institute: "Indian Institute of Technology, Patna",
      duration: "2026-Present",
      grade: "Pursuing",
    },
    {
      degree: "B.Tech. (CSE)",
      institute: "N. K. Orchid College of Engineering and Technology, Solapur",
      duration: "2022-2025",
      grade: "7.35 CGPA",
    },
    {
      degree: "Diploma in Computer Technology",
      institute: "Government Polytechnic, Solapur",
      duration: "2022",
      grade: "83.14%",
    },
    {
      degree: "Secondary (SSC)",
      institute: "Maharashtra State Board",
      duration: "2019",
      grade: "72.0%",
    },
  ]);

  // 4. Insert Experience
  await Experience.insertMany([
    {
      company: "Sciqus Infotech Pvt. Ltd.",
      role: "Trainee Software Engineer",
      durationMeta: "Remote / India | Feb 2025 - Aug 2025",
      bullets: [
        "Developed and deployed robust cross-platform mobile applications using React Native.",
        "Engineered Kheti Sathi with AI logic and real-time weather API integration.",
        "Integrated Government REST APIs and implemented WebRTC for client support.",
      ],
    },
    {
      company: "Oceonic IT Solution Pvt. Ltd.",
      role: "Web Development Intern",
      durationMeta: "Solapur, India | Feb 2023 - Aug 2023",
      bullets: [
        "Customized and enhanced the A2R Store Framework for home appliance ecommerce.",
        "Integrated REST APIs for inventory and product updates using PHP and MySQL.",
      ],
    },
  ]);

  // 5. Insert Projects
  await Project.insertMany([
    {
      title: "Kheti Sathi (Agri-Tech Mobile App)",
      year: "2025",
      description:
        "Built an AI-driven agricultural mobile application designed to assist farmers with dynamic crop scheduling and real-time climatic forecasting.",
      technologies: ["React Native", "AI", "OpenWeather API", "Node.js"],
    },
    {
      title: "E-Marketing Application (E-Mart4U)",
      year: "2024",
      description:
        "Developed a full-stack enterprise application to automate business processes, featuring real-time data analysis.",
      technologies: ["C#", "ASP.NET MVC", "Entity Framework", "MySQL"],
    },
    {
      title: "Employee Management System",
      year: "2023",
      description:
        "Designed a full-stack Java desktop application to manage employee records securely.",
      technologies: ["Java", "SQL", "Java Swing"],
    },
  ]);

  // 6. Insert Skills
  await Skill.insertMany([
    {
      category: "Programming",
      items: ["C", "C++", "Python", "Java", "C#", "JavaScript", "SQL"],
    },
    {
      category: "Frameworks/Mobile",
      items: ["React Native", "ASP.NET MVC", "Node.js", "Entity Framework"],
    },
    {
      category: "Web Technologies",
      items: ["HTML/CSS", "REST APIs", "WebRTC"],
    },
    {
      category: "Tools & OS",
      items: [
        "Git",
        "GitHub",
        "Android Studio",
        "Visual Studio",
        "Linux",
        "Windows",
      ],
    },
  ]);

  // 7. Insert Achievements
  await Achievement.insertMany([
    {
      title: "1st Position - Smart India Hackathon (SIH), MHRD",
      year: "2019",
      description: "Won INR 1 Lakh cash prize.",
    },
    {
      title: "Winner - Web Designing Competition (URECKON'18)",
      year: "2018",
      description: "Organized by IEM and ISRO.",
    },
    {
      title: "GitHub Arctic Code Vault Contributor",
      year: "2020",
      description: "Contributed to repositories in the GitHub Archive Program.",
    },
  ]);

  // 8. Insert Courses
  await Course.insertMany([
    { name: "Data Structures & Algorithms" },
    { name: "DBMS" },
    { name: "Operating Systems" },
    { name: "Machine Learning" },
    { name: "Artificial Intelligence" },
    { name: "Object-Oriented Programming" },
  ]);

  console.log("Database seeded successfully!");
  process.exit();
};

seedData();
