import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from './HeroSection';
import ProgramsSection from './ProgramsSection';
import FeaturesSection from './FeaturesSection';
import EnrollmentSection from './EnrollmentSection';
import ConsultationSection from './ConsultationSection';
import StatsSection from './StatsSection';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [programs, setPrograms] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, statsRes] = await Promise.all([
          axios.get(`${API}/programs`),
          axios.get(`${API}/stats`)
        ]);
        
        setPrograms(programsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <HeroSection stats={stats} />
      <StatsSection stats={stats} />
      <ProgramsSection programs={programs} />
      <FeaturesSection />
      <EnrollmentSection programs={programs} />
      <ConsultationSection />
    </div>
  );
};

export default HomePage;