import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { RecyclingCenters } from '@/entities';

export default function RecyclingCentersPage() {
  const [centers, setCenters] = useState<RecyclingCenters[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<RecyclingCenters>('recyclingcenters');
    setCenters(result.items);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full py-20 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl text-foreground mb-4">
              Available Recycling Centers in India
            </h1>
            <p className="font-paragraph text-lg text-foreground max-w-[800px]">
              Find authorized e-waste recycling centers across India for safe and responsible disposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Centers List Section */}
      <section className="w-full py-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="min-h-[400px]">
            {isLoading ? null : centers.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {centers.map((center, index) => (
                  <motion.div
                    key={center._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-secondary border border-accent-light-grey rounded-lg p-8"
                  >
                    <h3 className="font-heading text-2xl text-foreground mb-6">
                      {center.centerName}
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Address */}
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div className="font-paragraph text-base text-foreground">
                          {center.addressLine1 && <div>{center.addressLine1}</div>}
                          {center.addressLine2 && <div>{center.addressLine2}</div>}
                          <div>
                            {center.district && `${center.district}, `}
                            {center.state}
                            {center.pincode && ` - ${center.pincode}`}
                          </div>
                        </div>
                      </div>
                      
                      {/* Phone */}
                      {center.phoneNumber && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                          <a 
                            href={`tel:${center.phoneNumber}`}
                            className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                          >
                            {center.phoneNumber}
                          </a>
                        </div>
                      )}
                      
                      {/* Email */}
                      {center.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                          <a 
                            href={`mailto:${center.email}`}
                            className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                          >
                            {center.email}
                          </a>
                        </div>
                      )}
                      
                      {/* Website */}
                      {center.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                          <a 
                            href={center.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground">
                  No recycling centers available yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
