import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Calendar, MapPin, Package, User, Phone, Mail } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { EWasteReports } from '@/entities';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AdminDashboard() {
  const { isDarkMode } = useThemeStore();
  const [reports, setReports] = useState<EWasteReports[]>([]);
  const [filteredReports, setFilteredReports] = useState<EWasteReports[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<EWasteReports | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, statusFilter]);

  const loadReports = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<EWasteReports>('ewastereports');
    setReports(result.items);
    setIsLoading(false);
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.requestId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.district?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  };

  const updateStatus = async (reportId: string, newStatus: string) => {
    setReports(prev => prev.map(r => r._id === reportId ? { ...r, status: newStatus } : r));
    if (selectedReport?._id === reportId) {
      setSelectedReport(prev => prev ? { ...prev, status: newStatus } : null);
    }
    
    await BaseCrudService.update<EWasteReports>('ewastereports', {
      _id: reportId,
      status: newStatus
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Pending': return isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-destructive text-destructive-foreground';
      case 'Pickup Scheduled': return isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-primary text-primary-foreground';
      case 'Completed': return isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-primary text-primary-foreground';
      default: return isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-accent-light-grey text-foreground';
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-slate-950' : 'bg-background'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className={`w-full py-12 border-b transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-secondary border-accent-light-grey'}`}>
        <div className="max-w-[1600px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`font-heading text-4xl mb-2 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
              District Collector Dashboard
            </h1>
            <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-400' : 'text-foreground'}`}>
              Manage incoming e-waste collection requests
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className={`w-full py-12 transition-colors ${isDarkMode ? 'bg-slate-950' : 'bg-background'}`}>
        <div className="max-w-[1600px] mx-auto px-8">
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50 ${isDarkMode ? 'text-gray-400' : 'text-foreground'}`} />
              <Input
                placeholder="Search by Request ID, Name, or District"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className={`w-full md:w-48 font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                <SelectItem value="all" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>All Status</SelectItem>
                <SelectItem value="Pending" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Pending</SelectItem>
                <SelectItem value="Pickup Scheduled" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Pickup Scheduled</SelectItem>
                <SelectItem value="Completed" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports Grid */}
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredReports.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`border rounded-lg p-6 cursor-pointer transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-primary' : 'bg-secondary border-accent-light-grey hover:border-primary'}`}
                    onClick={() => setSelectedReport(report)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className={`font-heading text-sm font-semibold mb-1 ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                          {report.requestId}
                        </p>
                        <h3 className={`font-heading text-xl ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                          {report.userName}
                        </h3>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <Package className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                          <span className="font-semibold">{report.wasteType}</span>
                          <span className={isDarkMode ? 'text-gray-500' : 'opacity-70'}> • {report.estimatedQuantity}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                          {report.district}, {report.state}
                        </p>
                      </div>
                      {report.pickupDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                          <p className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                            {format(new Date(report.pickupDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status Update */}
                    <Select 
                      value={report.status} 
                      onValueChange={(value) => updateStatus(report._id, value)}
                    >
                      <SelectTrigger className={`w-full font-paragraph text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                        <SelectItem value="Pending" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Pending</SelectItem>
                        <SelectItem value="Pickup Scheduled" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Pickup Scheduled</SelectItem>
                        <SelectItem value="Completed" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className={`font-paragraph text-lg ${isDarkMode ? 'text-gray-400' : 'text-foreground'}`}>
                  No reports found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedReport && (
        <div 
          className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${isDarkMode ? 'bg-black/50' : 'bg-foreground/50'}`}
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg max-w-[800px] w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-slate-900' : 'bg-background'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className={`font-heading text-sm font-semibold mb-2 ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                    {selectedReport.requestId}
                  </p>
                  <h2 className={`font-heading text-3xl ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                    Report Details
                  </h2>
                </div>
                <Button
                  onClick={() => setSelectedReport(null)}
                  variant="outline"
                  className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                >
                  Close
                </Button>
              </div>

              {/* User Information */}
              <div className="mb-8">
                <h3 className={`font-heading text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>User Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <span className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>{selectedReport.userName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a href={`tel:${selectedReport.userPhoneNumber}`} className={`font-paragraph text-base hover:text-primary ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      {selectedReport.userPhoneNumber}
                    </a>
                  </div>
                  {selectedReport.userEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <a href={`mailto:${selectedReport.userEmail}`} className={`font-paragraph text-base hover:text-primary ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                        {selectedReport.userEmail}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <h3 className={`font-heading text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Location</h3>
                <div className="space-y-2">
                  <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>{selectedReport.fullAddress}</p>
                  <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                    {selectedReport.district}, {selectedReport.state} - {selectedReport.pincode}
                  </p>
                </div>
              </div>

              {/* Waste Details */}
              <div className="mb-8">
                <h3 className={`font-heading text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Waste Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-500' : 'text-foreground/70'}`}>Type:</span>
                    <p className={`font-paragraph text-base font-semibold ${isDarkMode ? 'text-white' : 'text-foreground'}`}>{selectedReport.wasteType}</p>
                  </div>
                  <div>
                    <span className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-500' : 'text-foreground/70'}`}>Quantity:</span>
                    <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>{selectedReport.estimatedQuantity}</p>
                  </div>
                  <div>
                    <span className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-500' : 'text-foreground/70'}`}>Description:</span>
                    <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>{selectedReport.wasteDescription}</p>
                  </div>
                </div>
              </div>

              {/* Images */}
              {selectedReport.wasteImages && (
                <div className="mb-8">
                  <h3 className={`font-heading text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Waste Images</h3>
                  <Image
                    src={selectedReport.wasteImages}
                    alt="E-waste"
                    width={600}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Pickup Schedule */}
              <div className="mb-8">
                <h3 className={`font-heading text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Pickup Schedule</h3>
                <div className="space-y-2">
                  {selectedReport.pickupDate && (
                    <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      <span className={isDarkMode ? 'text-gray-500' : 'opacity-70'}>Date:</span> {format(new Date(selectedReport.pickupDate), 'MMMM dd, yyyy')}
                    </p>
                  )}
                  {selectedReport.pickupTime && (
                    <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      <span className={isDarkMode ? 'text-gray-500' : 'opacity-70'}>Time:</span> {selectedReport.pickupTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className={`font-heading text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Update Status</h3>
                <Select 
                  value={selectedReport.status} 
                  onValueChange={(value) => updateStatus(selectedReport._id, value)}
                >
                  <SelectTrigger className={`w-full font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                    <SelectItem value="Pending" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Pending</SelectItem>
                    <SelectItem value="Pickup Scheduled" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Pickup Scheduled</SelectItem>
                    <SelectItem value="Completed" className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
