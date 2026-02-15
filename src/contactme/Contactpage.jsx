import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import {
    Instagram,
    Linkedin,
    Twitter,
    Mail,
    MessageCircle,
    ArrowUpRight,
    Copy,
    Check,
    Send,
    MapPin,
    Phone,
    ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// --- Components ---

/**
 * Cursor Gradient Background
 * Copied from Projects.jsx for consistency
 */
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

/**
 * Magnetic Button Component
 * Enhanced version from Projects.jsx
 */
const MagneticButton = ({ children, className, onClick }) => {
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
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={cn(
                "relative overflow-hidden group rounded-full px-8 py-4 font-medium transition-colors",
                className
            )}
        >
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
            <div className="relative flex items-center justify-center gap-2">
                {children}
            </div>
        </motion.button>
    );
};

/**
 * Floating Label Input
 * Refined for premium feel
 */
const FloatingInput = ({
    id,
    label,
    type = "text",
    required = false,
    textarea = false
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const isActive = isFocused || hasValue;

    const inputClasses = cn(
        "w-full bg-transparent border-b border-white/10 py-4 text-lg text-white outline-none transition-all duration-300 focus:border-white/50",
        textarea ? "min-h-[120px] resize-none" : ""
    );

    return (
        <div className="relative group">
            <label
                htmlFor={id}
                className={cn(
                    "absolute left-0 transition-all duration-300 pointer-events-none font-medium tracking-wide",
                    isActive
                        ? "top-0 text-xs text-blue-400"
                        : "top-4 text-white/40 text-base group-hover:text-white/60"
                )}
            >
                {label}
                {required && <span className="text-blue-400 ml-1">*</span>}
            </label>

            {textarea ? (
                <textarea
                    id={id}
                    className={inputClasses}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value.length > 0);
                    }}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    className={inputClasses}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value.length > 0);
                    }}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                />
            )}
            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full group-focus-within:w-full" />
        </div>
    );
};

const SocialLink = ({ icon: Icon, label, href, delay }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
    >
        <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </div>
        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{label}</span>
        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 ml-auto transition-colors" />
    </motion.a>
);

// --- Main Page Component ---

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        document.title = "Contact | Studio Apex";
    }, []);

    const email = "hello@studioapex.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative selection:bg-purple-500/30">
            {/* Interactive Background */}
            <CursorGradient />

            {/* Background Noise used in About page */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* --- Left Column: Header & Info --- */}
                    <div className="flex flex-col space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-12 h-[1px] bg-blue-500/50"></span>
                                <span className="text-xs font-mono text-blue-400 uppercase tracking-[4px]">Get in touch</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-[1.1]">
                                LET'S WORK <br />
                                <span className="text-white italic font-serif">TOGETHER.</span>
                            </h1>

                            <p className="text-xl text-white/60 leading-relaxed font-light max-w-lg">
                                Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
                            </p>
                        </motion.div>

                        {/* Contact Details */}
                       
                    </div>

                    {/* --- Right Column: Form & Socials --- */}
                    <div className="flex flex-col space-y-8">
                        {/* Glassmorphism Form Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl -z-10 rounded-full opacity-20" />

                            {/* <form
                                className="relative bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 space-y-8 shadow-2xl"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-medium text-white">Send a Message</h3>
                                    <div className="flex gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                        <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                        <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <FloatingInput id="name" label="What's your name?" required />
                                    <FloatingInput id="email" label="What's your email?" type="email" required />
                                    <FloatingInput id="message" label="Tell us about your project..." textarea required />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <MagneticButton className="bg-white text-black hover:bg-gray-200 w-full sm:w-auto">
                                        Send Message <Send className="w-4 h-4 ml-2" />
                                    </MagneticButton>
                                </div>
                            </form> */}
                        </motion.div>

                        {/* Social Links */}
                        <div className="grid grid-cols-2 gap-4">
                            <SocialLink icon={Linkedin} label="LinkedIn" href="#" delay={0.6} />
                            <SocialLink icon={Twitter} label="Twitter" href="#" delay={0.7} />
                            <SocialLink icon={Instagram} label="Instagram" href="#" delay={0.8} />
                            <SocialLink icon={MessageCircle} label="WhatsApp" href="#" delay={0.9} />
                        </div>

                        {/* Footer Note */}
                        <div className="text-center md:text-right pt-4">
                            <p className="text-white/20 text-sm font-light">
                                Response time: <span className="text-green-400">Usually within 2 hours</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}