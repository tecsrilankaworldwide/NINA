import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Check, CreditCard, Building2, Smartphone, Lock, Shield, Award } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EnrollmentSection = ({ programs }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student_full_name: '',
    parent_guardian_name: '',
    email: '',
    phone: '',
    address: ''
  });

  const programOptions = [
    { value: 'little_learners', label: '🌟 Little Learners Foundation (4-6)', emoji: '🌟' },
    { value: 'young_explorers', label: '🚀 Young Explorers Discovery (7-9)', emoji: '🚀' },
    { value: 'smart_kids', label: '⚡ Smart Kids Mastery (10-12)', emoji: '⚡' },
    { value: 'tech_teens', label: '💻 Tech Teens Professional (13-15)', emoji: '💻' },
    { value: 'future_leaders', label: '🎯 Future Leaders Mastery (16-18)', emoji: '🎯' }
  ];

  const paymentMethods = [
    {
      value: 'card',
      icon: CreditCard,
      title: 'Credit/Debit Card',
      description: 'Secure international payment processing',
      status: 'Available'
    },
    {
      value: 'bank_transfer',
      icon: Building2,
      title: 'Bank Transfer',
      description: 'Direct transfer to Bank of Ceylon',
      status: 'Available'
    },
    {
      value: 'ez_cash',
      icon: Smartphone,
      title: 'eZ Cash',
      description: 'Mobile payment integration',
      status: 'Coming Soon'
    }
  ];

  const getSelectedProgramDetails = () => {
    return programs.find(p => p.program_type === selectedProgram);
  };

  const calculateAmount = () => {
    const program = getSelectedProgramDetails();
    if (!program) return 0;
    return paymentPlan === 'quarterly' ? program.quarterly_price : program.monthly_price;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const enrollmentData = {
        ...formData,
        program_type: selectedProgram,
        payment_plan: paymentPlan,
        payment_method: paymentMethod
      };

      const response = await axios.post(`${API}/enrollment`, enrollmentData);
      
      toast({
        title: "Enrollment Successful! 🎉",
        description: "Welcome to TecaiKids! We'll contact you soon with next steps.",
        duration: 5000,
      });

      // Reset form
      setStep(1);
      setSelectedProgram(null);
      setFormData({
        student_full_name: '',
        parent_guardian_name: '',
        email: '',
        phone: '',
        address: ''
      });
      
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "There was an error processing your enrollment. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      console.error('Enrollment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enrollment" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 text-sm font-semibold mb-6">
            Secure Enrollment
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Invest in Your Child's Future Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional-grade education with flexible payment options and guaranteed results.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl font-bold text-center">
                Excellence Program Enrollment
              </CardTitle>
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step >= num ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'
                      }`}>
                        {step > num ? <Check className="w-4 h-4" /> : num}
                      </div>
                      {num < 3 && <div className="w-8 h-0.5 bg-blue-300 mx-2" />}
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    1. Select Excellence Program
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {programOptions.map((option) => (
                      <div key={option.value}>
                        <input
                          type="radio"
                          id={option.value}
                          name="program"
                          value={option.value}
                          checked={selectedProgram === option.value}
                          onChange={(e) => setSelectedProgram(e.target.value)}
                          className="sr-only"
                        />
                        <label
                          htmlFor={option.value}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedProgram === option.value
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">{option.emoji}</div>
                            <div className="font-semibold text-sm">{option.label}</div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!selectedProgram}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    Continue to Payment Plan
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    2. Choose Investment Plan
                  </h3>
                  
                  <RadioGroup value={paymentPlan} onValueChange={setPaymentPlan}>
                    <div className="space-y-4">
                      <div className={`border-2 rounded-lg p-4 ${
                        paymentPlan === 'monthly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="font-semibold">Monthly Excellence</Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Flexible monthly investment</p>
                      </div>
                      
                      <div className={`border-2 rounded-lg p-4 relative ${
                        paymentPlan === 'quarterly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <Badge className="absolute -top-3 left-4 bg-green-500 text-white">
                          Save 25%
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quarterly" id="quarterly" />
                          <Label htmlFor="quarterly" className="font-semibold">Quarterly Mastery</Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Includes premium workbooks</p>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  {selectedProgram && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">
                        Selected Program: {getSelectedProgramDetails()?.name}
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mt-2">
                        LKR {calculateAmount().toLocaleString()}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Continue to Details
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    3. Student & Parent Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="student_name">Student's Full Name *</Label>
                      <Input
                        id="student_name"
                        value={formData.student_full_name}
                        onChange={(e) => handleInputChange('student_full_name', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="parent_name">Parent/Guardian Name *</Label>
                      <Input
                        id="parent_name"
                        value={formData.parent_guardian_name}
                        onChange={(e) => handleInputChange('parent_guardian_name', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Primary Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Contact Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Complete Delivery Address for Quarterly Workbooks *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                      <Lock className="w-4 h-4" />
                      <Shield className="w-4 h-4" />
                      <Award className="w-4 h-4" />
                      Security & Guarantee
                    </div>
                    <p className="text-sm text-green-700">
                      🔒 256-bit SSL encryption • Guaranteed satisfaction • 30-day money-back guarantee
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      {loading ? 'Processing...' : 'Complete Enrollment 🎉'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default EnrollmentSection;