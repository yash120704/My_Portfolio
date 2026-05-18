export const siteMeta = {
  name: 'Yash Kashyap',
  monogram: 'YK',
  title: 'Full-Stack Developer & AI/ML Engineer',
  email: 'yashkashyap1204@gmail.com',
  phone: '+91 81320 35635',
  resume: '/Yash_Kashyap_Resume.pdf',
  introName: 'Yash Kashyap',
  loading: 'Loading section',
  menuOpen: 'Open navigation menu',
  menuClose: 'Close navigation menu',
  hireMe: 'Hire Me',
}

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/yash120704',
    display: 'github.com/yash120704',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yashkashyap12',
    display: 'linkedin.com/in/yashkashyap12',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:yashkashyap1204@gmail.com',
    display: 'yashkashyap1204@gmail.com',
    icon: 'mail',
  },
]

export const hero = {
  eyebrow: "Hello, I'm",
  name: 'Yash Kashyap',
  roles: ['Full-Stack Developer', 'AI/ML Engineer', 'Problem Solver', 'Tech Innovator'],
  bio: 'B.Tech CSE @ VIT Vellore · CGPA 9.52',
  primaryCta: { label: 'View My Work', target: 'projects' },
  secondaryCta: { label: 'Download Resume', href: 'https://drive.google.com/file/d/1RdC2OgI4chos_7tfefPQxFjq8Qc8Tizl/view?usp=drive_link' },
  scrollLabel: 'Scroll to explore',
}

export const about = {
  kicker: 'Profile',
  title: 'About Me',
  badge: 'Open to Opportunities',
  imageAlt: 'Profile placeholder for Yash Kashyap',
  initials: 'YK',
  body:
    "I'm a Computer Science undergraduate at VIT Vellore, passionate about building intelligent, scalable web systems and AI-powered tools. From real-time anomaly detection engines to full-stack platforms serving 200+ users, I bring both engineering rigor and design sensibility to everything I build. I've interned at NIT Rourkela and constantly push my work toward patent-worthy innovation in cybersecurity and AI.",
  stats: [
    { value: 9.52, suffix: ' CGPA', label: 'Academic performance', decimals: 2 },
    { value: 4, suffix: '+ Projects Built', label: 'Production-grade builds', decimals: 0 },
    { value: 3, suffix: ' Certifications from Top Orgs', label: 'Credential depth', decimals: 0 },
  ],
  education: [
    {
      institution: 'VIT Vellore',
      detail: 'B.Tech CSE',
      period: '2023–2027',
      score: 'CGPA: 9.52/10',
    },
    {
      institution: 'KV Janakpuri, Delhi',
      detail: 'Class 12',
      period: '2022',
      score: '93.6%',
    },
    {
      institution: 'KV Panisagar, Tripura',
      detail: 'Class 10',
      period: '2020',
      score: '93.8%',
    },
  ],
}

export const experience = {
  kicker: 'Experience',
  title: 'Applied Engineering',
  company: 'NIT Rourkela',
  role: 'Web Development Intern',
  period: 'Summer 2025',
  tags: ['UI/UX', 'Backend', 'React', 'Node.js'],
  bullets: [
    'Built 3 React/Node.js frontend modules for a research lab portal, integrating REST APIs for seamless client-backend data flow.',
    'Improved UI responsiveness across 10+ pages, reducing inconsistencies by ~20% and aligning with WCAG usability standards.',
  ],
}

export const projects = {
  kicker: 'Selected Work',
  title: 'Projects',
  items: [
    {
      title: 'Hybrid Leak Detection System',
      tech: ['Python', 'Scikit-learn', 'Django', 'Streamlit'],
      description:
        '10-model ensemble (4 Autoencoders, OC-SVM, Mahalanobis) for diesel engine leak detection on 40K samples. 5-stage real-time pipeline: Kalman -> Autoencoder -> Mahalanobis -> SVM -> L2 Fusion, with WebSocket streaming and Streamlit dashboard.',
      tag: 'AI/ML · Anomaly Detection',
      icon: 'brain',
      github: 'https://github.com/KV225511/DieselEngineLeakDetection.git',
      demo: '#contact',
      featured: true,
    },
    {
      title: 'Traffic Density Prediction System',
      tech: ['React', 'Django REST', 'PostgreSQL'],
      description:
        'Random Forest classifier with 81.5% accuracy, 0.97 F1-score. Parallel TomTom/Open-Meteo API calls via asyncio.gather. 3-tier platform with 7 endpoints, token auth, forecasting across 62 Delhi locations.',
      tag: 'Full-Stack · ML · GeoData',
      icon: 'map',
      github: 'https://github.com/KV225511/TrafficCongestionPredictor.git',
      demo: 'https://traffic-congestion-predictor.vercel.app/',
      featured: false,
    },
    {
      title: 'Product Feature Extraction',
      tech: ['FLAN-T5', 'Streamlit', 'Python'],
      description:
        'Zero-shot NLP pipeline using FLAN-T5-base (248M params), 7-step extraction workflow on 512-token customer reviews. Streamlit UI with CSV upload, real-time progress, and cached model loading.',
      tag: 'NLP · GenAI',
      icon: 'text',
      github: 'https://github.com/yash120704/Product_Feature_Extractor.git',
      demo: 'https://yashappuctfeatureextractor-ryrvzdub3aq6nvvcrjswps.streamlit.app/?utm_source=chatgpt.com',
      featured: false,
    },
    {
      title: 'Escape.exe',
      tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase'],
      description:
        'Full-stack platform for 200+ users. 3-level RBAC with Supabase Auth restricting sign-ups to @vit.ac.in. Relational PostgreSQL schema for users, teams, and membership with status-tracking queries.',
      tag: 'Full-Stack · Auth · RBAC',
      icon: 'team',
      github: 'https://github.com/yash120704/Team_Management_Website.git',
      demo: 'https://team-management-website.vercel.app/',
      featured: true,
    },
  ],
  overlayLabels: {
    viewMore: 'View More',
    github: 'GitHub',
    demo: 'Live Demo',
  },
}

export const skills = {
  kicker: 'Capabilities',
  title: 'Skills',
  tabs: [
    {
      id: 'languages',
      label: 'Languages',
      items: ['Java', 'Python', 'C/C++', 'SQL', 'JavaScript'],
    },
    {
      id: 'web',
      label: 'Web & Backend',
      items: ['React.js', 'Node.js', 'Express.js', 'Django REST Framework', 'FastAPI', 'HTML5', 'CSS3'],
    },
    {
      id: 'ai',
      label: 'AI/ML',
      items: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Supervised & Unsupervised Learning', 'NLP'],
    },
    {
      id: 'databases',
      label: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'Supabase'],
    },
    {
      id: 'tools',
      label: 'Tools',
      items: ['Git', 'Streamlit', 'WebSockets', 'Django Channels'],
    },
  ],
  core: [
    { label: 'Python', value: 90 },
    { label: 'JavaScript', value: 85 },
    { label: 'React.js', value: 88 },
    { label: 'ML/AI', value: 82 },
    { label: 'PostgreSQL', value: 80 },
    { label: 'Django', value: 85 },
  ],
}

export const certifications = {
  kicker: 'Credentials',
  title: 'Certifications & Activities',
  cta: 'View Certificate',
  items: [
    {
      name: 'Geodata Processing using Python & ML',
      issuer: 'ISRO',
      badge: 'IS',
      href: 'https://drive.google.com/file/d/1i47pPsetVJZ4L7ESfxRfonE9uPNCS4ip/view',
    },
    {
      name: 'Generative AI using IBM Watsonx',
      issuer: 'IBM',
      badge: 'IB',
      href: 'https://drive.google.com/file/d/1Ak1PpCnhisd20Fyo-UM-YW1XUXkqVUUh/view',
    },
    {
      name: 'Oracle Cloud Generative AI Professional',
      issuer: 'Oracle',
      badge: 'OC',
      href: 'https://drive.google.com/file/d/1zuBkxXxjNIWxc3YTBprFapFCNsrBo_Oz/view',
    },
    {
      name: 'Web Development + UI/UX',
      issuer: 'NIT Rourkela',
      badge: 'NR',
      href: 'https://drive.google.com/file/d/1YEwHKALNL-VTuv1Pot8mt5oNyLP8Bp1U/view',
    },
    {
      name: 'Full Stack Web Development Bootcamp',
      issuer: 'Udemy',
      badge: 'UD',
      href: 'https://drive.google.com/file/d/1QM3jTG9TbRG02WxKilF9nXkriV-SGKb_/view',
    },
  ],
  activity: {
    title: 'Technical Head, SCRS',
    detail: 'VIT Vellore',
    badge: 'Leadership',
  },
}

export const contact = {
  kicker: 'Contact',
  title: "Let's Build Something Together",
  subtext: 'Open to internships, collaborations, and interesting problems.',
  details: [
    { label: 'Email', value: 'yashkashyap1204@gmail.com', href: 'mailto:yashkashyap1204@gmail.com', icon: 'mail' },
    { label: 'Phone', value: '+91 81320 35635', href: 'tel:+918132035635', icon: 'phone' },
    { label: 'LinkedIn', value: 'linkedin.com/in/yashkashyap12', href: 'https://linkedin.com/in/yashkashyap12', icon: 'linkedin' },
    { label: 'GitHub', value: 'github.com/yash120704', href: 'https://github.com/yash120704', icon: 'github' },
  ],
  form: {
    name: { label: 'Name', placeholder: 'Your name', error: 'Please enter your name.' },
    email: { label: 'Email', placeholder: 'you@example.com', error: 'Please enter a valid email.' },
    subject: { label: 'Subject', placeholder: 'What are we building?', error: 'Please add a subject.' },
    message: { label: 'Message', placeholder: 'Tell me about the opportunity or idea...', error: 'Please write a short message.' },
    submit: 'Send Message',
    sending: 'Sending',
    success: "Message sent! I'll get back to you soon 🚀",
    failure: 'Email service is not configured yet. Your message is ready in your mail app.',
  },
}

export const footer = {
  built: 'Built with React · Designed with intention · © 2025 Yash Kashyap',
  backToTop: 'Back to top',
}
