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

const StatCard = ({ stat, index }: { stat: typeof IMPACT_STATS[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-start p-6 border-l border-accent-light-grey/50 hover:bg-accent-light-grey/10 transition-colors duration-300"
    >
      <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
        {stat.icon}
      </div>
      <h3 className="text-4xl font-heading font-bold text-primary mb-1">
        {stat.value}
      </h3>
      <p className="text-sm font-heading text-foreground/60 uppercase tracking-wider mb-2">{stat.unit}</p>
      <p className="text-lg font-paragraph text-foreground">{stat.label}</p>
    </motion.div>
  );
};

const StepCard = ({ step, index }: { step: typeof STEPS[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-white border border-accent-light-grey p-8 md:p-12 rounded-2xl hover:shadow-lg transition-all duration-500"
    >
      <div className="absolute top-8 right-8 text-6xl font-heading font-bold text-accent-light-grey/30 group-hover:text-primary/10 transition-colors">
        0{step.id}
      </div>
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-300">
        {step.icon}
      </div>
      <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
        {step.title}
      </h3>
      <p className="text-lg font-paragraph text-foreground/70 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Header />

      <main className="w-full overflow-clip">
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden">
          {/* Background Parallax */}
          <div className="absolute inset-0 z-0">
             <ParallaxImage className="w-full h-full" />
             <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90" />
          </div>

          <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/5 text-sm tracking-widest uppercase">
                    National E-Waste Initiative
                  </Badge>
                  <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-foreground">
                    Responsible <br />
                    <span className="text-primary">Disposal</span> Made <br />
                    Simple.
                  </h1>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-paragraph text-xl md:text-2xl text-foreground/70 max-w-2xl leading-relaxed"
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
                    className="h-16 px-10 text-lg border-2 border-accent-light-grey hover:bg-accent-light-grey/20 text-foreground rounded-full"
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
                    className="absolute inset-0 bg-accent-light-grey/20 rounded-[3rem] overflow-hidden"
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
                    className="absolute -bottom-12 -left-12 bg-white p-6 rounded-2xl shadow-xl border border-accent-light-grey max-w-xs"
                 >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-2 bg-green-100 rounded-full text-green-700">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="font-heading font-bold text-lg">Verified Recyclers</span>
                    </div>
                    <p className="text-sm text-foreground/60">All pickups are handled by government authorized partners.</p>
                 </motion.div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-foreground/40"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* --- IMPACT STATISTICS SECTION --- */}
        <section className="w-full py-24 bg-white border-y border-accent-light-grey">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {IMPACT_STATS.map((stat, index) => (
                <StatCard key={stat.id} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS (Sticky Layout) --- */}
        <section id="how-it-works" className="w-full py-32 bg-secondary/30 relative">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sticky Header */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                  <h2 className="font-heading text-5xl font-bold text-foreground mb-6">
                    Simple Steps to <br />
                    <span className="text-primary">Sustainability</span>
                  </h2>
                  <p className="font-paragraph text-xl text-foreground/70 mb-8 max-w-md">
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
                  <StepCard key={step.id} step={step} index={index} />
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
        <section className="w-full py-32 bg-foreground text-background overflow-hidden">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">What We Collect</h2>
                <p className="font-paragraph text-lg text-white/60 max-w-xl">
                  We accept a wide range of electronic waste for safe dismantling and recycling.
                </p>
              </div>
              <Link to="/report" className="text-primary hover:text-white transition-colors flex items-center gap-2 text-lg font-medium">
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
                  className="w-[300px] md:w-[350px] bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 group"
                >
                  <div className="mb-6 p-4 bg-white/10 rounded-xl w-fit text-primary group-hover:text-white transition-colors">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-semibold mb-3">{type.name}</h3>
                  <p className="text-white/60 font-paragraph leading-relaxed">
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
            <div className="flex flex-col justify-center p-12 lg:p-24 bg-secondary/20">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
                Why It Matters
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Leaf className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Prevent Toxic Leaks</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Electronics contain lead, mercury, and cadmium. Proper recycling prevents these from poisoning our soil and water.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Recycle className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Recover Precious Metals</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      We recover gold, silver, copper, and rare earth elements, reducing the need for destructive mining.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- RECYCLING CENTERS LIST --- */}
        <section className="w-full py-32 bg-background">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl font-bold mb-4">Available Recycling Centers</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                While we offer doorstep pickup, you can also visit our authorized centers across India.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-0 border-t border-accent-light-grey">
              {RECYCLING_CENTERS.map((center) => (
                <div 
                  key={center.id}
                  className="group flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-b border-accent-light-grey hover:bg-secondary/30 transition-colors duration-300"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {center.name}
                    </h3>
                    <p className="text-foreground/60 mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {center.district}, {center.state}
                    </p>
                  </div>
                  <div className="text-right md:text-right w-full md:w-auto">
                    <p className="text-sm text-foreground/80 mb-2">{center.address}</p>
                    <Badge variant="secondary" className="bg-accent-light-grey/30 text-foreground/70">
                      Authorized Partner
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="rounded-full px-8 border-accent-light-grey">
                View All Centers
              </Button>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="w-full py-32 bg-primary text-primary-foreground relative overflow-hidden">
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