import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const WASTE_TYPES = [
  'Mobile Phones',
  'Laptops',
  'Batteries',
  'Chargers',
  'Small Electronic Devices',
  'Other Electronic Waste'
];

export default function ReportPage() {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    userName: '',
    userPhoneNumber: '',
    userEmail: '',
    state: '',
    district: '',
    fullAddress: '',
    pincode: '',
    wasteType: '',
    estimatedQuantity: '',
    wasteDescription: '',
    wasteImages: '',
    pickupDate: '',
    pickupTime: ''
  });

  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setFormData(prev => ({ ...prev, wasteImages: base64String }));
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requestId = `REQ${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    await BaseCrudService.create('ewastereports', {
      _id: crypto.randomUUID(),
      requestId,
      userName: formData.userName,
      userPhoneNumber: formData.userPhoneNumber,
      userEmail: formData.userEmail,
      state: formData.state,
      district: formData.district,
      fullAddress: formData.fullAddress,
      pincode: formData.pincode,
      wasteType: formData.wasteType,
      estimatedQuantity: formData.estimatedQuantity,
      wasteDescription: formData.wasteDescription,
      wasteImages: formData.wasteImages || 'https://static.wixstatic.com/media/b21105_90e21c0f9336498caddf2ce4e8cf9e3d~mv2.png?originWidth=768&originHeight=576',
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      status: 'Pending'
    });

    setIsSubmitting(false);
    navigate('/success', { state: { requestId } });
  };

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-slate-950' : 'bg-background'}`}>
      <Header />
      
      <section className={`w-full py-20 transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`font-heading text-5xl mb-4 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
              Report & Schedule Pickup
            </h1>
            <p className={`font-paragraph text-lg mb-12 ${isDarkMode ? 'text-gray-400' : 'text-foreground'}`}>
              Fill out the form below to report your e-waste and schedule a pickup.
            </p>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* User Information */}
              <div className="space-y-6">
                <h2 className={`font-heading text-2xl ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                  User Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="userName" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Name *
                    </Label>
                    <Input
                      id="userName"
                      required
                      value={formData.userName}
                      onChange={(e) => handleInputChange('userName', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPhoneNumber" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Phone Number *
                    </Label>
                    <Input
                      id="userPhoneNumber"
                      type="tel"
                      required
                      value={formData.userPhoneNumber}
                      onChange={(e) => handleInputChange('userPhoneNumber', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Email (Optional)
                    </Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) => handleInputChange('userEmail', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-6">
                <h2 className={`font-heading text-2xl ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                  Location Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="state" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      State *
                    </Label>
                    <Select required value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                        {INDIAN_STATES.map(state => (
                          <SelectItem key={state} value={state} className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      District *
                    </Label>
                    <Input
                      id="district"
                      required
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fullAddress" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Full Address *
                    </Label>
                    <Textarea
                      id="fullAddress"
                      required
                      value={formData.fullAddress}
                      onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Pincode *
                    </Label>
                    <Input
                      id="pincode"
                      required
                      pattern="[0-9]{6}"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>
              </div>

              {/* Waste Details */}
              <div className="space-y-6">
                <h2 className={`font-heading text-2xl ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                  Waste Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="wasteType" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Waste Type *
                    </Label>
                    <Select required value={formData.wasteType} onValueChange={(value) => handleInputChange('wasteType', value)}>
                      <SelectTrigger className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}>
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                        {WASTE_TYPES.map(type => (
                          <SelectItem key={type} value={type} className={`font-paragraph ${isDarkMode ? 'text-white' : ''}`}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedQuantity" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Estimated Quantity *
                    </Label>
                    <Input
                      id="estimatedQuantity"
                      required
                      value={formData.estimatedQuantity}
                      onChange={(e) => handleInputChange('estimatedQuantity', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                      placeholder="e.g., 5 items, 2 kg"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="wasteDescription" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Description *
                    </Label>
                    <Textarea
                      id="wasteDescription"
                      required
                      value={formData.wasteDescription}
                      onChange={(e) => handleInputChange('wasteDescription', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                      rows={3}
                      placeholder="Describe the condition and details of the e-waste"
                    />
                  </div>
                </div>
              </div>

              {/* Media Upload */}
              <div className="space-y-6">
                <h2 className={`font-heading text-2xl ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                  Media Upload
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="wasteImages" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                    Upload Photos (Optional)
                  </Label>
                  <input
                    id="wasteImages"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <label
                    htmlFor="wasteImages"
                    className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDarkMode
                        ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                        : 'border-accent-light-grey hover:bg-gray-50'
                    } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className={`font-paragraph text-base mb-2 ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      {isUploading ? 'Uploading...' : uploadedFileName ? `✓ ${uploadedFileName}` : 'Upload photos of your e-waste'}
                    </p>
                    <p className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-500' : 'text-foreground opacity-70'}`}>
                      This helps authorities assess the waste better
                    </p>
                  </label>
                </div>
              </div>

              {/* Pickup Scheduling */}
              <div className="space-y-6">
                <h2 className={`font-heading text-2xl ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                  Pickup Scheduling
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Pickup Date *
                    </Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      required
                      value={formData.pickupDate}
                      onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupTime" className={`font-paragraph text-base ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                      Pickup Time *
                    </Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      required
                      value={formData.pickupTime}
                      onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                      className={`font-paragraph ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground font-heading font-semibold text-lg px-12 py-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
