import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, Star, Zap, Brain, Laptop, Target } from 'lucide-react';

const ProgramsSection = ({ programs }) => {
  const programIcons = {
    little_learners: Star,
    young_explorers: Zap,
    smart_kids: Brain,
    tech_teens: Laptop,
    future_leaders: Target
  };

  const programEmojis = {
    little_learners: '🌟',
    young_explorers: '🚀',
    smart_kids: '⚡',
    tech_teens: '💻',
    future_leaders: '🎯'
  };

  const scrollToEnrollment = () => {
    const element = document.getElementById('enrollment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-semibold mb-6">
            Professional Learning Tracks
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Excellence Programs Ages 4-18
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Scientifically-designed curriculum that evolves with your child, ensuring mastery at every stage
            and preparing them for global opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = programIcons[program.program_type] || Star;
            const emoji = programEmojis[program.program_type] || '🌟';
            const savings = (program.monthly_price * 3) - program.quarterly_price;
            const savingsPercent = Math.round((savings / (program.monthly_price * 3)) * 100);

            return (
              <Card key={program.id} className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                index === 2 ? 'lg:scale-105 ring-4 ring-blue-200' : ''
              }`}>
                {index === 2 && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                
                <CardHeader className={`text-center pb-4 ${index === 2 ? 'pt-12' : 'pt-8'}`}>
                  <div className="text-4xl mb-4">{emoji}</div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {program.name}
                  </CardTitle>
                  <p className="text-lg text-gray-600 mb-4">
                    {program.age_range} | {program.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">
                      LKR {program.monthly_price.toLocaleString()}/month
                    </div>
                    <div className="text-lg text-gray-700">
                      LKR {program.quarterly_price.toLocaleString()}/quarterly
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Save LKR {savings.toLocaleString()} ({savingsPercent}% savings)
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={scrollToEnrollment}
                  >
                    Choose This Program
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;