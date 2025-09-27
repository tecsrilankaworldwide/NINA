import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Brain, Users, Globe, Sparkles, BarChart3, HandHeart } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description: 'Advanced machine learning algorithms customize every lesson to your child\'s learning style, ensuring optimal progress and engagement.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Expert Curriculum Design',
      description: 'Content developed by NIE-trained educators and international experts, combining Sri Lankan context with global standards.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Globe,
      title: 'Global Career Readiness',
      description: 'Preparing students for international opportunities while strengthening Sri Lankan identity and cultural values.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Sparkles,
      title: 'Premium Learning Experience',
      description: 'High-quality interactive content, virtual laboratories, and immersive experiences that inspire excellence.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive progress tracking and detailed analytics provide insights for optimal learning outcomes.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: HandHeart,
      title: 'Expert Mentorship',
      description: 'Connect with industry professionals and expert mentors through our exclusive learning community.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2 text-sm font-semibold mb-6">
            World-Class Excellence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why TecaiKids Leads Sri Lanka
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform combines cutting-edge technology with proven educational methodologies,
            delivering unmatched learning outcomes and global career readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} mb-6`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;