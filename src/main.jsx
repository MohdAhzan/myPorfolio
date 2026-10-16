import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MapPin,
  Copy, Check, Menu, X, Code2, Database, Cloud, Layers3, Terminal,
  ExternalLink, Sparkles, Workflow, Server, Globe2, Sun, Moon
} from 'lucide-react';
import './styles.css';
import apiInventory from './data/api-inventory.json';

const projects = [
  {
    id: 'uniclub', number: '01', type: 'Backend', title: 'UNICLUB Ecommerce REST API',
    subtitle: 'Clean Architecture',
    description: 'A modular commerce backend built around clean boundaries, secure authentication, and faster product reads.',
    stack: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    details: ['Clean Architecture', 'JWT + OTP authentication', 'Redis product caching', 'Dockerized deployment'],
    link: 'https://github.com/MohdAhzan/Uniclub_ecommerce_Cleanarchitecture_Project',
    extraLink: 'https://github.com/MohdAhzan/Uniclub_Microservice',
    accent: 'lime', visual: 'api'
  },
  {
    id: 'stream', number: '02', type: 'Backend', title: 'StreamVideoGRPC',
    subtitle: 'Video streaming service',
    description: 'A microservice-oriented streaming experiment using gRPC, Protocol Buffers, and bidirectional streams.',
    stack: ['Go', 'gRPC', 'Protobuf', 'Docker', 'Kubernetes'],
    details: ['Bidirectional gRPC streaming', 'Efficient serialization', 'Service-oriented design', 'Kubernetes scalability'],
    link: 'https://github.com/MohdAhzan/StreamVideoGRPC',
    accent: 'blue', visual: 'stream'
  },
  {
    id: 'uniclub-microservices', number: '03', type: 'Backend', title: 'UNICLUB Ecommerce Microservices',
    subtitle: 'Distributed commerce services',
    description: 'A service-oriented evolution of the UNICLUB commerce platform, separating backend capabilities into independently organized services.',
    stack: ['Go', 'Microservices', 'Docker', 'AWS'],
    details: ['Service-oriented architecture', 'Independent service boundaries', 'Containerized deployment'],
    link: 'https://github.com/MohdAhzan/Uniclub_Microservice', accent: 'lime', visual: 'stream'
  },
  {
    id: 'reaicare', number: '04', type: 'Freelance', title: 'Riayah Care', image: '/images/riayah-care.png',
    subtitle: 'Medical tourism platform',
    description: 'A multilingual medical tourism website experience designed to help international patients explore care options and enquire with confidence.',
    stack: ['Next.js', 'React', 'Supabase', 'AI-assisted content', 'i18n'],
    details: ['Multilingual website content', 'Patient inquiry experience', 'Hospital and specialty content', 'AI-assisted translation workflow'],
    link: 'https://riayahcare.com', accent: 'pink', visual: 'care'
  },
  {
    id: 'crm', number: '05', type: 'Freelance', title: 'Patient CRM',
    subtitle: 'Lead & inquiry management',
    description: 'A private freelance patient CRM. Further details are available on request.',
    stack: ['Next.js', 'React', 'Supabase', 'JavaScript'],
    details: ['Freelance project', 'Private project details', 'Available on request'],
    link: '', accent: 'orange', visual: 'crm'
  },
  {
    id: 'simple-crud', number: '06', type: 'Backend', title: 'Simple CRUD',
    subtitle: 'Web application',
    description: 'A compact CRUD application demonstrating the fundamentals of creating, reading, updating, and deleting application data.',
    stack: ['Go', 'Web', 'CRUD'],
    details: ['Create and manage records', 'Core CRUD workflow', 'Small, focused application'],
    link: 'https://github.com/MohdAhzan/Simple-CRUD-Web-Application',
    accent: 'blue', visual: 'api'
  },
  {
    id: 'catering', number: '07', type: 'Freelance', title: 'Catering App',
    subtitle: 'Event and expense management',
    description: 'A private freelance catering app project that is still in development. More details are available on request.',
    stack: ['React Native', 'Expo', 'Go'],
    details: ['Private freelance work', 'Still in development', 'Details available on request'],
    link: 'https://github.com/MohdAhzan/catering-app',
    accent: 'orange', visual: 'crm'
  },
  {
    id: 'tesla-static', number: '08', type: 'Frontend', title: 'Tesla',
    subtitle: 'Static website recreation',
    description: 'A static website project inspired by Tesla’s product-focused visual presentation.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    details: ['Responsive page layout', 'Product-led visual design', 'Frontend fundamentals'],
    link: 'https://github.com/MohdAhzan/Tesla-Static-website',
    accent: 'pink', visual: 'care'
  },
  {
    id: 'portfolio', number: '09', type: 'Frontend', title: 'Portfolio Website',
    subtitle: 'Personal portfolio',
    description: 'A portfolio website project showcasing web development work and presentation skills.',
    stack: ['React', 'JavaScript', 'CSS'],
    details: ['Personal project showcase', 'Responsive interface', 'Custom styling'],
    link: 'https://github.com/MohdAhzan/Portfolio',
    accent: 'lime', visual: 'stream'
  },
  {
    id: 'amazon-static', number: '10', type: 'Frontend', title: 'Amazon',
    subtitle: 'Static website recreation',
    description: 'A static website project inspired by Amazon’s e-commerce interface, included as a frontend practice project.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    details: ['E-commerce layout practice', 'Product-focused interface', 'Frontend fundamentals'],
    link: 'https://github.com/MohdAhzan/Amazon-Static-website',
    accent: 'orange', visual: 'api'
  }
];

const skills = [
  { icon: Code2, title: 'Backend engineering', tags: ['Go', 'Gin', 'REST APIs', 'gRPC', 'Microservices', 'Clean Architecture'] },
  { icon: Database, title: 'Data & performance', tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'GORM', 'Redis', 'Schema design'] },
  { icon: Cloud, title: 'Cloud & delivery', tags: ['AWS EC2', 'S3', 'Lambda', 'Docker', 'Kubernetes', 'CI/CD'] },
  { icon: Layers3, title: 'Quality & workflow', tags: ['Unit testing', 'Integration testing', 'GoMock', 'Testify', 'Git', 'DSA'] },
];

function ProjectVisual({ project }) {
  if (project.image) return <img className="project-real-image" src={project.image} alt={project.title + ' project preview'} loading="lazy" />;
  if (project.visual === 'api') return <div className="visual-api"><div className="api-top"><span className="window-dots">● ● ●</span><span>BACKEND / ARCHITECTURE</span><span className="status">GO</span></div><div className="api-row"><b>HTTP</b><span>Delivery layer</span><i>REST</i></div><div className="api-row"><b>CORE</b><span>Application services</span><i>USE CASES</i></div><div className="api-row"><b>DATA</b><span>Persistence & cache</span><i>ADAPTERS</i></div><div className="api-footer"><span>architecture</span><strong>Clean</strong><span>inventory</span><strong>Pending</strong></div></div>;
  if (project.visual === 'stream') return <div className="visual-stream"><div className="stream-node"><Server size={20}/><span>gRPC server</span></div><div className="stream-lines"><i/><i/><i/><i/><i/></div><div className="stream-node client"><Terminal size={20}/><span>stream client</span></div><div className="stream-caption">PROTOBUF · BIDIRECTIONAL STREAM</div></div>;
  if (project.visual === 'care') return <div className="visual-care"><div className="care-sun">✳</div><span className="care-kicker">CARE WITHOUT BORDERS</span><div className="care-headline">Your health.<br/><em>Our guidance.</em></div><div className="care-pills"><span>Hospitals</span><span>Specialties</span><span>Patient support</span></div><div className="care-bottom">RIAYAH CARE <span>↗</span></div></div>;
  return <div className="visual-crm"><div className="crm-sidebar"><div className="crm-mark">R</div><span/><span/><span/><span/></div><div className="crm-main"><div className="crm-heading">Patient overview <small>Today ↗</small></div><div className="crm-stats"><div><small>New inquiries</small><b>24</b><i>+12%</i></div><div><small>In progress</small><b>18</b><i>Active</i></div></div><div className="crm-list"><span/><span/><span/></div></div></div>;
}

function App() {
  const [filter, setFilter] = useState('All work');
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') || 'dark'; } catch { return 'dark'; }
  });
  const visibleProjects = projects.filter(p => filter === 'All work' || p.type === filter);
  const email = 'gsirkahzanpkm@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#10110f' : '#f7f8f4');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* storage may be unavailable */ }
  }, [theme]);

  return <div className="site-shell">
    <div className="grain" aria-hidden="true"/>
    <header className="nav-wrap">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark profile-mark"><img src="/images/profile.jpg" alt="Ahzan K N" /></span><span>AHZAN K N</span></a>
      <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#work" onClick={closeMenu}>Work <span>↘</span></a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#skills" onClick={closeMenu}>Toolkit</a>
        <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'light'} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}<span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button>
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"/> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line"/></div>
          <h1>I build the<br/>stuff <span className="serif">behind</span><br/>the screen<span className="period">.</span></h1>
          <p className="hero-desc">I'm <strong>Muhammad Ahzan K N</strong> — a Go backend developer who loves building reliable APIs, scalable services, and thoughtful digital products.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href="#about">A little about me <ArrowUpRight size={16}/></a></div>
          <div className="hero-meta"><span><MapPin size={14}/> Kochi, Kerala, India</span><span className="meta-divider"/><span>Backend first. Product minded.</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract backend architecture illustration">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="art-grid"/>
          <div className="code-window">
            <div className="code-title"><span className="window-dots">● ● ●</span><span>main.go</span><span className="code-live">● running</span></div>
            <pre><span className="syntax-purple">func</span> <span className="syntax-yellow">Build</span>() <span className="syntax-blue">System</span> {'{'}{'\n'}  <span className="syntax-muted">// make it reliable</span>{'\n'}  api := <span className="syntax-green">NewAPI</span>(){'\n'}  db  := <span className="syntax-green">Connect</span>(){'\n'}  cache := <span className="syntax-green">Redis</span>(){'\n'}{'\n'}  <span className="syntax-purple">return</span> api.{'\n'}    <span className="syntax-yellow">WithDB</span>(db).{'\n'}    <span className="syntax-yellow">WithCache</span>(cache){'\n'}{'}'}</pre>
            <div className="code-bottom"><span><i/> tests passing</span><span>go build ./...</span></div>
          </div>
          <div className="floating-chip chip-go"><span>Go</span><b>backend</b></div>
          <div className="floating-chip chip-cloud"><Cloud size={17}/><b>cloud-ready</b></div>
          <div className="art-index">FIG. 01 / SYSTEMS IN MOTION</div>
        </div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><div/></div>
      </section>

      <section className="ticker" aria-label="Areas of focus"><div className="ticker-track">{Array.from({length:2},(_,i)=><React.Fragment key={i}><span>GO BACKEND</span><b>✳</b><span>MICROSERVICES</span><b>✳</b><span>API DESIGN</span><b>✳</b><span>FREELANCE BUILDS</span><b>✳</b><span>DATABASES</span><b>✳</b></React.Fragment>)}</div></section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading"><div><span className="section-index">01 / SELECTED WORK</span><h2>Things I've <span className="serif">built.</span></h2></div><p>A mix of backend engineering and freelance product work — each one solving a different kind of problem.</p></div>
        <div className="filter-row" role="group" aria-label="Filter projects">{['All work','Backend','Freelance','Frontend'].map(item=><button key={item} className={filter===item?'filter active':'filter'} onClick={()=>setFilter(item)}>{item}<span>{String(item==='All work' ? projects.length : projects.filter(p=>p.type===item).length).padStart(2,'0')}</span></button>)}</div>
        <div className="project-grid">{visibleProjects.map((project, index)=><article className={`project-card ${project.accent}`} key={project.id} style={{'--delay':`${index*80}ms`}}>
          <div className="project-visual"><ProjectVisual project={project}/><span className="project-number">{project.number}</span></div>
          <div className="project-info"><div className="project-type">{project.type} <span>↗</span></div><h3>{project.title}</h3><h4>{project.subtitle}</h4><p>{project.description}</p>
            <div className="project-details">{project.details.map(detail=><span key={detail}><i/> {detail}</span>)}</div>
            <div className="tag-row">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
            {project.link ? <div className="project-links"><a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.id === 'reaicare' ? 'Visit live website' : 'View on GitHub'} <ArrowUpRight size={15}/></a>{project.extraLink && <a className="project-link secondary-project-link" href={project.extraLink} target="_blank" rel="noreferrer">Microservices repo <ArrowUpRight size={15}/></a>}</div> : <span className="project-link project-note">Freelance project · details on request <Sparkles size={14}/></span>}
          </div>
        </article>)}</div>
        <div className="api-showcase">
          <div className="api-showcase-head">
            <span className="section-index">BACKEND PROJECTS / API EXPLORER</span>
            <h3>API explorer <span className="serif">coming soon.</span></h3>
            <p>This section will list verified HTTP routes and gRPC methods from my Go repositories after I finish scanning them. No API routes have been added yet.</p>
          </div>
          <div className="endpoint-demo endpoint-placeholder" aria-label="Reserved endpoint inventory">
            <div className="endpoint-demo-top"><span><Globe2 size={13}/> API ROUTE INVENTORY</span><span className="demo-label">COMING SOON</span></div>
            {apiInventory.projects.map((project, index) => <div className="endpoint-placeholder-item" key={project.id}><strong>{String(index + 1).padStart(2, '0')}</strong><div><b>{project.name}</b><small>{project.architecture ? `${project.architecture} · ` : ''}{project.id === 'streamvideogrpc' ? 'gRPC services · RPC methods · streaming types' : 'Verified HTTP routes grouped by service'}</small></div></div>)}
            <p className="endpoint-footnote">Routes will be added here after the repository scan is complete. Nothing listed here should be treated as a live API endpoint yet.</p>
          </div>
        </div>
        <p className="work-footnote"><span className="tiny-star">✳</span> Some freelance work is private. Ask me about the process, decisions, and what I learned building it.</p>
      </section>

      <section className="about-section" id="about"><div className="section-wrap about-layout">
        <div className="about-left"><span className="section-index">02 / THE PERSON BEHIND THE CODE</span><h2>Curious by nature.<br/><span className="serif">Engineer</span> by choice.</h2><div className="about-stamp"><Code2 size={25}/><span>THINK DEEP.<br/>BUILD SIMPLE.</span></div></div>
        <div className="about-right"><p className="about-lead">I care about what happens <em>under the hood</em> — clean architecture, predictable systems, and the small decisions that make software easier to maintain.</p><p>My core focus is Go backend development: REST and gRPC APIs, microservices, databases, caching, and deployment. Freelance work has also taken me into the frontend, where I've used React and Next.js to help bring a medical tourism platform and its internal CRM to life.</p><p>I like learning by building, getting the details right, and keeping the user and the system in mind at the same time.</p>
          <div className="timeline"><div className="timeline-item"><span className="timeline-dot"/><div><span className="timeline-date">JUL 2023 — FEB 2024</span><h3>Golang Developer Intern</h3><p>Brototype · Kochi</p><small>Backend APIs, microservices, database design, performance, Docker & Kubernetes.</small></div></div><div className="timeline-item"><span className="timeline-dot"/><div><span className="timeline-date">2020 — 2023</span><h3>Bachelor of Computer Applications</h3><p>MES T O Abdulla Memorial College · Kunnukara, Aluva</p></div></div></div>
        </div>
      </div></section>

      <section className="skills-section section-wrap" id="skills">
        <div className="section-heading"><div><span className="section-index">03 / MY TOOLKIT</span><h2>Tools of the <span className="serif">trade.</span></h2></div><p>The stack I reach for to build, test, ship, and keep systems running.</p></div>
        <div className="toolkit-logos" aria-label="Technology toolkit">
          {[
            ['Go','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'],
            ['Gin','https://raw.githubusercontent.com/gin-gonic/logo/master/color.png'],
            ['PostgreSQL','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'],
            ['Redis','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'],
            ['Docker','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'],
            ['Kubernetes','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'],
            ['AWS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'],
            ['gRPC','https://grpc.io/img/logos/grpc-logo.png'],
            ['JavaScript','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'],
            ['React','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'],
            ['Next.js','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'],
            ['Supabase','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg'],
            ['Git','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'],
            ['Linux','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg']
          ].map(([name,src]) => <div className="tool-logo" key={name} tabIndex="0"><img src={src} alt="" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';}}/><span>{name}</span></div>)}
        </div><div className="skills-grid">{skills.map((group,i)=><div className="skill-card" key={group.title}><div className="skill-top"><span className="skill-icon"><group.icon size={20}/></span><span className="skill-num">0{i+1}</span></div><h3>{group.title}</h3><div className="skill-tags">{group.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>)}</div>
        <div className="learning-strip"><div className="learning-icon"><Workflow size={21}/></div><div><strong>Always learning, always shipping.</strong><p>From algorithmic problem-solving to distributed systems, I enjoy getting better through practical work.</p></div><span className="learning-spark">✳</span></div>
      </section>

      <section className="contact-section" id="contact"><div className="contact-orb orb-a"/><div className="contact-orb orb-b"/><div className="section-wrap contact-inner"><span className="section-index">04 / YOUR TURN</span><h2>Have a good<br/>problem? <span className="serif">Let's build.</span></h2><p>Open to Go backend opportunities, interesting engineering challenges, and thoughtful freelance projects.</p><div className="contact-actions"><a className="button button-light" href={`mailto:${email}`}>Send me an email <ArrowUpRight size={17}/></a><button className="button button-outline" onClick={copyEmail}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Email copied':'Copy email'}</button></div><div className="social-links"><a href="https://github.com/MohdAhzan" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/muhammad-ahzan-k-n-907235270/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a><a href={`mailto:${email}`}><Mail size={16}/> Email <ArrowUpRight size={13}/></a></div></div></section>
    </main>
    <footer className="footer section-wrap"><a className="brand" href="#home"><span className="brand-mark profile-mark"><img src="/images/profile.jpg" alt="Ahzan K N" /></span><span>AHZAN K N</span></a><span>Designed with curiosity. Built with intent.</span><a href="#home" className="back-top">BACK TO TOP ↑</a><span className="copyright">© {new Date().getFullYear()} AHZAN K N</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
