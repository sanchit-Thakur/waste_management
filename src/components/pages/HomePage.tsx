// HPI 1.7-G
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { 
  Recycle, 
  FileText, 
  Truck, 
  Battery, 
  Smartphone, 
  Laptop, 
  Zap, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Leaf, 
  Globe,
  ChevronDown
} from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// --- Canonical Data Sources (Static for this implementation as per instructions) ---

const IMPACT_STATS = [
  { id: 1, label: "E-Waste Collected", value: "50,000+", unit: "kg", icon: <Recycle className="w-6 h-6" /> },
  { id: 2, label: "Devices Recycled", value: "12,500+", unit: "units", icon: <Smartphone className="w-6 h-6" /> },
  { id: 3, label: "Carbon Offset", value: "85,000", unit: "kg", icon: <Leaf className="w-6 h-6" /> },
  { id: 4, label: "Partner Centers", value: "120+", unit: "locs", icon: <MapPin className="w-6 h-6" /> },
];

const WASTE_TYPES = [
  { id: 'mobile', name: "Mobile Phones", icon: <Smartphone className="w-8 h-8" />, desc: "Smartphones, feature phones, and tablets." },
  { id: 'laptop', name: "Laptops & PCs", icon: <Laptop className="w-8 h-8" />, desc: "Laptops, desktops, monitors, and accessories." },
  { id: 'battery', name: "Batteries", icon: <Battery className="w-8 h-8" />, desc: "Lithium-ion, AA/AAA, and power banks." },
  { id: 'charger', name: "Chargers & Cables", icon: <Zap className="w-8 h-8" />, desc: "Power adapters, USB cables, and cords." },
  { id: 'other', name: "Small Electronics", icon: <Globe className="w-8 h-8" />, desc: "Cameras, headphones, and smart wearables." },
];

const RECYCLING_CENTERS = [
  { id: 1, name: "EcoGreen Recyclers", state: "Delhi", district: "New Delhi", address: "Plot 45, Okhla Industrial Area, Phase III" },
  { id: 2, name: "MahaWaste Solutions", state: "Maharashtra", district: "Mumbai", address: "Unit 12, Andheri East, MIDC" },
  { id: 3, name: "TechClean Bangalore", state: "Karnataka", district: "Bangalore", address: "Electronic City, Phase 1, Hosur Road" },
  { id: 4, name: "Green Tamil Nadu", state: "Tamil Nadu", district: "Chennai", address: "Guindy Industrial Estate, Sector 4" },
];

const STEPS = [
  {
    id: 1,
    title: "Select E-Waste Type",
    description: "Identify the electronic items you wish to dispose of from our comprehensive list of accepted categories.",
    icon: <Recycle className="w-6 h-6 text-primary-foreground" />,
  },
  {
    id: 2,
    title: "Report & Schedule",
    description: "Fill out a unified form with your location details and preferred pickup time. It takes less than 2 minutes.",
    icon: <FileText className="w-6 h-6 text-primary-foreground" />,
  },
  {
    id: 3,
    title: "Safe Collection",
    description: "Our authorized partners will verify and collect the waste from your doorstep for responsible recycling.",
    icon: <Truck className="w-6 h-6 text-primary-foreground" />,
  },
];

// --- Components ---

const ParallaxImage = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-clip relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] absolute top-[-10%] left-0">
        <Image
          src="https://static.wixstatic.com/media/b21105_0a01a1042dd04dc0956f89f5ed5a3c43~mv2.png?originWidth=960&originHeight=576"
          alt="Sustainable E-Waste Management"
          className="w-full h-full object-cover opacity-90"
          width={1920}
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

const StatCard = ({ stat, index, isDarkMode }: { stat: typeof IMPACT_STATS[0], index: number, isDarkMode: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col items-start p-6 border-l transition-colors ${isDarkMode ? 'border-slate-700 hover:bg-slate-700/30' : 'border-accent-light-grey/50 hover:bg-accent-light-grey/10'}`}
    >
      <div className={`mb-4 p-3 rounded-full text-primary ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
        {stat.icon}
      </div>
      <h3 className="text-4xl font-heading font-bold text-primary mb-1">
        {stat.value}
      </h3>
      <p className={`text-sm font-heading uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-500' : 'text-foreground/60'}`}>{stat.unit}</p>
      <p className={`text-lg font-paragraph ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>{stat.label}</p>
    </motion.div>
  );
};

const StepCard = ({ step, index, isDarkMode }: { step: typeof STEPS[0], index: number, isDarkMode: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`group relative p-8 md:p-12 rounded-2xl hover:shadow-lg transition-all duration-500 ${isDarkMode ? 'bg-slate-800 border border-slate-700 hover:border-primary' : 'bg-white border border-accent-light-grey hover:border-primary'}`}
    >
      <div className={`absolute top-8 right-8 text-6xl font-heading font-bold group-hover:text-primary/10 transition-colors ${isDarkMode ? 'text-slate-700/30' : 'text-accent-light-grey/30'}`}>
        0{step.id}
      </div>
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-300">
        {step.icon}
      </div>
      <h3 className={`text-2xl font-heading font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
        {step.title}
      </h3>
      <p className={`text-lg font-paragraph leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-foreground/70'}`}>
        {step.description}
      </p>
    </motion.div>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useThemeStore();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className={`min-h-screen transition-colors ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-background text-foreground'} selection:bg-primary/20`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Header />

      <main className="w-full overflow-clip">
        
        {/* --- HERO SECTION --- */}
        <section className={`relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
          {/* Background Parallax */}
          <div className="absolute inset-0 z-0">
             <ParallaxImage className="w-full h-full" />
             <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90' : 'bg-gradient-to-b from-white/80 via-white/40 to-white/90'}`} />
          </div>

          <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Badge variant="outline" className={`mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/5 text-sm tracking-widest uppercase ${isDarkMode ? 'border-primary/50 bg-primary/10' : ''}`}>
                    National E-Waste Initiative
                  </Badge>
                  <h1 className={`font-heading text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                    Responsible <br />
                    <span className="text-primary">Disposal</span> Made <br />
                    Simple.
                  </h1>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`font-paragraph text-xl md:text-2xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-foreground/70'}`}
                >
                  Join the movement towards a cleaner India. Report electronic waste and schedule a safe, government-authorized pickup in your district today.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap gap-4 mt-4"
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20"
                  >
                    <Link to="/report">
                      Report & Schedule Pickup
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className={`h-16 px-10 text-lg border-2 rounded-full ${isDarkMode ? 'border-slate-600 bg-slate-800 text-white hover:bg-slate-700' : 'border-accent-light-grey bg-white hover:bg-accent-light-grey/20 text-foreground'}`}
                  >
                    <Link to="#how-it-works">
                      How It Works
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Hero Visual Element - Abstract Composition */}
              <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`absolute inset-0 rounded-[3rem] overflow-hidden ${isDarkMode ? 'bg-slate-800/50' : 'bg-accent-light-grey/20'}`}
                 >
                    <Image 
                      src="https://static.wixstatic.com/media/b21105_b9a6030a0c6b40c0b516086b864a4c38~mv2.png?originWidth=960&originHeight=576"
                      alt="E-Waste Collection"
                      className="w-full h-full object-cover mix-blend-multiply opacity-60"
                    />
                 </motion.div>
                 
                 {/* Floating Cards */}
                 <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={`absolute -bottom-12 -left-12 p-6 rounded-2xl shadow-xl border max-w-xs ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-accent-light-grey'}`}
                 >
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`p-2 rounded-full ${isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'}`}>
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className={`font-heading font-bold text-lg ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Verified Recyclers</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-foreground/60'}`}>All pickups are handled by government authorized partners.</p>
                 </motion.div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce ${isDarkMode ? 'text-gray-600' : 'text-foreground/40'}`}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* --- IMPACT STATISTICS SECTION --- */}
        <section className={`w-full py-24 border-y transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-accent-light-grey'}`}>
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {IMPACT_STATS.map((stat, index) => (
                <StatCard key={stat.id} stat={stat} index={index} isDarkMode={isDarkMode} />
              ))}
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS (Sticky Layout) --- */}
        <section id="how-it-works" className={`w-full py-32 relative transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-secondary/30'}`}>
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sticky Header */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                  <h2 className={`font-heading text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                    Simple Steps to <br />
                    <span className="text-primary">Sustainability</span>
                  </h2>
                  <p className={`font-paragraph text-xl mb-8 max-w-md ${isDarkMode ? 'text-gray-400' : 'text-foreground/70'}`}>
                    We've streamlined the process to make responsible disposal as easy as ordering a cab.
                  </p>
                  <Separator className="w-24 bg-primary h-1 mb-8" />
                  <div className="hidden lg:block">
                    <Button asChild size="lg" className="rounded-full px-8">
                      <Link to="/report">Start Now</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Scrollable Steps */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {STEPS.map((step, index) => (
                  <StepCard key={step.id} step={step} index={index} isDarkMode={isDarkMode} />
                ))}
              </div>
              
              <div className="lg:hidden col-span-1 mt-8">
                 <Button asChild size="lg" className="w-full rounded-full">
                    <Link to="/report">Start Now</Link>
                 </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- WASTE TYPES MARQUEE/GRID --- */}
        <section className={`w-full py-32 overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-foreground text-background'}`}>
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">What We Collect</h2>
                <p className={`font-paragraph text-lg max-w-xl ${isDarkMode ? 'text-gray-300' : 'text-white/60'}`}>
                  We accept a wide range of electronic waste for safe dismantling and recycling.
                </p>
              </div>
              <Link to="/report" className={`hover:text-white transition-colors flex items-center gap-2 text-lg font-medium ${isDarkMode ? 'text-primary hover:text-primary/80' : 'text-primary'}`}>
                View Full List <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="w-full overflow-x-auto pb-12 hide-scrollbar px-6 md:px-12">
            <div className="flex gap-6 min-w-max">
              {WASTE_TYPES.map((type, i) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-[300px] md:w-[350px] p-8 rounded-2xl hover:transition-colors duration-300 group ${isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                >
                  <div className={`mb-6 p-4 rounded-xl w-fit transition-colors ${isDarkMode ? 'bg-white/10 text-primary group-hover:text-white' : 'bg-white/10 text-primary group-hover:text-white'}`}>
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-semibold mb-3">{type.name}</h3>
                  <p className={`font-paragraph leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-white/60'}`}>
                    {type.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- WHY RECYCLE (Split Layout) --- */}
        <section className="w-full py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            <div className="relative h-[50vh] lg:h-auto overflow-hidden">
               <Image 
                 src="https://static.wixstatic.com/media/b21105_3b796a28ad61489baf5b5eb9d7053912~mv2.png?originWidth=1280&originHeight=704"
                 alt="Environmental Impact"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
            <div className={`flex flex-col justify-center p-12 lg:p-24 transition-colors ${isDarkMode ? 'bg-slate-800' : 'bg-secondary/20'}`}>
              <h2 className={`font-heading text-4xl md:text-5xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                Why It Matters
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="mt-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-primary ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
                      <Leaf className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Prevent Toxic Leaks</h3>
                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-foreground/70'}`}>
                      Electronics contain lead, mercury, and cadmium. Proper recycling prevents these from poisoning our soil and water.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="mt-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-primary ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
                      <Recycle className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Recover Precious Metals</h3>
                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-foreground/70'}`}>
                      We recover gold, silver, copper, and rare earth elements, reducing the need for destructive mining.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- RECYCLING CENTERS LIST --- */}
        <section className={`w-full py-32 transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-background'}`}>
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
              <h2 className={`font-heading text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Available Recycling Centers</h2>
              <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-foreground/60'}`}>
                While we offer doorstep pickup, you can also visit our authorized centers across India.
              </p>
            </div>

            <div className={`grid grid-cols-1 gap-0 border-t ${isDarkMode ? 'border-slate-700' : 'border-accent-light-grey'}`}>
              {RECYCLING_CENTERS.map((center) => (
                <div 
                  key={center.id}
                  className={`group flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-b transition-colors duration-300 ${isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-accent-light-grey hover:bg-secondary/30'}`}
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className={`text-2xl font-heading font-semibold group-hover:text-primary transition-colors ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                      {center.name}
                    </h3>
                    <p className={`mt-1 flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-foreground/60'}`}>
                      <MapPin className="w-4 h-4" /> {center.district}, {center.state}
                    </p>
                  </div>
                  <div className="text-right md:text-right w-full md:w-auto">
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-foreground/80'}`}>{center.address}</p>
                    <Badge variant="secondary" className={`${isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-accent-light-grey/30 text-foreground/70'}`}>
                      Authorized Partner
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className={`rounded-full px-8 ${isDarkMode ? 'border-slate-600 text-white hover:bg-slate-800' : 'border-accent-light-grey'}`}>
                View All Centers
              </Button>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className={`w-full py-32 relative overflow-hidden transition-colors ${isDarkMode ? 'bg-primary/90' : 'bg-primary'} text-primary-foreground`}>
          <div className="absolute inset-0 opacity-10">
             <Image 
               src="https://static.wixstatic.com/media/b21105_2fdf5572cfbf4978a9908f7b82e87cde~mv2.png?originWidth=1280&originHeight=704"
               alt="Pattern"
               className="w-full h-full object-cover"
             />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-5xl md:text-6xl font-bold mb-8"
            >
              Ready to Clear the Clutter?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-paragraph text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed"
            >
              Join thousands of responsible citizens contributing to a cleaner, safer India. It only takes a minute to make a lasting impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="h-20 px-12 text-xl bg-white text-primary hover:bg-white/90 rounded-full shadow-2xl"
              >
                <Link to="/report">
                  Schedule Free Pickup
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}