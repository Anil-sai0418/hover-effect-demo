import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Layers, Zap, Code2, Box, Cpu, Link } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner tailwind classes
function cn(...inputs) {
    return twMerge(clsx(inputs));
}



// --- Mock Data ---

const PROJECTS = [
    {
        id: 1,
        title: "Neon Horizon",
        category: "Fintech Dashboard",
        description: "A next-generation trading interface featuring real-time WebGL data visualization and AI-driven market predictions.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        tags: ["React", "Three.js", "WebSockets", "Tailwind"],
        link: "#",
        icon: <Zap className="w-6 h-6" />,
    },
    {
        id: 2,
        title: "Aether Stream",
        category: "Social Platform",
        description: "Decentralized content sharing platform with end-to-end encryption and a focus on creator monetization.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        tags: ["Next.js", "Solidity", "IPFS", "Node.js"],
        link: "#",
        icon: <Layers className="w-6 h-6" />,
    },
    {
        id: 3,
        title: "Quantum Core",
        category: "AI Infrastructure",
        description: "High-performance computing dashboard for managing distributed machine learning training clusters.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
        tags: ["Python", "Kubernetes", "React", "GraphQL"],
        link: "#",
        icon: <Cpu className="w-6 h-6" />,
    },
    {
        id: 4,
        title: "Velvet UI",
        category: "Design System",
        description: "An accessible, highly customizable component library used by over 50,000 developers worldwide.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=2670&auto=format&fit=crop",
        tags: ["TypeScript", "Storybook", "Radix UI", "Vite"],
        link: "#",
        icon: <Box className="w-6 h-6" />,
    },
    {
        id: 5,
        title: "Cyber Nexus",
        category: "Security Suite",
        description: "Enterprise-grade threat detection system utilizing behavioral analysis and automated response protocols.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
        tags: ["Go", "Rust", "PostgreSQL", "Redis"],
        link: "#",
        icon: <Code2 className="w-6 h-6" />,
    },
    {
        id: 6,
        title: "Ethereal Flow",
        category: "Creative Tool",
        description: "Browser-based 3D modeling tool for architects and game designers with real-time collaboration.",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
        tags: ["WebAssembly", "C++", "WebGL", "Firebase"],
        link: "#",
        icon: <ExternalLink className="w-6 h-6" />,
    },
];

// --- Components ---

const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={cn(
                "relative overflow-hidden group rounded-full px-8 py-4 font-medium transition-colors",
                className
            )}
        >
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
            <div className="relative flex items-center gap-2">
                {children}
            </div>
        </motion.button>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] h-[70vh] md:h-[600px] relative group rounded-3xl overflow-hidden bg-[#111] border border-white/5 shadow-2xl"
        >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                </motion.div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white/80 mb-4">
                        {project.icon}
                        {project.category}
                    </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                    {project.title}
                </h3>

                <p className="text-white/60 text-lg mb-8 max-w-md leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full border border-white/10 bg-black/20 text-xs text-white/70 backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
                        <Link className="w-5 h-5" />
                    </button>

                    <button className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
                        <Github className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Index Number */}
            <div className="absolute top-8 right-8 text-8xl font-bold text-white/5 select-none pointer-events-none">
                0{index + 1}
            </div>
        </motion.div>
    );
};

const CursorGradient = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the movement
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.06), transparent 40%)`;

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-0"
            style={{ background }}
        />
    );
};

export default function ProjectShowcase() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress to horizontal translation
    // We have 6 cards. Each card is roughly 700px + gap.
    // Total width needed: 6 * 700 + 5 * 32 (gap) = 4200 + 160 = 4360px
    // Viewport width: 100vw
    // Total scroll distance needed: 4360px - 100vw

    // Using a simpler approach for responsiveness: 
    // We calculate the translation based on the total scroll width vs viewport width.
    // However, for a fixed layout, we can approximate.

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <div className="bg-[#050505] min-h-screen text-white selection:bg-white/20 font-sans">
            <CursorGradient />

            {/* Hero Section */}
            <section className="h-screen flex flex-col justify-center items-center relative px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center z-10 max-w-4xl"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Selected Works
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
                        A curation of high-performance interfaces, immersive web experiences, and robust digital infrastructure.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-white/30">Scroll to Explore</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
                </motion.div>
            </section>

            {/* Horizontal Scroll Section */}
            <div ref={containerRef} className="relative h-[300vh]">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div
                        style={{ x }}
                        className="flex gap-8 px-8 md:px-16 lg:px-24"
                    >
                        {PROJECTS.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}

                        {/* End Card */}
                        <div className="flex-shrink-0 w-[50vw] md:w-[400px] h-[70vh] md:h-[600px] flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-3xl font-bold mb-4">Want to see more?</h3>
                                <MagneticButton className="bg-white text-black">
                                    View All Projects
                                </MagneticButton>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-white/5 bg-[#050505]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-lg">P</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">Portfolio</span>
                    </div>

                    <div className="flex gap-8 text-sm text-white/40">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Email</a>
                    </div>

                    <p className="text-sm text-white/20">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}