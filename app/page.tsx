'use client';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NoteDeconstructor from './components/NoteDeconstructor';
import TrapPredictor from './components/TrapPredictor';
import CramPlan from './components/CramPlan';
import FeynmanExplainer from './components/FeynmanExplainer';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import LandingPage from './components/LandingPage';

export default function Home() {
  const [inApp, setInApp] = useState(false);
  const [activeTab, setActiveTab] = useState('deconstruct');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user already entered app before in current session
    try {
      const entered = sessionStorage.getItem('lectura_entered_app');
      if (entered === 'true') {
        setInApp(true);
      }
    } catch {}
  }, []);

  const handleEnterApp = (featureId?: string) => {
    setInApp(true);
    if (featureId) setActiveTab(featureId);
    try {
      sessionStorage.setItem('lectura_entered_app', 'true');
      
      // Onboarding HANYA muncul saat pertama kali pengguna masuk ke aplikasi
      const completed = localStorage.getItem('lectura_onboarding_completed');
      if (!completed) {
        setTimeout(() => {
          setShowOnboarding(true);
        }, 350);
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setInApp(false);
    try {
      sessionStorage.removeItem('lectura_entered_app');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If on Landing Page (first view)
  if (!inApp) {
    return (
      <LandingPage 
        onEnterApp={() => handleEnterApp()}
        onOpenFeature={(featureId) => handleEnterApp(featureId)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Minimalist Top Header with Onboarding Button & Back to Landing */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOnboarding={() => setShowOnboarding(true)}
        onBackToLanding={handleBackToLanding}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Minimalist Hero Section */}
        <HeroSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Active Feature Module Card */}
        <div className="transition-all duration-300">
          {activeTab === 'deconstruct' && <NoteDeconstructor />}
          {activeTab === 'trap' && <TrapPredictor />}
          {activeTab === 'cram' && <CramPlan />}
          {activeTab === 'feynman' && <FeynmanExplainer />}
        </div>

      </main>

      {/* Minimalist Clean Footer */}
      <Footer />

      {/* Interactive Mobile-Friendly Onboarding Walkthrough */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onSelectFeature={(featureId) => {
          setActiveTab(featureId);
          setShowOnboarding(false);
        }}
      />
      
    </div>
  );
}
