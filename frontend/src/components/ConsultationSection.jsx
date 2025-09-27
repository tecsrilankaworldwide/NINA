import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ConsultationSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    child_age_group: '',
    learning_goals: ''
  });

  const ageGroups = [
    { value: 'little_learners', label: 'Little Learners Foundation (4-6)' },
    { value: 'young_explorers', label: 'Young Explorers Discovery (7-9)' },
    { value: 'smart_kids', label: 'Smart Kids Mastery (10-12)' },
    { value: 'tech_teens', label: 'Tech Teens Professional (13-15)' },
    { value: 'future_leaders', label: 'Future Leaders Mastery (16-18)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/consultation`, formData);
      
      toast({
        title: "Consultation Request Sent! 📋",
        description: "Our education experts will contact you within 24 hours to schedule your free consultation.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        child_age_group: '',
        learning_goals: ''
      });
      
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "There was an error sending your consultation request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      console.error('Consultation request error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-4 py-2 text-sm font-semibold mb-6">
            Expert Consultation
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Schedule Your Free Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our education experts will help you choose the perfect excellence program for your child.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Free Expert Consultation
              </CardTitle>
              <p className="text-center text-orange-100 mt-2">
                Get personalized recommendations for your child's learning journey
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="full_name">Your Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age_group">Child's Age Group *</Label>
                  <Select value={formData.child_age_group} onValueChange={(value) => handleInputChange('child_age_group', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Excellence Program" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageGroups.map((group) => (
                        <SelectItem key={group.value} value={group.value}>
                          {group.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="learning_goals">Tell us about your child's learning goals *</Label>
                  <Textarea
                    id="learning_goals"
                    value={formData.learning_goals}
                    onChange={(e) => handleInputChange('learning_goals', e.target.value)}
                    required
                    className="mt-1"
                    rows={4}
                    placeholder="What are your child's interests, strengths, and learning objectives? What skills would you like them to develop?"
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">What to Expect:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          Personalized program recommendation
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          Learning path assessment
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          Expert guidance on skill development
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          Answers to all your questions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading || !formData.full_name || !formData.email || !formData.child_age_group || !formData.learning_goals}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg font-semibold"
                >
                  {loading ? 'Sending Request...' : 'Schedule Free Expert Consultation 📅'}
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Our experts will contact you within 24 hours to schedule your free consultation
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default ConsultationSection;