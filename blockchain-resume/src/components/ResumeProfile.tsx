"use client";

import React from "react";
import Image from "next/image";
import {
  // Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Code,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Twitter,
} from "lucide-react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

const ResumeProfile = () => {
  // const [isDownloading, setIsDownloading] = React.useState(false);

  // Helper function to get status styling
  const getStatusStyling = (statusType: string) => {
    switch (statusType) {
      case "OPEN_TO_WORK":
        return {
          bgColor: "bg-green-600",
          borderColor: "",
          textColor: "text-green-100",
          icon: "🟢",
        };
      case "HIRING":
        return {
          bgColor: "bg-blue-600",
          borderColor: "border-blue-500",
          textColor: "text-blue-100",
          icon: "📢",
        };
      case "EMPLOYED":
        return {
          bgColor: "bg-gray-600",
          borderColor: "border-gray-500",
          textColor: "text-gray-100",
          icon: "💼",
        };
      case "FREELANCING":
        return {
          bgColor: "bg-purple-600",
          borderColor: "border-purple-500",
          textColor: "text-purple-100",
          icon: "🚀",
        };
      case "LOOKING_FOR_OPPORTUNITIES":
        return {
          bgColor: "bg-orange-600",
          borderColor: "border-orange-500",
          textColor: "text-orange-100",
          icon: "🔍",
        };
      default:
        return {
          bgColor: "bg-gray-600",
          borderColor: "border-gray-500",
          textColor: "text-gray-100",
          icon: "ℹ️",
        };
    }
  };

  // Resume data - will be moved back to external file once import issue is resolved
  const personalInfo = {
    name: "Shahjahan Arif",
    title: "M.A.R.N STACK | NEXT | MONOREPO | BLOCKCHAIN ENGINEER",
    company: "CryptoTech Solutions",
    companyLogo: "/vercel.svg", // You can replace this with your company's logo
    university: "Virtaul University",
    universityLogo: "/vu.png", // You can replace this with your university's logo
    status: {
      type: "OPEN_TO_WORK", // Options: "OPEN_TO_WORK", "HIRING", "EMPLOYED", "FREELANCING", "LOOKING_FOR_OPPORTUNITIES"
      text: "Open to work",
      subtitle: "Blockchain Developer & Full Stack Engineer roles",
    },
    email: "shajandevz@gmail.com",
    phone: "+92 (328) 4102931",
    location: "Lahore, Pakistan",
    github: "github.com/shahjahan-arif",
    linkedin: "linkedin.com/in/shajan-devz/",
    bio: "My name is Shahjahan, and I am an experienced web developer specializing in the MERN stack. With four years of professional experience, I have worked with reputable organizations like Devzbyte and RVWhale. I hold a BSCS degree and am highly committed to maintaining quality in my work, always prioritizing attention to detail and excellence. In addition to my web development expertise, I also have hands-on experience working with blockchain technologies, particularly on the Solana blockchain. I have contributed to blockchain-based applications, expanding my skill set into the world of decentralized technologies and smart contracts.",
  };

  const skills = [
    {
      category: "Blockchain",
      items: [
        "Solidity",
        "Rust",
        "Solana",
        "Web3.js",
        "Ethereum",
        "Smart Contracts",
        "DeFi",
        "NFTs",
        "Layer 2",
      ],
    },
    {
      category: "Programming",
      items: ["JavaScript", "TypeScript", "Python", "Rust", "Go", "Java"],
    },
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Redux",
        "Web3 Integration",
        "MetaMask",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "MongoDB",
        "GraphQL",
        "REST APIs",
      ],
    },
    {
      category: "Tools & DevOps",
      items: [
        "Git",
        "Docker",
        "AWS",
        "Hardhat",
        "Truffle",
        "Foundry",
        "GitHub Actions",
      ],
    },
  ];

  const experience = [
    {
      company: "RvWhale",
      position: "Frontend Engineer",
      duration: "2024 - 05/2024",
      description:
        "Wholesale Whale is an online platform designed for buying and selling used recreational vehicles (RVs), boats, and powersports products. It caters to dealerships, offering them a streamlined way to trade these items within the industry. The platform was founded by David Karstens, who previously served as a CTO for a multi-store RV dealership. His expertise helped shape the website to address the needs of dealerships more effectively​",
    },
    {
      company: "Devzbyte",
      position: "MERN | BLOCKCHAIN ENGINEER",
      duration: "09/2020 - 08/2024",
      description:
        "I worked at Devzbyte company for three years, primarily as a frontend developer, but I also handled some backend tasks. I also completed my internship there. I have built many web-based projects using blockchain technologies, most of which were for Arweave company on a contract basis. We all worked together like a family.",
    },
  
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Virtual University of Pakistan",
      year: "2022 to 2027",
      specialization: "Blockchain Technology and Distributed Systems",
    },
    {
      degree: "2 Years Diploma in Blockchain Development",
      school: "Blockchain Academy",
      year: "2020 to 2022",
      specialization: "Blockchain Development",
    },
  ];

  const achievements = [
    "Ethereum Developer Certification",
    "Winner - ETHGlobal Hackathon 2023",
    "Published 3 research papers on blockchain scalability",
    "Speaker at Blockchain Summit 2023",
    "Certified Solidity Developer",
    "AWS Solutions Architect",
    "GitHub Star for open source contributions",
    "Top 10% in Blockchain Developer Bootcamp",
    "Contributed to 5+ open source blockchain projects",
    "reactjs.org Community Contributor",
    "web3.js Core Contributor",
    "c++ Developer Certification",
    "Certified Full Stack Developer",
    "rust-lang.org Community Contributor",
 
  ];

  // const downloadPDF = async () => {
  //   try {
  //     setIsDownloading(true);
  //     console.log("Starting PDF download...");

  //     const element = document.getElementById("resume-content");
  //     if (!element) {
  //       console.error("Resume content element not found");
  //       alert("Error: Resume content not found");
  //       return;
  //     }

  //     console.log("Capturing canvas...");

  //     // Create canvas with better options
  //     const canvas = await html2canvas(element, {
  //       useCORS: true,
  //       backgroundColor: "#0a0b0d",
  //       removeContainer: true,
  //       imageTimeout: 0,
  //       logging: false,
  //     } as any);

  //     console.log("Canvas captured, creating PDF...");
  //     const imgData = canvas.toDataURL("image/png", 1.0);

  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: "a4",
  //     });

  //     // Calculate dimensions to fit the page
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = pdfWidth - 20; // 10mm margin on each side
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 10; // 10mm top margin

  //     // Add first page
  //     pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //     heightLeft -= pdfHeight - 20; // Account for margins

  //     // Add additional pages if needed
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight + 10; // 10mm margin
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //       heightLeft -= pdfHeight - 20;
  //     }

  //     console.log("Saving PDF...");
  //     pdf.save(
  //       `${personalInfo.name.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`
  //     );
  //     console.log("PDF download completed!");
  //   } catch (error) {
  //     console.error("Error downloading PDF:", error);

  //     // Fallback: show print dialog
  //     if (
  //       confirm(
  //         "PDF generation failed. Would you like to use the browser print function instead?"
  //       )
  //     ) {
  //       window.print();
  //     }
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  // Alternative simple download using browser print
  // const downloadSimplePDF = () => {
  //   window.print();
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#38b000] via-[#70e000] to-[#9ef01a]">
      {/* Header with download button */}
      <div className="sticky top-0 z-50 bg-black border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-orbitron)]">
            Blockchain Dev
          </h1>
          {/* <div className="flex gap-2">
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={20} />
              {isDownloading ? "Generating PDF..." : "Download PDF"}
            </button>
            <button
              onClick={downloadSimplePDF}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              title="Alternative: Use browser print"
            >
              Print
            </button>
          </div> */}
        </div>
      </div>

      {/* Resume Content */}
      <div id="resume-content" className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Header - Facebook-like */}
        <div className="bg-black backdrop-blur-sm   overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-[#20a21c] relative">
            <div className="absolute inset-0 blockchain-grid opacity-30"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 border-4 to-purple-600 b flex items-center justify-center">
                {/* <span className="text-4xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </span> */}
                <img src="./images.jpeg" className="rounded-full" alt="" />
              </div>
            </div>

            {/* Name and Title */}
            <div className="pt-20">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 font-[family-name:var(--font-orbitron)]">
                    {personalInfo.name}
                  </h1>

                  {/* Company/Organization - LinkedIn style */}
                  <div className="flex items-center gap-3 mb-3">
                    {personalInfo.status?.type === "OPEN_TO_WORK" ? (
                      // Show university when open to work
                      <>
                        <div className="w-8 h-8 rounded-md bg-white p-1 flex items-center justify-center">
                          <Image
                            src={personalInfo.universityLogo}
                            alt={`${personalInfo.university} logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-lg text-gray-300 font-medium">
                          {personalInfo.university}
                        </p>
                      </>
                    ) : (
                      // Show company for other statuses
                      <>
                        <div className="w-8 h-8 rounded-md bg-white p-1 flex items-center justify-center">
                          <Image
                            src={personalInfo.companyLogo}
                            alt={`${personalInfo.company} logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-lg text-gray-300 font-medium">
                          {personalInfo.company}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Badge - LinkedIn style */}
                {personalInfo.status && (
                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        getStatusStyling(personalInfo.status.type).bgColor
                      } ${
                        getStatusStyling(personalInfo.status.type).borderColor
                      } border-2 ${
                        getStatusStyling(personalInfo.status.type).textColor
                      }`}
                    >
                      <span className="text-sm">
                        {getStatusStyling(personalInfo.status.type).icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {personalInfo.status.text}
                        </span>
                        {personalInfo.status.subtitle && (
                          <span className="text-xs opacity-90">
                            {personalInfo.status.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xl mb-4 font-[family-name:var(--font-space-mono)]">
                {personalInfo.title}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Social Links - Add onClick handlers or wrap with <a> tags to make them functional */}
              {/* Example: <div onClick={() => window.open('https://github.com/yourusername')}> */}
              <div className="flex gap-4">
                <div
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="GitHub"
                >
                  <Github size={20} />
                </div>
                <div
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </div>
                <div
                  className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
                  title="Email"
                >
                  <Mail size={20} />
                </div>
                <div
                  className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
                  title="Phone"
                >
                  <Phone size={20} />
                </div>
                <div
                  className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer"
                  title="Website"
                >
                  <Globe size={20} />
                </div>
                <div
                  className="flex items-center gap-2 text-gray-300 hover:text-sky-400 transition-colors cursor-pointer"
                  title="Twitter/X"
                >
                  <Twitter size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-black backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-orbitron)]">
            About
          </h2>
          <p className=" leading-relaxed text-lg">{personalInfo.bio}</p>
        </div>

        {/* Skills Section */}
        <div className="bg-black backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <Code className="text-blue-400" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-space-mono)]">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className=" text-gray-200 px-3 py-1  text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-black backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <Briefcase className="text-green-400" />
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {job.position}
                  </h3>
                  <span className="text-blue-400 font-[family-name:var(--font-space-mono)]">
                    {job.duration}
                  </span>
                </div>
                <h4 className="text-lg text-green-400 mb-3">{job.company}</h4>
                <p className=" leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-black backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <GraduationCap className="text-purple-400" />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-white">
                  {edu.degree}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-lg text-purple-400">{edu.school}</h4>
                  <span className="text-gray-400 font-[family-name:var(--font-space-mono)]">
                    {edu.year}
                  </span>
                </div>
                <p className=" mt-1">{edu.specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-black backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <Award className="text-yellow-400" />
            Achievements & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg"
              >
                <Award className="text-yellow-400 flex-shrink-0" size={20} />
                <span className="text-gray-200">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 py-8 text-center text-black">
        <p className="font-[family-name:var(--font-space-mono)]">
          Built by Shajandevz •{new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default ResumeProfile;
