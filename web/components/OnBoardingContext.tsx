
'use client';

import React, { createContext, useState, useContext } from 'react';

interface OnboardingContextProps {
    isOnboarding: boolean;
    startOnboarding: () => void;
    stopOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOnboarding, setIsOnboarding] = useState(false);

    const startOnboarding = () => setIsOnboarding(true);
    const stopOnboarding = () => setIsOnboarding(false);

    return (
        <OnboardingContext.Provider value={{ isOnboarding, startOnboarding, stopOnboarding }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
