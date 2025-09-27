import React from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Star, Trophy } from 'lucide-react';

const HeroSection = ({ stats }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="mb-6">
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-4 py-2 text-sm font-semibold">
            <Trophy className="w-4 h-4 mr-2" />
            Sri Lanka's Premier Educational Platform
          </Badge>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
          Empowering Future Leaders
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-blue-100 font-medium">
          Professional Education Ages 4-18
        </p>
        
        <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-4xl mx-auto leading-relaxed">
          World-class education platform featuring logical thinking, algorithmic reasoning,
          coding, AI, and career preparation. Designed specifically for Sri Lankan excellence
          with expert curriculum and cutting-edge technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => scrollToSection('programs')}
          >
            Start Excellence Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-lg transition-all duration-300"
            onClick={() => scrollToSection('programs')}
          >
            Explore Programs
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              {stats.total_students?.toLocaleString() || '10,000+'}
            </div>
            <div className="text-blue-200 text-sm md:text-base">Students Enrolled</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
              {stats.success_rate || '99%'}
            </div>
            <div className="text-blue-200 text-sm md:text-base">Success Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
              {stats.expert_educators || '25+'}+
            </div>
            <div className="text-blue-200 text-sm md:text-base">Expert Educators</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
              {stats.support_hours || '24/7'}
            </div>
            <div className="text-blue-200 text-sm md:text-base">Learning Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;