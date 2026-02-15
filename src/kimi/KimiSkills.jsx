import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Cloud, 
  Wrench, 
  Database, 
  GitBranch, 
  Layers, 
  Terminal,
  Cpu,
  Globe,
  Shield,
  Workflow
} from 'lucide-react';

// Simple utility function to merge tailwind classes (replaces cn)
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// --- Data ---

const skillsData = [
  // Frontend
  { name: 'React', icon: Code2, color: '#61DAFB', category: 'Frontend' },
  { name: 'TypeScript', icon: Layers, color: '#3178C6', category: 'Frontend' },
  { name: 'Next.js', icon: Globe, color: '#ffffff', category: 'Frontend' },
  { name: 'Tailwind', icon: Workflow, color: '#38BDF8', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', icon: Server, color: '#339933', category: 'Backend' },
  { name: 'PostgreSQL', icon: Database, color: '#336791', category: 'Backend' },
  { name: 'GraphQL', icon: Workflow, color: '#E10098', category: 'Backend' },
  { name: 'Python', icon: Terminal, color: '#3776AB', category: 'Backend' },

  // Cloud & DevOps
  { name: 'AWS', icon: Cloud, color: '#FF9900', category: 'Cloud' },
  { name: 'Docker', icon: Cpu, color: '#2496ED', category: 'Cloud' },
  { name: 'Kubernetes', icon: Shield, color: '#326CE5', category: 'Cloud' },
  { name: 'CI/CD', icon: GitBranch, color: '#ffffff', category: 'Cloud' },

  // Tools
  { name: 'Git', icon: GitBranch, color: '#F05032', category: 'Tools' },
  { name: 'Figma', icon: Layers, color: '#F24E1E', category: 'Tools' },
  { name: 'Linux', icon: Terminal, color: '#FCC624', category: 'Tools' },
  { name: 'Vim', icon: Code2, color: '#019733', category: 'Tools' },
];

// --- Components ---

const TiltCard = ({ children, className, glowColor }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative h-full w-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden group transition-colors duration-500",
        className
      )}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${glowColor}15, transparent 40%)`
        }}
      />
      
      {/* Border Glow */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${glowColor}30`
        }}
      />

      <div className="relative h-full w-full p-6 flex flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <TiltCard glowColor={skill.color}>
        <div className="flex items-start justify-between mb-4">
          <div 
            className="p-3 rounded-xl bg-white/5 border border-white/5"
            style={{ color: skill.color }}
          >
            <Icon size={24} />
          </div>
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {skill.category}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-white transition-colors">
            {skill.name}
          </h3>
          <div className="h-1 w-12 rounded-full bg-white/10 overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 + (index * 0.05) }}
            />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const CategoryHeader = ({ title, icon: Icon, color }) => (
  <div className="flex items-center gap-3 mb-6 px-2">
    <div className="p-2 rounded-lg bg-white/5 border border-white/10" style={{ color }}>
      <Icon size={20} />
    </div>
    <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
  </div>
);

export default function SkillsPage() {
  // Mouse tracking for background mesh gradient
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const frontendSkills = skillsData.filter(s => s.category === 'Frontend');
  const backendSkills = skillsData.filter(s => s.category === 'Backend');
  const cloudSkills = skillsData.filter(s => s.category === 'Cloud');
  const toolsSkills = skillsData.filter(s => s.category === 'Tools');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-white/20 overflow-x-hidden">
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15), transparent 25%),
              radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15), transparent 35%),
              radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.15), transparent 35%)
            `
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Available for hire</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Expertise</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical stack, built with modern best practices and a focus on scalable, performant applications.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Frontend Section - Spans 2 cols */}
          <div className="lg:col-span-2 lg:row-span-2 flex flex-col">
            <CategoryHeader title="Frontend Engineering" icon={Code2} color="#61DAFB" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {frontendSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
              {/* Featured Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="sm:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 p-8 flex flex-col justify-center items-start"
              >
                <div className="absolute top-0 right-0 p-32 bg-blue-500/20 blur-[100px] rounded-full" />
                <h3 className="text-3xl font-bold text-white mb-2 relative z-10">UI/UX Focus</h3>
                <p className="text-slate-400 relative z-10 max-w-md">
                  Specializing in creating intuitive, accessible, and visually stunning user interfaces that drive engagement.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Backend Section */}
          <div className="lg:col-span-2 flex flex-col">
            <CategoryHeader title="Backend Architecture" icon={Server} color="#339933" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {backendSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx + 10} />
              ))}
            </div>
          </div>

          {/* Cloud Section */}
          <div className="lg:col-span-1 flex flex-col">
            <CategoryHeader title="Cloud & DevOps" icon={Cloud} color="#FF9900" />
            <div className="grid grid-cols-1 gap-4">
              {cloudSkills.slice(0, 2).map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx + 20} />
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="lg:col-span-1 flex flex-col">
            <CategoryHeader title="Tooling" icon={Wrench} color="#F24E1E" />
            <div className="grid grid-cols-1 gap-4">
              {toolsSkills.slice(0, 2).map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx + 30} />
              ))}
            </div>
          </div>

           {/* Remaining Cloud Skills */}
           <div className="lg:col-span-2 flex flex-col justify-end">
             <div className="grid grid-cols-2 gap-4">
                {cloudSkills.slice(2).map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} index={idx + 40} />
                ))}
                {toolsSkills.slice(2).map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} index={idx + 50} />
                ))}
             </div>
          </div>

        </div>

        {/* Footer / CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Let's build something amazing together.</h3>
            <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors">
              Get in Touch
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}