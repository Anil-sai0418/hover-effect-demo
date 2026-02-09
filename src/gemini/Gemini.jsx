import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useSpring } from 'framer-motion';

const GoogleAntigravityClone = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden relative font-sans">
      <ThreeDParticleCloud mousePosition={mousePosition} />
      <Navbar />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        <HeroContent />
      </main>
    </div>
  );
};

// 3D Particle Cloud with Rounded/Spherical Movement
const ThreeDParticleCloud = ({ mousePosition }) => {
  // Smooth spring physics for rotation
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(mousePosition.y * 45, springConfig); // Rotate up to 45 degrees
  const rotateY = useSpring(mousePosition.x * 45, springConfig);

  const particles = useMemo(() => {
    const particleArray = [];
    const count = 150;
    
    for (let i = 0; i < count; i++) {
      // Random spherical coordinates
      const theta = Math.random() * Math.PI * 2; // Azimuth (0 to 360)
      const phi = Math.acos((Math.random() * 2) - 1); // Inclination (0 to 180)
      const radius = 300 + Math.random() * 200; // Distance from center
      
      // Convert to Cartesian (3D)
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      particleArray.push({
        id: i,
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: [
          'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
          'bg-blue-500', 'bg-purple-500', 'bg-pink-500'
        ][Math.floor(Math.random() * 6)],
        size: Math.random() * 4 + 2,
        depth: Math.random(), // For parallax intensity
      });
    }
    return particleArray;
  }, []);

  // Calculate rotated 3D positions
  const rotatedParticles = particles.map(p => {
    // Apply rotation based on mouse
    const rotX = (rotateX.get() || 0) * (Math.PI / 180);
    const rotY = (rotateY.get() || 0) * (Math.PI / 180);
    
    // Rotate around Y axis (horizontal mouse movement)
    let x = p.baseX * Math.cos(rotY) - p.baseZ * Math.sin(rotY);
    let z = p.baseX * Math.sin(rotY) + p.baseZ * Math.cos(rotY);
    
    // Rotate around X axis (vertical mouse movement)
    let y = p.baseY * Math.cos(rotX) - z * Math.sin(rotX);
    z = p.baseY * Math.sin(rotX) + z * Math.cos(rotX);
    
    // Perspective projection
    const perspective = 800;
    const scale = perspective / (perspective + z);
    
    return {
      ...p,
      screenX: (x * scale) + window.innerWidth / 2,
      screenY: (y * scale) + window.innerHeight / 2,
      scale: scale,
      opacity: Math.max(0.3, Math.min(1, (scale - 0.5) * 2)),
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {rotatedParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color}`}
          style={{
            width: particle.size * particle.scale,
            height: particle.size * particle.scale,
            left: particle.screenX,
            top: particle.screenY,
            opacity: particle.opacity,
            x: '-50%',
            y: '-50%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: particle.opacity }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

// Navigation Component (same as before)
const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { name: 'Product', href: '#', hasDropdown: false },
    { 
      name: 'Use Cases', 
      href: '#', 
      hasDropdown: true,
      items: ['Development', 'Design', 'Data Science', 'Education']
    },
    { name: 'Pricing', href: '#', hasDropdown: false },
    { name: 'Blog', href: '#', hasDropdown: false },
    { 
      name: 'Resources', 
      href: '#', 
      hasDropdown: true,
      items: ['Documentation', 'Tutorials', 'Community', 'Support']
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4285f4" />
                    <stop offset="100%" stopColor="#34a853" />
                  </linearGradient>
                </defs>
                <path 
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                  fill="none" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-medium text-gray-900 tracking-tight">Google Antigravity</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  {item.name}
                  {item.hasDropdown && (
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                
                {item.hasDropdown && activeDropdown === item.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                    {item.items.map((subItem) => (
                      <a 
                        key={subItem} 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {subItem}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:shadow-lg">
            <span>Download</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Content
const HeroContent = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-4xl mx-auto"
    >
      <motion.div 
        className="flex items-center justify-center gap-2 mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="w-10 h-10">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="heroLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285f4" />
                <stop offset="100%" stopColor="#34a853" />
              </linearGradient>
            </defs>
            <path 
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
              fill="none" 
              stroke="url(#heroLogoGrad)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-2xl font-medium text-gray-900">Google Antigravity</span>
      </motion.div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-gray-900 tracking-tight leading-[1.1] mb-12">
        Experience liftoff with the<br />
        next-generation IDE
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span>Download for MacOS</span>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <span>Explore use cases</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-sm text-gray-500"
      >
        Also available for Linux and Windows
      </motion.p>
    </motion.div>
  );
};

export default GoogleAntigravityClone;