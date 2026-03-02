'use client';

import { useState, useEffect } from 'react';
import { Bot, CheckCircle2 } from "lucide-react";

// Typewriter effect component
function TypewriterText({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayedText}</span>;
}

// Animated AI Chat Demo
export function AIChatDemoAnimated() {
  const [step, setStep] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [showClinics, setShowClinics] = useState(false);
  const [showNotListed, setShowNotListed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 0) {
        setStep(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleQuestionComplete = () => {
    setTimeout(() => {
      setShowResponse(true);
      setStep(2);
    }, 400);
  };

  const handleResponseComplete = () => {
    setTimeout(() => {
      setShowClinics(true);
    }, 300);
  };

  useEffect(() => {
    if (showClinics) {
      const timer = setTimeout(() => {
        setShowNotListed(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showClinics]);

  useEffect(() => {
    if (showNotListed) {
      const timer = setTimeout(() => {
        setStep(0);
        setShowResponse(false);
        setShowClinics(false);
        setShowNotListed(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotListed]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
      <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">AI Assistant</p>
            <p className="text-primary-light text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 min-h-[320px]">
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
              <p className="text-sm">
                {step === 0 ? (
                  "What's the best dental implant clinic in Miami?"
                ) : (
                  <TypewriterText 
                    text="What's the best dental implant clinic in Miami?" 
                    speed={40}
                    onComplete={handleQuestionComplete}
                  />
                )}
              </p>
            </div>
          </div>
          
          {showResponse && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm">
                  <TypewriterText 
                    text="Here are the top-rated dental implant clinics in Miami:"
                    speed={25}
                    onComplete={handleResponseComplete}
                  />
                </p>
                
                {showClinics && (
                  <div className="space-y-2 mt-3">
                    <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm animate-in fade-in slide-in-from-left-2 duration-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-gray-800">Competitor A Dental Group</span>
                        <span className="ml-auto text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Top Rated</span>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm animate-in fade-in slide-in-from-left-2 duration-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-gray-800">Competitor B Smile Center</span>
                      </div>
                    </div>
                    
                    {showNotListed && (
                      <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 opacity-60 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-gray-300"></span>
                          <span className="font-medium text-gray-400">Your Clinic (Not Listed)</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple static version for SSR
export function AIChatDemo() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
      <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">AI Assistant</p>
            <p className="text-primary-light text-xs">Online</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50">
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
              <p className="text-sm">What&apos;s the best dental implant clinic in Miami?</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-2">Here are the top-rated dental implant clinics in Miami:</p>
              <div className="space-y-2">
                <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-800">Competitor A Dental Group</span>
                    <span className="ml-auto text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Top Rated</span>
                  </div>
                </div>
                <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-800">Competitor B Smile Center</span>
                  </div>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 opacity-60">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-gray-300"></span>
                    <span className="font-medium text-gray-400">Your Clinic (Not Listed)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
