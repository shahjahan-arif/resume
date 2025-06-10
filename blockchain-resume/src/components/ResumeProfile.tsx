'use client';

import React from 'react';
import { Download, Github, Linkedin, Mail, MapPin, Phone, Code, Award, Briefcase, GraduationCap } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumeProfile = () => {
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Resume data - will be moved back to external file once import issue is resolved
  const personalInfo = {
    name: "Your Name",
    title: "Blockchain Developer & Smart Contract Engineer",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "Your City, State",
    github: "github.com/yourusername",
    linkedin: "linkedin.com/in/yourusername",
    bio: "Passionate blockchain developer with 5+ years of experience building decentralized applications and smart contracts. Specialized in Ethereum, Solidity, and Web3 technologies."
  };

  const skills = [
    { 
      category: "Blockchain", 
      items: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi", "NFTs", "Layer 2"] 
    },
    { 
      category: "Programming", 
      items: ["JavaScript", "TypeScript", "Python", "Rust", "Go", "Java"] 
    },
    { 
      category: "Frontend", 
      items: ["React", "Next.js", "Tailwind CSS", "Redux", "Web3 Integration", "MetaMask"] 
    },
    { 
      category: "Backend", 
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"] 
    },
    { 
      category: "Tools & DevOps", 
      items: ["Git", "Docker", "AWS", "Hardhat", "Truffle", "Foundry", "GitHub Actions"] 
    }
  ];

  const experience = [
    {
      company: "CryptoTech Solutions",
      position: "Senior Blockchain Developer",
      duration: "2022 - Present",
      description: "Led development of DeFi protocols processing $50M+ in transactions. Built and deployed 20+ smart contracts on Ethereum mainnet."
    },
    {
      company: "BlockChain Innovations",
      position: "Smart Contract Developer",
      duration: "2020 - 2022",
      description: "Developed NFT marketplace and tokenization platform. Implemented gas-optimized contracts reducing transaction costs by 40%."
    },
    {
      company: "Web3 Startup",
      position: "Full Stack Developer",
      duration: "2019 - 2020",
      description: "Built web3 applications integrating with multiple blockchain networks. Created user-friendly interfaces for complex DeFi protocols."
    }
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      year: "2019",
      specialization: "Distributed Systems & Cryptography"
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "UC Berkeley",
      year: "2017",
      specialization: "Blockchain & Cryptocurrency"
    }
  ];

  const achievements = [
    "Ethereum Developer Certification",
    "Winner - ETHGlobal Hackathon 2023",
    "Published 3 research papers on blockchain scalability",
    "Speaker at Blockchain Summit 2023",
    "Certified Solidity Developer",
    "AWS Solutions Architect"
  ];

  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      console.log('Starting PDF download...');
      
      const element = document.getElementById('resume-content');
      if (!element) {
        console.error('Resume content element not found');
        alert('Error: Resume content not found');
        return;
      }
      
      console.log('Capturing canvas...');
      
      // Create canvas with better options
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: '#0a0b0d',
        removeContainer: true,
        imageTimeout: 0,
        logging: false
      } as any);
      
      console.log('Canvas captured, creating PDF...');
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit the page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 10; // 10mm top margin
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20); // Account for margins
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10; // 10mm margin
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }
      
      console.log('Saving PDF...');
      pdf.save(`${personalInfo.name.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`);
      console.log('PDF download completed!');
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      
      // Fallback: show print dialog
      if (confirm('PDF generation failed. Would you like to use the browser print function instead?')) {
        window.print();
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Alternative simple download using browser print
  const downloadSimplePDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header with download button */}
      <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-orbitron)]">
            Blockchain Resume
          </h1>
          <div className="flex gap-2">
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={20} />
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button
              onClick={downloadSimplePDF}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              title="Alternative: Use browser print"
            >
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div id="resume-content" className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Header - Facebook-like */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 crypto-gradient relative">
            <div className="absolute inset-0 blockchain-grid opacity-30"></div>
          </div>
          
          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-gray-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="pt-20">
              <h1 className="text-4xl font-bold text-white mb-2 font-[family-name:var(--font-orbitron)]">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-blue-400 mb-4 font-[family-name:var(--font-space-mono)]">
                {personalInfo.title}
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 text-gray-300 mb-6">
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
              
              {/* Social Links */}
              <div className="flex gap-4">
                <a href={`https://${personalInfo.github}`} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a href={`https://${personalInfo.linkedin}`} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-orbitron)]">
            About
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {personalInfo.bio}
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <Code className="text-blue-400" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold text-blue-400 font-[family-name:var(--font-space-mono)]">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
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
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <Briefcase className="text-green-400" />
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{job.position}</h3>
                  <span className="text-blue-400 font-[family-name:var(--font-space-mono)]">{job.duration}</span>
                </div>
                <h4 className="text-lg text-green-400 mb-3">{job.company}</h4>
                <p className="text-gray-300 leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <GraduationCap className="text-purple-400" />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-lg text-purple-400">{edu.school}</h4>
                  <span className="text-gray-400 font-[family-name:var(--font-space-mono)]">{edu.year}</span>
                </div>
                <p className="text-gray-300 mt-1">{edu.specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <Award className="text-yellow-400" />
            Achievements & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg">
                <Award className="text-yellow-400 flex-shrink-0" size={20} />
                <span className="text-gray-200">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray-400">
        <p className="font-[family-name:var(--font-space-mono)]">
          Built with Next.js & Blockchain Technology • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default ResumeProfile;
