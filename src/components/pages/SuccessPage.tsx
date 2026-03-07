import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  const location = useLocation();
  const requestId = location.state?.requestId || 'N/A';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="w-full py-32">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-[700px] mx-auto"
          >
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-14 h-14 text-primary-foreground" />
            </div>
            
            <h1 className="font-heading text-5xl text-foreground mb-6">
              Report Submitted Successfully!
            </h1>
            
            <p className="font-paragraph text-xl text-foreground mb-8">
              Your e-waste report has been received and forwarded to the district authorities.
            </p>
            
            <div className="bg-secondary border border-accent-light-grey rounded-lg p-8 mb-12">
              <p className="font-paragraph text-base text-foreground mb-2">
                Your Request ID:
              </p>
              <p className="font-heading text-3xl font-semibold text-primary">
                {requestId}
              </p>
              <p className="font-paragraph text-sm text-foreground mt-4 opacity-70">
                Please save this ID for future reference
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="font-paragraph text-base text-foreground">
                The authorities will contact you soon to confirm the pickup schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link 
                  to="/"
                  className="inline-block bg-primary text-primary-foreground font-heading font-semibold text-base px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Back to Home
                </Link>
                <Link 
                  to="/report"
                  className="inline-block bg-transparent text-primary border border-primary font-heading font-semibold text-base px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Submit Another Report
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
