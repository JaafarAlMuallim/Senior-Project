'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from './ui/dialog';
import { useRouter, usePathname } from 'next/navigation';
import OnboardingStep from './OnBoardingStep';
import { useOnboarding } from '@/components/OnBoardingContext';

interface StepContent {
    targetId: string;
    title: string;
    content: string;
    pageUrl?: string;
}

const Onboarding: React.FC = () => {
    const { isOnboarding, stopOnboarding } = useOnboarding();
    const [step, setStep] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    const steps: StepContent[] = [
        {
            targetId: 'onboarding-home',
            title: 'Home page',
            content: 'Here you can see the courses folders under My Courses.',
            pageUrl: '/home',
        },
        {
            targetId: 'onboarding-home-schedule',
            title: 'Schedule',
            content: 'Here you can see your schedule.',
            pageUrl: '/home',
        },
        {
            targetId: 'onboarding-home-sessions',
            title: 'sessions',
            content: 'In this section, you can see your upcoming sessions.',
            pageUrl: '/home',
        },
        {
            targetId: 'onboarding-home-button',
            title: 'Home page button',
            content: 'you can navigate to the home page any time by just clicking this button.',
            pageUrl: '/home',
        },
        {
            targetId: 'onboarding-profile',
            title: 'Edit your profile',
            content: 'you can edit your profile from here, you can see courses and tutoring details in this page as well.',
            pageUrl: '/profile',
        },
        {
            targetId: 'onboarding-schedule',
            title: 'Schedule',
            content: 'Start building your schedule, you can filter courses from here',
            pageUrl: '/schedule',
        },
        {
            targetId: 'onboarding-schedule-courses',
            title: 'Add courses',
            content: 'Here you will see filtered courses, you can add courses from here to your schedule',
            pageUrl: '/schedule',
        },
        {
            targetId: 'onboarding-chat',
            title: 'Get support in your courses',
            content: 'In this chat section, you can contact with AI to get support. In this place you will see chatting sections for courses you are enrolled in.',
            pageUrl: '/chat',
        },
        {
            targetId: 'onboarding-chat-AI',
            title: 'AI chatting',
            content: 'Here you can write and chat with the AI assitent.',
            pageUrl: '/chat',
        },
        {
            targetId: 'onboarding-booking',
            title: 'Book tutoring session',
            content: 'You can request a tutoring session with our tutors.',
            pageUrl: '/booking',
        },
        {
            targetId: 'onboarding-tutoring',
            title: 'Apply to be a tutor',
            content: 'Be a tutor and help other students in courses you are expert by applying here.',
            pageUrl: '/tutoring',
        },
    ];

    const currentStep = steps[step];

    useEffect(() => {
        if (isOnboarding && currentStep?.pageUrl && currentStep.pageUrl !== pathname) {
            router.push(currentStep.pageUrl);
        }
    }, [isOnboarding, currentStep, router, pathname]);

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep((prev) => prev + 1);
        } else {
            stopOnboarding();
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
        }
    };

    if (!isOnboarding || !currentStep) return null;

    return (
        <Dialog open>
            <OnboardingStep
                stepContent={currentStep}
                onNext={handleNext}
                onBack={handleBack}
                isFirstStep={step === 0}
                isLastStep={step === steps.length - 1}
            />
        </Dialog>
    );
};

export default Onboarding;
