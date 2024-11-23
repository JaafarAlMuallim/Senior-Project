"use client";

import React, { useEffect, useState } from 'react';
import { DialogContent } from './ui/dialog'; 

interface OnboardingStepProps {
  stepContent: StepContent;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  stepContent,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const targetElement = document.getElementById(stepContent.targetId);
    if (targetElement) {
      setTargetRect(targetElement.getBoundingClientRect());
    }
  }, [stepContent]);

  if (!targetRect) return null;

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: targetRect.top + window.scrollY - 10,
          left: targetRect.left + window.scrollX - 10,
          width: targetRect.width + 20,
          height: targetRect.height + 20,
          border: '2px solid blue',
          borderRadius: '8px',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      />

      <DialogContent
        style={{
          position: 'absolute',
          top: (window.innerHeight  - 250) % (targetRect.bottom + 50) + window.scrollY + 150,
          left: (window.innerWidth %  (targetRect.left - 550)) + window.scrollX + 350,
          zIndex: 1000,
        }}
      >
        <h2 className="text-lg font-semibold">{stepContent.title}</h2>
        <p>{stepContent.content}</p>
        <div className="flex justify-end space-x-2 mt-4">
          {!isFirstStep && (
            <button onClick={onBack} className="btn">
              Back
            </button>
          )}
          <button onClick={onNext} className="btn btn-primary">
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </DialogContent>
    </div>
  );
};

export default OnboardingStep;
