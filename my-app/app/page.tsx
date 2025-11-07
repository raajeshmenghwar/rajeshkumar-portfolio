'use client';
import React, { useState, useEffect } from 'react';
import { 
    Menu, 
    X, 
    Linkedin, 
    Github, 
    Book, 
    Twitter, 
    Youtube, 
    Facebook, 
    Instagram, 
    Mail,
    Download, 
    ArrowUp, 
    Briefcase,
    ShieldCheck, 
    Code, 
    Database, 
    BrainCircuit, 
    Cloud, 
    Server, 
    Smartphone, 
    Search,
    Award,
    Trophy,
    Users,
    ChevronRight,
    Link,
    Star,
    MapPin,
    Calendar,
    MousePointerClick,
    Sparkles, // Added for Gemini features
    Loader2 // Added for loading states
} from 'lucide-react';

/*
================================================================================
Theme Colors (as requested)
================================================================================
Background: #1C1C1E (bg-charcoal)
Accent: #00ADB5 (text-teal)
Secondary Accent: #EEEEEE (text-secondary-accent / border-secondary-accent)
Text (Primary): #F5F5F5 (text-primary)
Subtext: #BDBDBD (text-subtext)
Hover/Link: #00FFF5 (hover:text-cyan-hover)
*/

// Tailwind Custom Colors Configuration (for your tailwind.config.js)
/*
module.exports = {
  theme: {
    extend: {
      colors: {
        'charcoal': '#1C1C1E',
        'teal': '#00ADB5',
        'secondary-accent': '#EEEEEE',
        'primary-text': '#F5F5F5',
        'subtext': '#BDBDBD',
        'cyan-hover': '#00FFF5',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Example: using Inter font
      }
    },
  },
  plugins: [],
}
*/

// =============================================================================
// GEMINI API CALLER FUNCTION (NEW)
// =============================================================================
// /**
//  * Calls the Gemini API with exponential backoff for retries.
//  * @param {string} userPrompt - The user's prompt.
//  * @param {string} systemInstruction - The system prompt to guide the model.
//  * @param {object|null} responseSchema - Optional JSON schema for structured output.
//  * @returns {Promise<{data: any, error: string|null}>} - The result of the API call.
//  */
// // const callGeminiApi = async (userPrompt, systemInstruction, responseSchema = null) => {
//     const apiKey = ""; // Leave as-is, Canvas will provide it in runtime
//     const apiUrl = `https://generativelen.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

//     const payload = {
//         contents: [{ parts: [{ text: userPrompt }] }],
//         systemInstruction: {
//             parts: [{ text: systemInstruction }]
//         },
//         generationConfig: {}
//     };

//     if (responseSchema) {
//         payload.generationConfig.responseMimeType = "application/json";
//         payload.generationConfig.responseSchema = responseSchema;
//     }

//     let retries = 5;
//     let delay = 1000;

//     while (retries > 0) {
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 // Only retry on 429 (Too Many Requests) or 5xx server errors
//                 if (response.status === 429 || response.status >= 500) {
//                     throw new Error(`Retryable error: ${response.status}`);
//                 } else {
//                     // Non-retryable error
//                     return { data: null, error: `API Error: ${response.status} ${response.statusText}` };
//                 }
//             }

//             const result = await response.json();
//             const candidate = result.candidates?.[0];

//             if (candidate && candidate.content?.parts?.[0]?.text) {
//                 if (responseSchema) {
//                     try {
//                         // Parse the JSON string from the API response
//                         const parsedJson = JSON.parse(candidate.content.parts[0].text);
//                         return { data: parsedJson, error: null };
//                     } catch (e) {
//                         return { data: null, error: "Failed to parse API JSON response." };
//                     }
//                 } else {
//                     // Handle plain text response
//                     return { data: candidate.content.parts[0].text, error: null };
//                 }
//             } else {
//                  return { data: null, error: "No content received from API." };
//             }

//         } catch (error) {
//             retries--;
//             if (retries === 0) {
//                 return { data: null, error: `Failed to fetch after multiple retries: ${error.message}` };
//             }
//             // Don't log retries to console
//             await new Promise(resolve => setTimeout(resolve, delay));
//             delay *= 2; // Exponential backoff
//         }
//     }
//     return { data: null, error: "Operation failed after all retries." }; // Should be unreachable
// };


// =============================================================================
// NAVIGATION COMPONENT
// =============================================================================
const Navbar = () => {
    'use client'; // This must be the very first line of components/Navbar.jsx
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' }, // Changed
        { name: 'Projects', href: '#projects' },
        { name: 'Blogs', href: '#blogs' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Let\'s Connect', href: '#contact' }, // Changed
    ];

    return (
        <nav className="bg-charcoal/90 backdrop-blur-md text-primary-text fixed w-full z-50 top-0 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left: Name */}
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-2xl font-bold text-teal hover:text-cyan-hover transition-colors duration-300">
                            Rajesh K.
                        </a>
                    </div>

                    {/* Right: Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-primary-text hover:text-cyan-hover px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-charcoal inline-flex items-center justify-center p-2 rounded-md text-teal hover:text-cyan-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal focus:ring-secondary-accent"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? <Menu className="block h-6 w-6" /> : <X className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)} // Close menu on click
                                className="text-primary-text hover:text-cyan-hover block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

// =============================================================================
// HERO SECTION COMPONENT
// =============================================================================
const Hero = () => {
    return (
        <section id="home" className="bg-charcoal text-primary-text min-h-[90vh] flex items-center justify-center pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
                <h1 className="text-5xl md:text-7xl font-extrabold text-primary-text mb-4">
                    Rajesh Kumar
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-teal mb-8 text-glow">
                    Cyber Security Analyst · Researcher
                </h2>
                
                <blockquote className="text-2xl md:text-3xl italic text-subtext mb-12 font-light">
                    "I love logs - because they never lie"
                </blockquote>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://topmate.io/raajeshmenghwar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border-2 border-teal text-teal font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal hover:text-charcoal transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Book 1:1 Session
                    </a>
                    <a
                        href="https://www.fiverr.com/menghwarrajesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border-2 border-teal text-teal font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal hover:text-charcoal transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Request Services
                    </a>
                    <a
                        href="/images/Rajesh_Kumar_Resume.pdf"
                        download
                        className="bg-transparent border-2 border-teal text-teal font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal hover:text-charcoal transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Hire Me (Download Resume)
                    </a>
                </div>
            </div>
        </section>
    );
};

// =============================================================================
// ABOUT ME SECTION COMPONENT
// =============================================================================
const About = () => {
    const credlyBadges = [
        { name: 'ISC2 CC', img: 'https://placehold.co/150x150/EEEEEE/1C1C1E?text=ISC2+CC', url: 'https://www.credly.com/badges/4558c7e0-21ca-4912-9745-c5e4224ad1bc/public_url' }, // Replace with actual URLs
        { name: 'Google Cybersecurity Professional', img: 'https://images.credly.com/size/680x680/images/0bf0f2da-a699-4c82-82e2-56dcf1f2e1c7/image.png', url: 'https://www.credly.com/badges/7e688d53-6b46-4e06-9840-e5da83272bd4/public_url' },
        { name: 'Google IT Support Professional', img: 'https://images.credly.com/size/680x680/images/fb97a12f-c0f1-4f37-9b7d-4a830199fe84/GCC_badge_IT_Support_1000x1000.png', url: 'https://www.credly.com/badges/7a3f8295-a4fb-49af-854a-bbe6dddec316/public_url' },
    ];
    
    return (
        <section id="about" className="bg-charcoal py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
                    About Me
                </h2>
                <div className="w-20 h-1 bg-teal mx-auto mb-16"></div>

                {/* Stats Block (Moved Up) */}
                <div className="flex flex-col sm:flex-row gap-4 text-center max-w-4xl mx-auto mb-16">
                    <div className="bg-charcoal-light p-4 rounded-lg shadow-md flex-1">
                        <span className="text-3xl font-bold text-teal">2+</span>
                        <p className="text-subtext">Years Experience</p>
                    </div>
                    <div className="bg-charcoal-light p-4 rounded-lg shadow-md flex-1">
                        <span className="text-3xl font-bold text-teal">10+</span>
                        <p className="text-subtext">Projects</p>
                    </div>
                    <div className="bg-charcoal-light p-4 rounded-lg shadow-md flex-1">
                        <span className="text-3xl font-bold text-teal">5+</span>
                        <p className="text-subtext">Certifications</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                    {/* Headshot & Stats */}
                    <div className="flex flex-col items-center lg:items-end lg:order-2">
                        <img
                            src="/images/profile-picture.png"
                            alt="Rajesh Kumar Headshot"
                            className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-teal mb-8"
                            onError={(e) => { e.target.src = 'https://placehold.co/300x300/00ADB5/1C1C1E?text=Rajesh+K.'; }}
                        />
                    </div>

                    {/* Bio (Moved to Left) */}
                    <div className="lg:col-span-2 text-center lg:text-left lg:order-1">
                        <p className="text-lg text-subtext leading-relaxed mb-8">
                            A Certified Cybersecurity Analyst with over two years of hands-on experience across Vulnerability Assessment, Penetration Testing, Security Operations, and Digital Forensics. My journey through university societies and global tech communities has shaped not only my technical acumen but also my sense of leadership, collaboration, and continuous learning. Passionate about building secure systems and uncovering digital risks, I strive to bridge the gap between technology and security through practical problem-solving and continuous self-growth.
                        </p>

                        {/* Credly Badges */}
                        <h3 className="text-2xl font-semibold text-primary-text mb-4">Certifications</h3>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            {credlyBadges.map((badge) => (
                                <a 
                                    key={badge.name} 
                                    href={badge.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title={badge.name}
                                    className="transform hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <img 
                                        src={badge.img} 
                                        alt={badge.name} 
                                        className="w-24 h-24 rounded-lg object-cover shadow-lg"
                                        onError={(e) => { e.target.src = `https://placehold.co/150x150/EEEEEE/1C1C1E?text=${badge.name.split(' ').join('+')}`; }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// =============================================================================
// SKILLS SECTION COMPONENT
// =============================================================================
const SkillCard = ({ icon, title, description }) => (
    <div className="bg-charcoal-light p-6 rounded-lg shadow-lg border border-gray-700/50 transform hover:border-teal hover:-translate-y-2 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-teal/10 p-3 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-primary-text">{title}</h3>
        </div>
        <p className="text-subtext">{description}</p>
    </div>
);

const Skills = () => {
    const skillsList = [
        {
            icon: <ShieldCheck className="w-6 h-6 text-teal" />,
            title: 'Vulnerability Assessment & Penetration Testing',
            description: 'Web & Mobile Application Testing, Network Scanning and Exploitation.'
        },
        {
            icon: <Server className="w-6 h-6 text-teal" />,
            title: 'Security Operations & Threat Monitoring',
            description: 'SIEM (ELK Stack, Wazuh, Splunk), Endpoint Detection & Response (EDR), and Threat Detection.'
        },
        {
            icon: <Cloud className="w-6 h-6 text-teal" />,
            title: 'Cloud & Virtualization',
            description: 'Microsoft Azure, AWS, VMware Workstation & ESXi.'
        },
        {
            icon: <Code className="w-6 h-6 text-teal" />,
            title: 'Container Security',
            description: 'Docker & Container Security principles and best practices.'
        },
        {
            icon: <Search className="w-6 h-6 text-teal" />,
            title: 'Digital Forensics & Incident Response (DFIR)',
            description: 'Evidence Collection & Analysis, Log and Artifact Examination.'
        },
        {
            icon: <Briefcase className="w-6 h-6 text-teal" />,
            title: 'Additional Skills',
            description: 'Data Automation (Python/Bash), and Scripting.'
        }
    ];

    return (
        <section id="skills" className="bg-charcoal-dark py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
                    Skills & Expertise
                </h2>
                <div className="w-20 h-1 bg-teal mx-auto mb-16"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsList.map((skill, index) => (
                        <SkillCard
                            key={index}
                            icon={skill.icon}
                            title={skill.title}
                            description={skill.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// =============================================================================
// EXPERIENCE SECTION COMPONENT
// =============================================================================
const Experience = () => {
    const experiences = [
        {
            role: 'Freelance Cybersecurity Consultant',
            company: 'Fiverr',
            level: 'Level 1 Seller',
            duration: 'March 2025 – Present',
            description: 'Currently working with global clients, providing professional cybersecurity services including Digital Forensics, Vulnerability Assessment & Penetration Testing, and SIEM Deployments using tools like Wazuh, Splunk, and ELK Stack.',
            logo: '/images/experiences/fiverr-logo.png'
        },
        {
            role: 'Research Analyst Intern',
            company: 'Server4Sale LLC, Karachi',
            duration: 'April 2024 – Nov 2024',
            description: 'Closely worked with the team on a mobile app project - from preparing detailed SRS documentation to assisting in development and mobile penetration testing to identify and fix vulnerabilities. Also contributed to network scanning, data automation, and development-related tasks.',
            logo: '/images/experiences/server4sale-logo.jpeg'
        }
    ];

    return (
        <section id="experience" className="bg-charcoal py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
                    Experience
                </h2>
                <div className="w-20 h-1 bg-teal mx-auto mb-16"></div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-700/50 hidden md:block"></div>

                    {experiences.map((exp, index) => (
                        <div key={index} className="mb-16 flex md:justify-between items-center w-full">
                            {/* Left/Right arrangement for desktop */}
                            <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3 md:text-right'}`}>
                                {/* Empty div for spacing on desktop */}
                            </div>

                            {/* Center Dot */}
                            <div className="hidden md:block md:w-1/12 md:order-2 z-10">
                                <div className="w-4 h-4 rounded-full bg-teal border-4 border-charcoal mx-auto"></div>
                            </div>
                            
                            {/* Card Content */}
                            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1 md:text-right'}`}>
                                <div className="bg-charcoal-light p-6 rounded-lg shadow-lg border border-gray-700/50 w-full text-left">
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                                        <img 
                                            src={exp.logo} 
                                            alt={`${exp.company} Logo`} 
                                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                                            onError={(e) => { e.target.src = 'https://placehold.co/100x100/EEEEEE/1C1C1E?text=Logo'; }}
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold text-teal">{exp.role}</h3>
                                            <p className="text-lg font-semibold text-primary-text">
                                                {exp.company} {exp.level && `| ${exp.level}`}
                                            </p>
                                            <p className="text-sm text-subtext mt-1">
                                                <Calendar className="w-4 h-4 inline-block mr-1" />
                                                {exp.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-subtext leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// =============================================================================
// EDUCATION SECTION COMPONENT (Renamed)
// =============================================================================
const Education = () => {
    const achievements = [
        "Fellow @ pkSIG (Pakistan School on Internet Governance) Sukkur 2025",
        "Invited Participant: Pakistan’s First Bug Hunting Program (SecurityWall, Lahore)",
        "Ranked in top 20 nationally at Grand Finale Digital Pakistan Cyber Security Hackathon 2024.",
        "Microsoft Student Ambassador | Community Lead @Google Developers Group On Campus MUET KHP."
    ];

    return (
        <section id="education" className="bg-charcoal-dark py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
                    Education & Achievements
                </h2>
                <div className="w-20 h-1 bg-teal mx-auto mb-16"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Column 1: Education */}
                    <div>
                        <h3 className="text-3xl font-bold text-teal mb-6 text-center md:text-left">Education</h3>
                        <div className="bg-charcoal-light p-8 rounded-lg shadow-lg border border-gray-700/50">
                            <h4 className="text-2xl font-bold text-teal">B.E in Software Engineering</h4>
                            <p className="text-lg text-primary-text font-medium mt-2">
                                Mehran University of Engineering & Technology
                            </p>
                            <p className="text-md text-subtext mb-2">
                                Shaheed Zulfiqar Ali Bhutto Campus, Khairpur Mir's
                            </p>
                            <p className="text-lg text-subtext font-light">
                                <Calendar className="w-5 h-5 inline-block mr-2" />
                                2021 – 2025
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Achievements */}
                    <div>
                        <h3 className="text-3xl font-bold text-teal mb-6 text-center md:text-left">Achievements</h3>
                        <div className="space-y-4">
                            {achievements.map((ach, index) => (
                                <div key={index} className="bg-charcoal-light p-4 rounded-lg shadow-md border border-gray-700/50 flex items-center gap-4">
                                    <Award className="w-6 h-6 text-teal flex-shrink-0" />
                                    <p className="text-subtext">{ach}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
// =============================================================================
// PROJECTS SECTION COMPONENT
// =============================================================================

// --- Data for the Projects section ---
const projectData = [
    {
        title: 'PrivacyLens — Final Year Project',
        blurb: 'Built PrivacyLens, a mobile app that extracts & summarizes privacy policies for user data transparency. Automated policy collection from Google Play Store and applied Azure OpenAI models to generate clear, concise summaries.',
        github: 'https://github.com/Shakeelkhuhro/PrivacyLens',
        tools: ["Mobile App", "Privacy Policy", "Privcay Rights"],
        imageUrl: '/images/projects/privacy-lens.png' // Example path
    },
    {
        title: 'Indus System - SOC | Wazuh',
        blurb: 'Deployed Wazuh Manager & agents integrated with Suricata and pfSense for comprehensive network and host monitoring. Configured multi-channel alerting and integrated Microsoft 365 logs with threat intelligence feeds.',
        github: 'https://github.com/raajeshmenghwar/wazuh-soc-siem-solution',
        tools: ["Wazuh", "Office365", "pfSense"],
        imageUrl: '/images/projects/indus-system-wazuh.png' // Example path
    },
    {
        title: 'Threat Detection with ELK, Sysmon, YARA & AlienVault OTX',
        blurb: 'Designed a threat-hunting environment using ELK Stack, Sysmon, and YARA rules to improve endpoint visibility and detect advanced IOC patterns. Implemented dashboards and alert playbooks for proactive detection.',
        github: 'https://github.com/raajeshmenghwar/Threat-Detection-ELK-Sysmon-YARA',
        tools: ["ELK Stack", "Sysmon", "YARA"],
        imageUrl: '/images/projects/threat-detection-elk-sysmon-yara.png' // Example path
    }
];

// --- ProjectModal Component (Fixes from before) ---
const ProjectModal = ({ isModalOpen, project, onClose }) => {
    'use client';
    
    const [currentProject, setCurrentProject] = useState(project);

    useEffect(() => {
        if (project) {
            setCurrentProject(project);
        }
        
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 300);
            return () => clearTimeout(timer);
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [project, isModalOpen]);

    if (!currentProject) {
        return null;
    }

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div 
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-charcoal-light p-8 rounded-lg shadow-lg border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out ${isModalOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
                onClick={handleContentClick}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-3xl font-bold text-teal">{currentProject.title}</h3>
                    <button
                        onClick={onClose}
                        className="text-subtext hover:text-cyan-hover transition-colors duration-200"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
                <div className="space-y-4 mb-8">
                    <p className="text-lg text-subtext leading-relaxed">{currentProject.blurb}</p>
                     <div className="flex flex-wrap gap-2 my-3">
                        <span className="text-primary-text font-semibold">Tools:</span>
                        {currentProject.tools.map((tool) => (
                            <span key={tool} className="bg-teal/20 text-teal px-3 py-1 rounded-full text-xs font-medium">
                            {tool}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal text-charcoal font-bold py-2 px-6 rounded-lg text-lg hover:bg-cyan-hover hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                        <Github className="w-5 h-5" />
                        View Repository
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- Projects Component ---
const Projects = ({ setSelectedProject, setIsModalOpen }) => {
  'use client';
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="bg-charcoal py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
            Home Lab Projects — Learning by Building
        </h2>
        <div className="w-20 h-1 bg-teal mx-auto mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project) => (
            <div key={project.title} className="bg-charcoal-light rounded-lg shadow-lg border border-gray-700/50 overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02] transform hover:-translate-y-2">
              
              <img
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/600x300/00ADB5/1C1C1E?text=Image+Not+Found'; }}
              />
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-primary-text">{project.title}</h3>
                <div className="flex flex-wrap gap-2 my-3">
                  {project.tools.map((tool) => (
                    <span key={tool} className="bg-teal/20 text-teal px-3 py-1 rounded-full text-xs font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="text-subtext text-sm flex-1">{project.blurb}</p>
                <div className="mt-6 flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-teal text-teal font-bold py-2 px-4 rounded-lg text-sm hover:bg-teal hover:text-charcoal transition-all duration-300"
                  >
                    <Github size={18} />
                    View Repo
                  </a>
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 bg-teal text-charcoal font-bold py-2 px-4 rounded-lg text-sm hover:bg-cyan-hover transition-all duration-300"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// BLOGS SECTION COMPONENT (Restored)
// =============================================================================
const BlogCard = ({ title, excerpt, link, imageUrl }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-charcoal-light rounded-lg shadow-lg border border-gray-700/50 overflow-hidden 
                   transform hover:-translate-y-2 transition-all duration-300 group"
    >
        <img 
            src={imageUrl} 
            alt="Blog post thumbnail" 
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.src = 'https://placehold.co/400x200/00ADB5/1C1C1E?text=Blog+Image'; }}
        />
        <div className="p-6">
            <h3 className="text-xl font-bold text-primary-text mb-3 group-hover:text-teal transition-colors duration-300 h-14 overflow-hidden">{title}</h3>
            <p className="text-subtext mb-4 h-28 overflow-hidden">{excerpt}</p>
            <div className="flex items-center text-teal font-semibold group-hover:text-cyan-hover transition-colors duration-300">
                Read More
                <ChevronRight className="w-5 h-5 ml-1" />
            </div>
        </div>
    </a>
);

const BlogList = () => {
    'use client';
    const blogs = [
        {
            title: 'You NEED to Attend PKSIG — Here’s Why',
            excerpt: 'As someone deeply involved in cybersecurity, hackathons, and tech communities, attending PKSIG Sukkur 2025 was a natural step in my journey. But even I didn’t fully expect the depth of knowledge, inspiration, and opportunities I would gain.',
            link: 'https://rajeshmenghwar.medium.com/you-need-to-attend-pksIG-heres-why-25ab6315f2a4',
            imageUrl: '/images/blogs/pksig-sukkur-2025.jpg' // Example path
        },
        {
            title: 'Introduction to Windows Server and Active Directory for Beginners',
            excerpt: 'Imagine you’re working for a small business, “Tech Solutions Inc.,” which is expanding rapidly. Initially, managing a few computers and user accounts was easy, but as the company grows, it becomes increasingly challenging to manage.',
            link: 'https://rajeshmenghwar.medium.com/introduction-to-windows-server-and-active-directory-for-beginners-9da8116f6d72',
            imageUrl: '/images/blogs/introduction-to-windows-server-and-active-directory.png' // Example path
        },
        {
            title: 'The Fellowship That Made Me Fall in Love with Cybersecurity',
            excerpt: 'Back in 2023, I was a third-semester Software Engineering student with no clear path... I wasn’t sure what I wanted, where I was going, or even if I belonged in tech.',
            link: 'https://rajeshmenghwar.medium.com/my-unforgettable-journey-into-cybersecurity-from-novice-to-enthusiast-9e155fde56fa',
            imageUrl: '/images/blogs/bytewise-fellowship.jpg' // Example path
        }
    ];

    return (
        <section id="blogs" className="bg-charcoal-dark py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
                    From My Blog / Medium Articles
                </h2>
                <div className="w-20 h-1 bg-teal mx-auto mb-16"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <BlogCard
                            key={index}
                            title={blog.title}
                            excerpt={blog.excerpt}
                            link={blog.link}
                            imageUrl={blog.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// =============================================================================
// TESTIMONIALS SECTION COMPONENT
// =============================================================================
const TestimonialCard = ({ name, title, quote, avatar }) => (
    <div className="bg-charcoal-light p-6 rounded-lg shadow-lg border border-gray-700/50 h-full flex flex-col">
        <div className="flex items-center mb-4">
            <img 
                src={avatar} 
                alt={name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-teal mr-4"
                onError={(e) => { e.target.src = `https://placehold.co/100x100/EEEEEE/1C1C1E?text=${name.split(' ').map(n => n[0]).join('')}`; }}
            />
            <div>
                <h4 className="text-lg font-bold text-primary-text">{name}</h4>
                <p className="text-sm text-subtext">{title}</p>
            </div>
        </div>
        <blockquote className="text-subtext italic leading-relaxed">
            “{quote}”
        </blockquote>
    </div>
);

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Muhammad Anwar',
            title: 'Research Assistant @ Technische Universität Ilmenau',
            quote: 'I had the pleasure of mentoring Rajesh during his time working under me in the NAVTTC program. He is a quick learner with a strong grasp of web and Android security, data parsing for analysis, and vulnerability assessments. His enthusiasm for cybersecurity is evident in his active participation in hackathons and his adaptability to rapid industry changes. With a leadership mindset and a proactive approach, he is a valuable asset in any security-focused role.',
            avatar: '/images/testimonials/manwar.png'
        },
        {
            name: 'Malik Huzaifa Arif',
            title: 'Corporate InfoSec Trainer | CEH | COMPTIA SEC+',
            quote: 'Rajesh is an excellent student who is highly passionate about his cybersecurity career. I find him to be very intelligent, and I am pleased to see him achieving his goals while remaining focused on his career. I wish him the very best for his future. He is a great collaborator with excellent communication skills. He takes initiative, works diligently, and consistently strives for excellence in every task he undertakes. I am confident that his skills, determination, and passion for cybersecurity will make him a valuable asset to any organization.',
            avatar: '/images/testimonials/mhuazifaarif.png'
        },
        {
            name: 'Mahrukh Anmool',
            title: 'Sr SOC Analyst @ ShieldxSecurity',
            quote: 'I had the privilege of working with Rajesh Kumar, and I’ve always been impressed by his technical depth and calm problem-solving approach. He’s someone who doesn’t just understand cybersecurity he applies it with precision and practicality. Rajesh is dependable, detail-oriented, and always ready to support his team. His ability to adapt quickly and collaborate across functions makes him a real asset in any environment. It’s been great working with someone so dedicated and focused wishing him continued success ahead..',
            avatar: '/images/testimonials/manmool.png'
        }
    ];

    return (
        <section id="testimonials" className="bg-charcoal py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
                    Testimonials
                </h2>
                <div className="w-20 h-1 bg-teal mx-auto mb-16"></div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            name={testimonial.name}
                            title={testimonial.title}
                            quote={testimonial.quote}
                            avatar={testimonial.avatar}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};


// =============================================================================
// LETS CONNECT SECTION COMPONENT
// =============================================================================
const LetsConnect = () => {
    'use client'; 

    const socialLinks = [
        { name: 'Email', href: 'mailto:raajeshmenghwar@gmail.com', iconUrl: '/images/social/mail.png' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raajeshmenghwar/', iconUrl: '/images/social/linkedin.png' },
        { name: 'GitHub', href: 'https://github.com/raajeshmenghwar', iconUrl: '/images/social/github.png' },
        { name: 'Medium', href: 'https://rajeshmenghwar.medium.com/', iconUrl: '/images/social/medium.png' },
        { name: 'Twitter', href: 'https://twitter.com/raajeshmenghwar', iconUrl: '/images/social/twitter.png' },
        { name: 'YouTube', href: 'https://www.youtube.com/@raajeshmenghwaar', iconUrl: '/images/social/youtube.png' },
        { name: 'Facebook', href: 'https://www.facebook.com/raajeshmenghwaar', iconUrl: '/images/social/facebook.png' },
        { name: 'Instagram', href: 'https://www.instagram.com/raajeshmenghwar/', iconUrl: '/images/social/instagram.png' },
    ];
    
    return (
        <section id="contact" className="bg-charcoal-dark py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
                    Let's Connect
                </h2>
                <p className="text-2xl text-center text-subtext mb-12">
                    Explore My World
                </p>
                <div className="w-full h-px bg-gray-700/50 mx-auto mb-16"></div>
                
                <div className="flex flex-wrap justify-center gap-6">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.name}
                            className="text-subtext hover:text-teal hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                        >
                            <span className="sr-only">{social.name}</span>
                            <img 
                                src={social.iconUrl} 
                                alt={`${social.name} logo`} 
                                className="w-20 h-20 object-contain"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

// const LetsConnect = () => {
//     'use client'; 

//     const socialLinks = [
//         { name: 'Email', href: 'mailto:raajeshmenghwar@gmail.com', iconUrl: '/images/social/mail.png' },
//         { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raajeshmenghwar/', iconUrl: '/images/social/linkedin.png' },
//         { name: 'GitHub', href: 'https://github.com/raajeshmenghwar', iconUrl: '/images/social/github.png' },
//         { name: 'Medium', href: 'https://rajeshmenghwar.medium.com/', iconUrl: '/images/social/medium.png' },
//         { name: 'Twitter', href: 'https://twitter.com/raajeshmenghwar', iconUrl: '/images/social/twitter.png' },
//         { name: 'YouTube', href: 'https://www.youtube.com/@rajeshmenghwaar', iconUrl: '/images/social/youtube.png' },
//         { name: 'Facebook', href: 'https://www.facebook.com/raajeshmenghwaar', iconUrl: '/images/social/facebook.png' },
//         { name: 'Instagram', href: 'https://www.instagram.com/raajeshmenghwar/', iconUrl: '/images/social/instagram.png' },
        
//     ];
    
//     return (
//         <section id="contact" className="bg-charcoal-dark py-24">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-4xl font-bold text-center text-primary-text mb-4">
//                     Let's Connect
//                 </h2>
//                 <p className="text-2xl text-center text-subtext mb-12">
//                     Explore My World
//                 </p>
//                 <div className="w-full h-px bg-gray-700/50 mx-auto mb-16"></div>
                
//                 <div className="flex flex-wrap justify-center gap-6">
//                     {socialLinks.map((social) => (
//                         <a
//                             key={social.name}
//                             href={social.href}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             title={social.name}
//                             className="bg-charcoal-light p-4 rounded-full text-subtext hover:text-teal hover:shadow-lg transform hover:scale-110 transition-all duration-300"
//                         >
//                             <span className="sr-only">{social.name}</span>
//                             <img 
//                                 src={social.iconUrl} 
//                                 alt={`${social.name} logo`} 
//                                 className="w-12 h-12 object-contain" 
//                                 // You can add an invert class if your icons are black
//                                 // className="w-12 h-12 object-contain invert" 
//                                 onError={(e) => { e.target.style.display = 'none'; }} // Hide if image breaks
//                             />
//                         </a>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };


// =============================================================================
// FOOTER COMPONENT
// =============================================================================
const Footer = () => {
    return (
        <footer className="bg-charcoal border-t border-gray-700/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-subtext">
                <p className="text-sm">
                    © {new Date().getFullYear()} Rajesh K. — Cyber Security Analyst | All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

// =============================================================================
// BACK TO TOP BUTTON COMPONENT
// =============================================================================
const BackToTopButton = () => {
    'use client'; // This must be the very first line of components/BackToTopButton.jsx

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 bg-teal text-charcoal p-3 rounded-full shadow-lg transition-all duration-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            } hover:bg-cyan-hover transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-hover`}
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-6 h-6" />
        </button>
    );
};

// =============================================================================
// MAIN APP COMPONENT
// =============================================================================
export default function App() {
    'use client'; // This must be the very first line of app/page.js

    // --- State for Project Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    
    // This is the main component.
    // In a real Next.js app, this logic would be part of `pages/index.js`
    // and you would add SEO/Head content using `next/head`.
    
    // Add global styles. In Next.js, this would be in `styles/globals.css`
    // We add them here via a <style> tag for this single-file demo.
    const GlobalStyles = () => (
        <style jsx global>{`
            body {
                background-color: #1C1C1E; /* charcoal */
                color: #F5F5F5; /* primary-text */
                font-family: 'Inter', sans-serif; /* Example font */
            }
            /* Style the scrollbar */
            ::-webkit-scrollbar {
                width: 10px;
            }
            ::-webkit-scrollbar-track {
                background: #1C1C1E; /* charcoal */
            }
            ::-webkit-scrollbar-thumb {
                background: #00ADB5; /* teal */
                border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #00FFF5; /* cyan-hover */
            }
            ::selection {
                background-color: #00ADB5;
                color: #1C1C1E;
            }
            /* Smooth scrolling */
            html {
                scroll-behavior: smooth;
            }
            /* Custom background colors for alternating sections */
            .bg-charcoal {
                background-color: #1C1C1E;
            }
            .bg-charcoal-dark {
                background-color: #18181a; /* A slightly darker charcoal */
            }
            .bg-charcoal-light {
                background-color: #2a2a2c; /* A slightly lighter charcoal */
            }
            
            /* Added animation for fade-in */
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 1s ease-out forwards;
            }

            /* Added animation for text glow */
            @keyframes textGlow {
                0%, 100% { text-shadow: 0 0 10px rgba(0, 173, 181, 0.3); }
                50% { text-shadow: 0 0 20px rgba(0, 173, 181, 0.7); }
            }
            .text-glow {
                animation: textGlow 3s ease-in-out infinite;
            }

            /* Added animation for loader */
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin {
                animation: spin 1s linear infinite;
            }
        `}</style>
    );

    return (
        <>
            <GlobalStyles />
            <div className="relative">
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Experience />
                    <Education /> {/* Changed */}
                    <Projects 
                        setIsModalOpen={setIsModalOpen} 
                        setSelectedProject={setSelectedProject} 
                    />
                    <BlogList />
                    <Testimonials />
                    <LetsConnect /> {/* Changed */}
                </main>
                <Footer />
                <BackToTopButton />
                
                {/* --- Render Project Modal --- */}
                <ProjectModal 
                    isModalOpen={isModalOpen}
                    project={selectedProject} 
                    onClose={() => {
                        setIsModalOpen(false);
                        // We delay clearing the project to allow the fade-out animation
                        setTimeout(() => setSelectedProject(null), 300); 
                    }}
                />
            </div>
        </>
    );
}