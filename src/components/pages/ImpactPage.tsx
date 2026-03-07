import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ImpactStatistics, EducationalContent } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ImpactPage() {
  const [statistics, setStatistics] = useState<ImpactStatistics[]>([]);
  const [education, setEducation] = useState<EducationalContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [statsResult, eduResult] = await Promise.all([
      BaseCrudService.getAll<ImpactStatistics>('impactstatistics'),
      BaseCrudService.getAll<EducationalContent>('educationalcontent')
    ]);
    setStatistics(statsResult.items);
    setEducation(eduResult.items);
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
              Environmental Impact & Education
            </h1>
            <p className="font-paragraph text-lg text-foreground max-w-[800px]">
              Discover the positive impact of responsible e-waste disposal and learn why recycling matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="w-full py-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-heading text-4xl text-foreground mb-12 text-center">
            Our Environmental Impact
          </h2>
          
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : statistics.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {statistics.map((stat, index) => (
                  <motion.div
                    key={stat._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-secondary border border-accent-light-grey rounded-lg p-8 text-center"
                  >
                    {stat.metricImage && (
                      <div className="mb-6">
                        <Image
                          src={stat.metricImage}
                          alt={stat.metricName || 'Impact metric'}
                          width={80}
                          className="w-20 h-20 mx-auto object-contain"
                        />
                      </div>
                    )}
                    <div className="font-heading text-5xl font-bold text-primary mb-2">
                      {stat.metricValue}{stat.metricUnit}
                    </div>
                    <h3 className="font-heading text-xl text-foreground mb-3">
                      {stat.metricName}
                    </h3>
                    {stat.metricDescription && (
                      <p className="font-paragraph text-base text-foreground">
                        {stat.metricDescription}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground">
                  No impact statistics available yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="w-full py-20 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-heading text-4xl text-foreground mb-12 text-center">
            Why Recycle E-Waste?
          </h2>
          
          <div className="min-h-[400px]">
            {isLoading ? null : education.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {education.map((content, index) => (
                  <motion.div
                    key={content._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                  >
                    {content.mainImage && (
                      <div className="w-full md:w-1/2">
                        <Image
                          src={content.mainImage}
                          alt={content.title || 'Educational content'}
                          width={600}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="w-full md:w-1/2">
                      {content.benefitCategory && (
                        <div className="inline-block bg-primary text-primary-foreground font-paragraph text-sm font-semibold px-4 py-2 rounded mb-4">
                          {content.benefitCategory}
                        </div>
                      )}
                      <h3 className="font-heading text-3xl text-foreground mb-4">
                        {content.title}
                      </h3>
                      {content.shortDescription && (
                        <p className="font-paragraph text-lg text-foreground mb-4">
                          {content.shortDescription}
                        </p>
                      )}
                      {content.mainContent && (
                        <p className="font-paragraph text-base text-foreground mb-6">
                          {content.mainContent}
                        </p>
                      )}
                      {content.learnMoreUrl && (
                        <a
                          href={content.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-primary font-paragraph font-semibold text-base hover:underline"
                        >
                          Learn More →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground">
                  No educational content available yet.
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
