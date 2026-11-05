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

export default function Home() {
  const [activeTab, setActiveTab] = useState('deconstruct');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show onboarding for first-time visitors
    try {
      const hasSeen = localStorage.getItem('lectura_onboarding_completed');
      if (!hasSeen) {
        // Small delay for smooth render
        const timer = setTimeout(() => setShowOnboarding(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Minimalist Top Header with Onboarding Button */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOnboarding={() => setShowOnboarding(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
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
