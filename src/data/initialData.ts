import {
  Profile,
  Project,
  Certification,
  Experience,
  Education,
  Skill,
  Organization,
  Interest,
  SiteSettings,
  GalleryItem
} from '@/types';

export const initialProfile: Profile = {
  name: 'Srinivasarao Chalamala',
  headline: 'BUILDING SECURE DIGITAL EXPERIENCES',
  subheadline: 'Full-Stack Web Developer × Cybersecurity Enthusiast',
  shortBio:
    'Full-Stack Web Developer with a keen interest in Cybersecurity. Specialized in architecting performant, resilient web applications while hardening systems against emerging network and application vulnerabilities.',
  bio: `I am a Computer Science & Engineering undergraduate specializing in Cyber Security at KIET, combining deep full-stack engineering skills with a rigorous defensive security mindset. 

Over the past three years, I have built production web applications using modern JavaScript, Flask, and Firebase, configured enterprise firewalls with Fortinet, conducted vulnerability scanning, and coordinated technical workshops. I believe the future of software engineering lies in security-first architecture—where performance and defense go hand in hand.`,
  email: 'chalamalasrinu2003@gmail.com',
  phone: '9390011378',
  location: 'Eluru, Andhra Pradesh, India',
  linkedin: 'https://linkedin.com/in/ch-srinu',
  github: 'https://github.com/Srinu-01',
  whatsapp: '919390011378',
  resumeUrl: '/certificates/srinu-resume.pdf',
  avatarUrl: '/profile/srinu-profile.png',
  statusBadge: 'AVAILABLE FOR TECHNICAL ROLES & SECURITY CONSULTING',
  yearsOfExperience: '3+ Years Academic & Practical Experience',
  securitySpecialization: 'Network Defense, Vulnerability Analysis & Web Security'
};

export const initialProjects: Project[] = [
  {
    id: 'proj-manaclg',
    slug: 'manaclg-jntuk-study-hub',
    title: 'ManaClg – Your JNTUK Study Hub',
    subtitle: 'Comprehensive academic resource portal serving university students across disciplines',
    description:
      'A full-stack educational platform built specifically for JNTUK students, delivering syllabus-aligned lecture notes, previous-year question papers, curated video playlists, and academic resource distribution.',
    longDescription:
      'ManaClg was engineered to solve the fragmentation of academic resources for university engineering students. As a Full-Stack Developer and contributor, I designed responsive web interfaces, integrated Firebase Firestore for real-time document delivery and query filtering, and configured Cloudinary for distributed media and PDF distribution.',
    category: 'Full-Stack',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'Firestore', 'Cloudinary'],
    githubUrl: 'https://github.com/Srinu-01',
    liveUrl: 'https://github.com/Srinu-01',
    featuredImage: '/projects/manaclg-banner.svg',
    gallery: ['/projects/manaclg-banner.svg'],
    status: 'Production',
    role: 'Full-Stack Developer / Contributor',
    challenges:
      'Structuring thousands of university files across different branches, regulations (R16, R19, R20), and semesters without incurring sluggish database read overhead.',
    solutions:
      'Implemented clean Firestore hierarchical schemas and client caching with Cloudinary asset CDN distribution.',
    results:
      'Centralized academic access for hundreds of college peers with instantaneous search and zero server maintenance cost.',
    features: [
      'Branch and semester-wise curated lecture notes',
      'Previous year question paper archives',
      'Curated video lecture playlists',
      'High-speed Cloudinary PDF and document delivery',
      'Real-time Firestore search and filtering'
    ],
    featured: true,
    sortOrder: 1,
    createdAt: '2024-01-15'
  },
  {
    id: 'proj-secure-hospital-network',
    slug: 'wireless-secure-hospital-network',
    title: 'Wireless Secure Hospital Network',
    subtitle: 'Enterprise-grade clinical network architecture with DMZ isolation & security hardening',
    description:
      'Designed and simulated a fault-tolerant, segregated wireless hospital network infrastructure featuring Demilitarized Zone (DMZ) isolation, patient data access controls, and network traffic filtering.',
    longDescription:
      'Developed during a competitive network security hackathon and internship. The architecture segments critical healthcare operations (ICU/OT, administrative systems, patient records, public Wi-Fi) across isolated VLANs and DMZ gateways to defend sensitive medical instrumentation against lateral threat movement.',
    category: 'Networking',
    technologies: ['Cisco Packet Tracer', 'DMZ Architecture', 'OSI Model', 'Firewall ACLs', 'VLAN Segmentation', 'Network Troubleshooting'],
    githubUrl: 'https://github.com/Srinu-01',
    liveUrl: 'https://github.com/Srinu-01',
    featuredImage: '/projects/hospital-network-banner.svg',
    gallery: ['/projects/hospital-network-banner.svg'],
    status: 'Completed',
    role: 'Network Design & Security Architect',
    challenges:
      'Ensuring public patient Wi-Fi could never route into the Electronic Health Records (EHR) database while maintaining low-latency connectivity for medical telemetry.',
    solutions:
      'Engineered multi-layer firewall ACLs, isolated DMZ perimeter, and strict 802.1Q trunking with encrypted access gateways.',
    results:
      'Achieved full compliance with simulated healthcare cybersecurity benchmarks and isolated attack vector simulations.',
    features: [
      'Multi-tier VLAN segregation (Medical Devices, Staff, Guests)',
      'Perimeter DMZ hosting isolated public hospital portals',
      'Access Control Lists (ACLs) preventing unauthorized lateral traversal',
      'Redundant default gateway routing with rapid failover',
      'Comprehensive IP addressing plan and security policy documentation'
    ],
    featured: true,
    sortOrder: 2,
    createdAt: '2024-06-10'
  },
  {
    id: 'proj-sketch-maker',
    slug: 'sketch-maker-flask',
    title: 'Sketch Maker – Computational Art Web App',
    subtitle: 'Computer vision web application for automated artistic sketch generation',
    description:
      'Interactive web application engineered with Python and Flask that transforms photographic imagery into stylized pencil sketches using algorithmic image processing pipelines.',
    longDescription:
      'Developed during the Summer Internship at IIIT Hyderabad. Users upload high-resolution photographs which are processed via Python backend routines and rendered into detailed graphite sketches with adjustable intensity and contrast filters.',
    category: 'Full-Stack',
    technologies: ['Python', 'Flask', 'HTML5', 'CSS3', 'Image Processing', 'JavaScript'],
    githubUrl: 'https://github.com/Srinu-01',
    liveUrl: 'https://github.com/Srinu-01',
    featuredImage: '/projects/sketch-maker-banner.svg',
    gallery: ['/projects/sketch-maker-banner.svg'],
    status: 'Completed',
    role: 'Summer Intern (Developer)',
    challenges:
      'Handling memory-efficient image processing on web server threads without crashing the Flask microservice.',
    solutions:
      'Streamlined algorithmic pixel matrices and integrated responsive client-side preview canvases.',
    results:
      'Successfully presented to research mentors at IIIT Hyderabad with positive functional and architectural evaluations.',
    features: [
      'Instant drag-and-drop image upload',
      'Algorithmic pencil sketch filtration engine',
      'Customizable threshold, shade, and edge intensity controls',
      'Downloadable high-resolution art exports'
    ],
    featured: true,
    sortOrder: 3,
    createdAt: '2022-06-25'
  }
];

export const initialCertifications: Certification[] = [
  {
    id: 'cert-fortinet-fca',
    title: 'Fortinet Certified Associate in Cybersecurity',
    issuer: 'Fortinet Training Institute',
    issueDate: 'November 27, 2024',
    expiryDate: 'November 27, 2026',
    credentialId: '2529624852SC',
    credentialUrl: 'https://training.fortinet.com/admin/tool/certificate/index.php',
    certificateImage: '/certificates/fortinet-certified-associate.png',
    description:
      'Demonstrates validated core competency in cybersecurity principles, enterprise threat landscape mitigation, and Fortinet Security Fabric architecture.',
    skills: ['Cybersecurity', 'Network Security', 'Threat Analysis', 'Fortinet Security Fabric', 'Access Control'],
    category: 'Cybersecurity',
    featured: true,
    sortOrder: 1
  },
  {
    id: 'cert-fortinet-fcf',
    title: 'Fortinet Certified Fundamentals in Cybersecurity',
    issuer: 'Fortinet Training Institute',
    issueDate: 'November 27, 2024',
    expiryDate: 'November 27, 2026',
    credentialId: '9938452344SC',
    credentialUrl: 'https://training.fortinet.com/admin/tool/certificate/index.php',
    certificateImage: '/certificates/fortinet-certified-fundamentals.png',
    description:
      'Certified understanding of fundamental cyber threat dynamics, modern attack vectors, cryptographic baselines, and defense-in-depth principles.',
    skills: ['Information Assurance', 'Threat Intelligence', 'Cryptography Basics', 'Defensive Computing'],
    category: 'Cybersecurity',
    featured: true,
    sortOrder: 2
  },
  {
    id: 'cert-eduskills-nsa',
    title: 'Network Security Associate Virtual Internship',
    issuer: 'EduSkills Foundation & AICTE (Supported by Fortinet)',
    issueDate: 'Oct - Dec 2024',
    expiryDate: 'Lifetime',
    credentialId: '12a7226611dbfd0fb67d3291b32d9c0c',
    credentialUrl: '',
    certificateImage: '/certificates/network-security-associate-eduskills.png',
    description:
      'Completed a rigorous 10-week intensive virtual internship covering Fortinet network security protocols, firewall policy engineering, threat management, and vulnerability assessment.',
    skills: ['Firewall Configuration', 'Threat Management', 'Footprinting', 'Network Scanning', 'Vulnerability Analysis'],
    category: 'Network Security',
    featured: true,
    sortOrder: 3
  },
  {
    id: 'cert-google-cybersecurity',
    title: 'Foundations of Cybersecurity',
    issuer: 'Google (Offered through Coursera)',
    issueDate: 'April 9, 2024',
    expiryDate: 'Lifetime',
    credentialId: 'V7K2LM77HN77',
    credentialUrl: 'https://coursera.org/verify/V7K2LM77HN77',
    certificateImage: '/certificates/google-foundations-of-cybersecurity.png',
    description:
      'Authorized course by Google covering foundational information security frameworks, threat intelligence, security models (CIA Triad), and ethical computing practices.',
    skills: ['CIA Triad', 'Security Operations', 'SIEM Concepts', 'Incident Response Baselines'],
    category: 'Cybersecurity',
    featured: true,
    sortOrder: 4
  },
  {
    id: 'cert-salesforce-developer',
    title: 'Salesforce Developer Virtual Internship',
    issuer: 'SmartBridge / SmartInternz in partnership with AICTE & Salesforce',
    issueDate: 'November 9, 2023',
    expiryDate: 'Lifetime',
    credentialId: 'SISFVIPAD2023-68671',
    credentialUrl: 'https://smartinternz.com/internships/salesforce_certificates/a6ece4bc5effc9dcec04c9e6d87f09b8',
    certificateImage: '/certificates/salesforce-developer-smartinternz.png',
    description:
      'Completed 8-week virtual internship (April-May 2023) covering Apex, Lightning Web Components (LWC), Flow Automation, CLI, and Developer Super Set.',
    skills: ['Apex', 'Lightning Web Components (LWC)', 'Process Automation', 'Security Flows', 'Testing & Debugging'],
    category: 'Software Engineering',
    featured: true,
    sortOrder: 5
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-dream-team',
    title: 'Full-stack web Developer',
    company: 'DREAM TEAM',
    location: 'Remote / India',
    type: 'Self-employed',
    startDate: 'Jan 2024',
    endDate: 'Present',
    current: true,
    description:
      'Building dynamic, responsive full-stack web applications with modern web technologies, database integration, and performance optimization.',
    responsibilities: [
      'Architecting and delivering responsive, component-driven client applications',
      'Integrating Firebase Firestore backend services for real-time document workflows',
      'Configuring Cloudinary media pipelines for high-performance CDN asset delivery',
      'Hardening client-side applications against security vulnerabilities (XSS, CSRF, malformed inputs)'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Firebase', 'Cloudinary'],
    active: true,
    sortOrder: 1
  },
  {
    id: 'exp-kiet-it-support',
    title: 'IT Management Support',
    company: 'KIET College',
    location: 'Kakinada, Andhra Pradesh',
    type: 'Internship',
    startDate: 'August 2024',
    endDate: 'February 2025',
    current: false,
    description:
      'Managed campus network infrastructure, performed routine vulnerability assessments, maintained workstations, and ensured operational uptime.',
    responsibilities: [
      'Supervised campus-wide internet access control and bandwidth provisioning',
      'Conducted regular vulnerability assessments across lab workstations and network appliances',
      'Deployed critical OS security patches and software configuration updates',
      'Configured and maintained switches, routers, and peripheral network hardware',
      'Diagnosed and resolved critical hardware, software, and connectivity issues for faculty and students'
    ],
    technologies: ['Network Troubleshooting', 'Vulnerability Assessment', 'Windows Administration', 'Linux', 'Router/Switch Config'],
    active: true,
    sortOrder: 2
  },
  {
    id: 'exp-eduskills-fortinet',
    title: 'CyberSecurity Intern (Fortinet)',
    company: 'Eduskills Foundation (AICTE)',
    location: 'Virtual / Remote',
    type: 'Internship',
    startDate: 'August 2024',
    endDate: 'December 2024',
    current: false,
    description:
      'Completed Fortinet Network Security Internship program focused on firewall configuration, enterprise threat management, and offensive reconnaissance defense.',
    responsibilities: [
      'Configured Fortinet enterprise firewall policies, NAT rules, and security profiles',
      'Managed threat mitigation policies and monitored network event logs for anomalous activity',
      'Executed ethical hacking tasks including target footprinting, port scanning, and vulnerability discovery',
      'Utilized Metasploit and Nmap in controlled lab topologies to identify misconfigurations'
    ],
    technologies: ['Fortinet Firewalls', 'Nmap', 'Metasploit', 'Network Scanning', 'Vulnerability Analysis', 'Threat Management'],
    active: true,
    sortOrder: 3
  },
  {
    id: 'exp-cyber-crew',
    title: 'Cyber Crew Member',
    company: 'CYBER CREW',
    location: 'Kakinada, Andhra Pradesh',
    type: 'Apprenticeship',
    startDate: 'August 2023',
    endDate: 'April 2025',
    current: false,
    description:
      'Collaborative security apprenticeship focused on practical system administration, cloud security baselines, and applied network defense.',
    responsibilities: [
      'Participated in hands-on system administration and server security hardening tasks',
      'Explored cloud security configurations and identity access management',
      'Collaborated on ethical hacking challenge environments and internal security briefs'
    ],
    technologies: ['System Administration', 'Cloud Security', 'Network Security', 'Linux Hardening'],
    active: true,
    sortOrder: 4
  },
  {
    id: 'exp-iiit-hyderabad',
    title: 'Summer Intern',
    company: 'IIIT Hyderabad',
    location: 'Hyderabad, Telangana, India',
    type: 'Internship',
    startDate: 'May 2022',
    endDate: 'June 2022',
    current: false,
    description:
      'Immersive web development and software engineering internship under the mentorship of IIIT Hyderabad academic faculty.',
    responsibilities: [
      'Mastered fundamentals of full-stack web engineering using HTML, CSS, and Python Flask',
      'Designed and engineered "Sketch Maker" web application for algorithmic image transformation',
      'Collaborated directly with faculty mentors on user interface enhancements and execution efficiency'
    ],
    technologies: ['Python', 'Flask', 'HTML5', 'CSS3', 'Image Processing'],
    active: true,
    sortOrder: 5
  }
];

export const initialEducation: Education[] = [
  {
    id: 'edu-kiet-btech',
    institution: 'Kakinada Institute of Engineering and Technology (KIET)',
    degree: 'B.Tech – Computer Science and Engineering',
    fieldOfStudy: 'Specialization: Cyber Security',
    boardOrUniversity: 'Jawaharlal Nehru Technological University, Kakinada (JNTUK)',
    score: '8.2',
    scoreType: 'GPA',
    startYear: '2021',
    endYear: 'Present',
    current: true,
    details:
      'Rigorous curriculum spanning Operating Systems, Data Structures & Algorithms, Network Security, Cryptography, Database Management Systems, and Ethical Hacking.',
    sortOrder: 1
  },
  {
    id: 'edu-sri-chaitanya-inter',
    institution: 'Sri Chaitanya Junior College',
    degree: 'Intermediate (10+2)',
    fieldOfStudy: 'MPC (Mathematics, Physics, Chemistry)',
    boardOrUniversity: 'Board of Intermediate Education, Andhra Pradesh',
    score: '917 / 1000',
    scoreType: 'Marks',
    startYear: '2019',
    endYear: '2021',
    current: false,
    details: 'Graduated with 91.7% distinction in physical and mathematical sciences.',
    sortOrder: 2
  },
  {
    id: 'edu-chaitanya-school',
    institution: 'Chaitanya EM High School',
    degree: 'Secondary School Certificate (SSC / 10th)',
    fieldOfStudy: 'General Academics',
    boardOrUniversity: 'Board of Secondary Education, Andhra Pradesh (AP SSC)',
    score: '9.7',
    scoreType: 'GPA',
    startYear: '2018',
    endYear: '2019',
    current: false,
    details: 'Achieved outstanding academic standing of 9.7 GPA across state board examinations.',
    sortOrder: 3
  }
];

export const initialSkills: Skill[] = [
  // Programming
  { id: 's-js', name: 'JavaScript', category: 'Programming', proficiencyLabel: 'Advanced', featured: true, sortOrder: 1 },
  { id: 's-py', name: 'Python', category: 'Programming', proficiencyLabel: 'Proficient', featured: true, sortOrder: 2 },
  { id: 's-java', name: 'Java', category: 'Programming', proficiencyLabel: 'Core', featured: true, sortOrder: 3 },
  { id: 's-html', name: 'HTML5', category: 'Programming', proficiencyLabel: 'Expert', featured: true, sortOrder: 4 },
  { id: 's-css', name: 'CSS3', category: 'Programming', proficiencyLabel: 'Expert', featured: true, sortOrder: 5 },

  // Web
  { id: 's-react', name: 'React.js', category: 'Web Development', proficiencyLabel: 'Proficient', featured: true, sortOrder: 6 },
  { id: 's-flask', name: 'Flask (Python)', category: 'Web Development', proficiencyLabel: 'Proficient', featured: true, sortOrder: 7 },
  { id: 's-rest', name: 'RESTful APIs', category: 'Web Development', proficiencyLabel: 'Proficient', featured: true, sortOrder: 8 },

  // Database & Cloud
  { id: 's-firebase', name: 'Firebase', category: 'Database & Cloud', proficiencyLabel: 'Proficient', featured: true, sortOrder: 9 },
  { id: 's-firestore', name: 'Cloud Firestore', category: 'Database & Cloud', proficiencyLabel: 'Proficient', featured: true, sortOrder: 10 },
  { id: 's-cloudinary', name: 'Cloudinary CDN', category: 'Database & Cloud', proficiencyLabel: 'Proficient', featured: true, sortOrder: 11 },

  // Tools & Platforms
  { id: 's-git', name: 'Git', category: 'Tools & Platforms', proficiencyLabel: 'Proficient', featured: true, sortOrder: 12 },
  { id: 's-github', name: 'GitHub', category: 'Tools & Platforms', proficiencyLabel: 'Proficient', featured: true, sortOrder: 13 },
  { id: 's-vscode', name: 'Visual Studio Code', category: 'Tools & Platforms', proficiencyLabel: 'Daily Driver', featured: true, sortOrder: 14 },
  { id: 's-vercel', name: 'Vercel', category: 'Tools & Platforms', proficiencyLabel: 'Proficient', featured: true, sortOrder: 15 },
  { id: 's-netlify', name: 'Netlify', category: 'Tools & Platforms', proficiencyLabel: 'Proficient', featured: true, sortOrder: 16 },

  // Cybersecurity & Networks
  { id: 's-netsec', name: 'Network Security', category: 'Cybersecurity & Networks', proficiencyLabel: 'Certified', featured: true, sortOrder: 17 },
  { id: 's-cyber', name: 'Cybersecurity Principles', category: 'Cybersecurity & Networks', proficiencyLabel: 'Specialized', featured: true, sortOrder: 18 },
  { id: 's-eth-hack', name: 'Ethical Hacking', category: 'Cybersecurity & Networks', proficiencyLabel: 'Practiced', featured: true, sortOrder: 19 },
  { id: 's-firewall', name: 'Firewall Configuration', category: 'Cybersecurity & Networks', proficiencyLabel: 'Fortinet Trained', featured: true, sortOrder: 20 },
  { id: 's-vuln-scan', name: 'Vulnerability Analysis', category: 'Cybersecurity & Networks', proficiencyLabel: 'Practiced', featured: true, sortOrder: 21 },
  { id: 's-nmap', name: 'Nmap & Network Scanning', category: 'Cybersecurity & Networks', proficiencyLabel: 'Practiced', featured: true, sortOrder: 22 },
  { id: 's-metasploit', name: 'Metasploit Framework', category: 'Cybersecurity & Networks', proficiencyLabel: 'Lab Tested', featured: true, sortOrder: 23 },
  { id: 's-cisco', name: 'Cisco Packet Tracer', category: 'Cybersecurity & Networks', proficiencyLabel: 'Proficient', featured: true, sortOrder: 24 },

  // Operating Systems
  { id: 's-linux', name: 'Linux (Ubuntu/Debian)', category: 'Operating Systems', proficiencyLabel: 'System Familiar', featured: true, sortOrder: 25 },
  { id: 's-windows', name: 'Windows Administration', category: 'Operating Systems', proficiencyLabel: 'Support Admin', featured: true, sortOrder: 26 },

  // Soft Skills
  { id: 's-teamwork', name: 'Cross-functional Teamwork', category: 'Soft Skills', proficiencyLabel: 'Demonstrated', featured: false, sortOrder: 27 },
  { id: 's-comm', name: 'Technical Communication', category: 'Soft Skills', proficiencyLabel: 'Demonstrated', featured: false, sortOrder: 28 },
  { id: 's-ps', name: 'Problem Solving', category: 'Soft Skills', proficiencyLabel: 'Analytical', featured: false, sortOrder: 29 },
  { id: 's-time', name: 'Time Management', category: 'Soft Skills', proficiencyLabel: 'Demonstrated', featured: false, sortOrder: 30 },
  { id: 's-lead', name: 'Workshop Leadership', category: 'Soft Skills', proficiencyLabel: 'Proven', featured: false, sortOrder: 31 },

  // Prompt Engineering
  { id: 's-llm', name: 'LLM Interaction & Prompt Engineering', category: 'Prompt Engineering', proficiencyLabel: 'Skilled', featured: true, sortOrder: 32 }
];

export const initialOrganizations: Organization[] = [
  {
    id: 'org-manaclg-levelup',
    name: 'ManaClg LevelUp',
    role: 'Workshop Coordinator',
    period: '2023 – 2024',
    description:
      'Coordinated practical front-end engineering workshops for university engineering cohorts, guiding participants from fundamentals to functional projects.',
    responsibilities: [
      'Organized and led front-end development bootcamp modules in HTML, CSS, JavaScript, and React.js',
      'Mentored 100+ junior student peers through code reviews and debugging sessions',
      'Designed hands-on mini-project curriculums to bridge academic theory with industry practices'
    ],
    sortOrder: 1
  },
  {
    id: 'org-kiet-rnd',
    name: 'KIET R&D Innovation Club',
    role: 'Core Member',
    period: '2022 – Present',
    description:
      'Active contributor to collegiate research initiatives, prototyping interdisciplinary technologies across web systems, IoT, and cybersecurity.',
    responsibilities: [
      'Conducted peer training sessions covering web security best practices and modern development stacks',
      'Collaborated on prototype systems combining embedded devices (IoT) with cloud monitoring web dashboards',
      'Supported student research paper drafting and technical project documentation'
    ],
    sortOrder: 2
  },
  {
    id: 'org-cyber-crew',
    name: 'Cyber Crew',
    role: 'Member',
    period: '2023 – 2025',
    description:
      'Student cybersecurity collective dedicated to exploring penetration testing techniques, security defense exercises, and threat intelligence analysis.',
    responsibilities: [
      'Participated in periodic internal capture-the-flag (CTF) security drills',
      'Shared tactical findings on system administration, credential hygiene, and network defense'
    ],
    sortOrder: 3
  }
];

export const initialInterests: Interest[] = [
  {
    id: 'int-cont-learning',
    title: 'Continuous Learning',
    description: 'Devouring documentation, engineering RFCs, and cybersecurity disclosure bulletins to stay ahead of attack vectors.',
    icon: 'BookOpen',
    category: 'Growth',
    sortOrder: 1
  },
  {
    id: 'int-ai-tech',
    title: 'AI & Emerging Technologies',
    description: 'Exploring LLM workflows, autonomous coding agents, and AI-assisted defense architectures.',
    icon: 'Cpu',
    category: 'Technology',
    sortOrder: 2
  },
  {
    id: 'int-hackathons',
    title: 'Hackathons & Technical Builds',
    description: 'Thriving in time-constrained collaborative engineering environments to turn novel ideas into working code.',
    icon: 'Trophy',
    category: 'Engineering',
    sortOrder: 3
  },
  {
    id: 'int-communities',
    title: 'Technology Communities',
    description: 'Contributing to student clubs, mentoring aspiring developers, and participating in tech meetups.',
    icon: 'Users',
    category: 'Community',
    sortOrder: 4
  },
  {
    id: 'int-anime',
    title: 'Anime & Narrative Art',
    description: 'Appreciating complex storytelling, strategic world-building, and high-framerate visual animation.',
    icon: 'Sparkles',
    category: 'Culture',
    sortOrder: 5
  },
  {
    id: 'int-gaming',
    title: 'Tactical & Strategy Gaming',
    description: 'Sharpening split-second decision-making, spatial awareness, and resource optimization through competitive gaming.',
    icon: 'Gamepad2',
    category: 'Recreation',
    sortOrder: 6
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-fortinet-fca',
    title: 'Fortinet Certified Associate in Cybersecurity',
    caption: 'Official certification awarded on November 27, 2024 by Fortinet Training Institute.',
    mediaUrl: '/certificates/fortinet-certified-associate.png',
    resourceType: 'image',
    category: 'Certifications',
    tags: ['Cybersecurity', 'Fortinet', 'Certified'],
    featured: true,
    sortOrder: 1
  },
  {
    id: 'gal-fortinet-fcf',
    title: 'Fortinet Certified Fundamentals in Cybersecurity',
    caption: 'Validation of foundational cyber defense principles and architecture.',
    mediaUrl: '/certificates/fortinet-certified-fundamentals.png',
    resourceType: 'image',
    category: 'Certifications',
    tags: ['Fortinet', 'Fundamentals', 'Security'],
    featured: true,
    sortOrder: 2
  },
  {
    id: 'gal-eduskills',
    title: 'Network Security Associate Virtual Internship',
    caption: '10-week intensive program completed with EduSkills Foundation, AICTE & Fortinet.',
    mediaUrl: '/certificates/network-security-associate-eduskills.png',
    resourceType: 'image',
    category: 'Certifications',
    tags: ['AICTE', 'EduSkills', 'Internship'],
    featured: true,
    sortOrder: 3
  },
  {
    id: 'gal-google',
    title: 'Google Foundations of Cybersecurity',
    caption: 'Google Career Certificate credential issued via Coursera.',
    mediaUrl: '/certificates/google-foundations-of-cybersecurity.png',
    resourceType: 'image',
    category: 'Certifications',
    tags: ['Google', 'Coursera', 'Security'],
    featured: true,
    sortOrder: 4
  },
  {
    id: 'gal-salesforce',
    title: 'Salesforce Developer Virtual Internship',
    caption: 'Virtual developer internship credential issued by SmartBridge & SmartInternz.',
    mediaUrl: '/certificates/salesforce-developer-smartinternz.png',
    resourceType: 'image',
    category: 'Certifications',
    tags: ['Salesforce', 'Apex', 'LWC'],
    featured: true,
    sortOrder: 5
  }
];

export const initialSiteSettings: SiteSettings = {
  siteTitle: 'Srinivasarao Chalamala | Full-Stack Developer & Cybersecurity Specialist',
  metaDescription:
    'Official portfolio of Srinivasarao Chalamala — Full-Stack Web Developer with a specialization in Cyber Security. Discover production web apps, network architectures, and verified Fortinet certifications.',
  whatsappNumber: '919390011378',
  whatsappPrefillMessage: "Hi Srinivasarao, I visited your portfolio and would love to discuss a project or opportunity with you!",
  maintenanceMode: false,
  sectionsVisibility: {
    hero: true,
    about: true,
    skills: true,
    experience: true,
    education: true,
    projects: true,
    certifications: true,
    organizations: true,
    interests: true,
    gallery: true,
    resume: true,
    contact: true
  },
  themePreference: 'dark'
};
