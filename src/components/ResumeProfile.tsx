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
} from "lucide-react";
import NFTShowcase from "./NFTShowcase";
import SmartContractShowcase from "./SmartContractShowcase";
import ToastProvider from "./ToastProvider";
import PortfolioSection from "./PortfolioSection";


const ResumeProfile = () => {

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
    github: "https://github.com/shahjahan-arif",
    linkedin: "https://www.linkedin.com/in/shajan-devz/",
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

  return (
    <div className="h-screen overflow-auto relative">

      {/* Lightning Strike Container */}
      <div className="lightning-container">
        <div className="screen-flash"></div>
        <div className="screen-flash"></div>
        <div className="screen-flash"></div>
        <div className="lightning-bolt"></div>
        <div className="lightning-bolt"></div>
        <div className="lightning-bolt"></div>
      </div>

      {/* Header with download button */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-300">
        <div className="w-[90%] mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold text-black font-[family-name:var(--font-orbitron)]">
            Blockchain Dev
          </h1>
        </div>
      </div>


      <div id="resume-content" className="mx-auto space-y-4 relative z-10">
        {/* Profile Header - Facebook-like */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          {/* Cover Photo */}
          <div className="h-36 bg-[#20a21c] relative horror-cover lightning-enhanced">
            <div className="absolute inset-0 opacity-30"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-4 pb-4">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-4">
              <div className="w-28 h-28 rounded-full bg-white border-4 flex items-center justify-center">
                {/* <span className="text-4xl font-bold text-black font-[family-name:var(--font-orbitron)]">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </span> */}
                <Image
                  src="/images.jpeg"
                  alt="Profile"
                  width={300}
                  height={300}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Title */}
            <div className="pt-12">
              <div className="flex md:justify-between  md:flex-row flex-col lg:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-black mb-2 font-[family-name:var(--font-orbitron)]">
                    {personalInfo.name}
                  </h1>

                  {/* Company/Organization - LinkedIn style */}
                  <div className="flex items-center gap-2 mb-2">
                    {personalInfo.status?.type === "OPEN_TO_WORK" ? (
                      // Show university when open to work
                      <>
                        <div className="w-6 h-6 rounded-md bg-white p-1 flex items-center justify-center">
                          <Image
                            src={personalInfo.universityLogo}
                            alt={`${personalInfo.university} logo`}
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm text-black font-medium">
                          {personalInfo.university}
                        </p>
                      </>
                    ) : (
                      // Show company for other statuses
                      <>
                        <div className="w-6 h-6 rounded-md bg-white p-1 flex items-center justify-center">
                          <Image
                            src={personalInfo.companyLogo}
                            alt={`${personalInfo.company} logo`}
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm text-black font-medium">
                          {personalInfo.company}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Badge - LinkedIn style */}
                {personalInfo.status && (
                  <div className="mb-2">
                    <div
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-lg ${
                        getStatusStyling(personalInfo.status.type).bgColor
                      } ${
                        getStatusStyling(personalInfo.status.type).borderColor
                      } border-2 ${
                        getStatusStyling(personalInfo.status.type).textColor
                      }`}
                    >
                      <span className="text-xs">
                        {getStatusStyling(personalInfo.status.type).icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs">
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

              <p className="text-base text-black mb-2 font-[family-name:var(--font-space-mono)]">
                {personalInfo.title}
              </p>

              {/* Contact Info */}
              <div className="flex text-black flex-wrap gap-3 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                <div
                  className="flex active:scale-90 items-center gap-1 text-black hover:text-gray-600 transition-colors cursor-pointer"
                  title="GitHub"
                  onClick={() => window.open(personalInfo.github, '_blank')}
                >
                  <Github size={16} />
                </div>
                <div
                  className="flex items-center active:scale-90 gap-1 text-black hover:text-gray-600 transition-colors cursor-pointer"
                  title="LinkedIn"
                  onClick={() => window.open(personalInfo.linkedin, '_blank')}
                >
                  <Linkedin size={16} />
                </div>
                <div
                  className="flex items-center active:scale-90 gap-1 text-black hover:text-gray-600 transition-colors cursor-pointer"
                  title="Email"
                  onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
                >
                  <Mail size={16} />
                </div>
                <div
                  className="flex items-center active:scale-90 gap-1 text-black hover:text-gray-600 transition-colors cursor-pointer"
                  title="Phone"
                  onClick={() => window.open(`tel:${personalInfo.phone}`, '_blank')}
                >
                  <Phone size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-8  gap-4 p-4">
          <div className="md:col-span-3 lg:col-span-2 w-full space-y-4">
       
            {/* About Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-black mb-3 font-[family-name:var(--font-orbitron)]">
                About
              </h2>
              <p className="text-black leading-relaxed text-sm md:text-[14px]">{personalInfo.bio}</p>
            </div>
            {/* Skills Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-black mb-3 flex items-center gap-2 font-[family-name:var(--font-orbitron)]">
                <Code className="text-black" size={18} />
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.flatMap((skillGroup, groupIndex) =>
                  skillGroup.items.map((skill, skillIndex) => (
                    <div
                      key={`${groupIndex}-${skillIndex}`}
                      className="skill-tag hover:scale-105"
                      style={{
                        animationDelay: `${
                          (groupIndex * skillGroup.items.length + skillIndex) *
                          50
                        }ms`,
                      }}
                    >
                      <span className="skill-tag-text">{skill}</span>
                      <div className="skill-tag-glow"></div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Education Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-black mb-3 flex items-center gap-2 font-[family-name:var(--font-orbitron)]">
                <GraduationCap className="text-black" size={18} />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-gray-400 pl-3"
                  >
                    <h3 className="text-base font-semibold text-black">
                      {edu.degree}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="text-sm text-black">{edu.school}</h4>
                      <span className="text-gray-600 text-xs font-[family-name:var(--font-space-mono)]">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-black text-xs mt-1">{edu.specialization}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 md:col-span-5  space-y-4">
            {/* Experience Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2 font-[family-name:var(--font-orbitron)]">
                <Briefcase className="text-black" size={18} />
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-gray-400 pl-6 pb-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-black">
                        {job.position}
                      </h3>
                      <span className="text-gray-600 font-[family-name:var(--font-space-mono)]">
                        {job.duration}
                      </span>
                    </div>
                    <h4 className="text-lg text-black mb-3">
                      {job.company}
                    </h4>
                    <p className="text-black leading-relaxed">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
                <Award className="text-black" />
                Achievements & Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex md:flex-col md:text-center items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-lg"
                  >
                    <Award
                      className="text-black flex-shrink-0"
                      size={20}
                    />
                    <span className="text-black">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

           
            <SmartContractShowcase />

           
            <PortfolioSection />

       
            <NFTShowcase />


          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastProvider />

      {/* Footer */}
      <div className="w-full mx-auto bg-white px-6 py-8 text-center text-black">
        <p className="font-[family-name:var(--font-space-mono)]">
          Built by Shajandevz •{new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default ResumeProfile;
