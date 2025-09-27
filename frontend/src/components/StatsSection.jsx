import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';

const StatsSection = ({ stats }) => {
  const statItems = [
    {
      icon: Users,
      value: stats.total_students?.toLocaleString() || '10,000+',
      label: 'Students Enrolled',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      value: stats.success_rate || '99%',
      label: 'Success Rate',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Award,
      value: `${stats.expert_educators || '25'}+`,
      label: 'Expert Educators',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      value: stats.support_hours || '24/7',
      label: 'Learning Support',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;