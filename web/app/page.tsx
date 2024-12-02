"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BrainIcon, MessageSquare, ShieldIcon } from "lucide-react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container relative mx-auto flex min-h-[90vh] items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-6xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-7xl">
            EduLink
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Your all-in-one platform for learning, collaborating, and sharing
            resources with your classmates and tutors.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <Image
            src="/app-mockup.svg"
            alt="App Preview"
            width={1200}
            height={800}
          />
        </motion.div>
      </div>
      <motion.section
        id="features"
        className="py-12 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              What Makes Us Different
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="rounded-xl border bg-card p-4"
              >
                <div className="flex gap-4 items-start justify-start">
                  <div className="my-4 rounded-lg">{feature.icon}</div>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="experience"
        className="py-12 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Seamless Learning Experience
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Transform your educational journey with our intuitive platform
              using the trained AI assistant meant for each of your courses
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Image
              src="/app-mockup2.svg"
              alt="Learning Experience"
              width={1200}
              height={800}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="stats"
        className="py-12 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="mb-2 text-5xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-lg text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        id="start"
        className="py-12 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="mb-6 text-4xl font-bold">Join Our Community!</h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Connect with students from your university that share the same
              courses
            </p>
            <Button
              className={buttonVariants({
                variant: "default",
                className: "bg-primary-light text-primary-white",
              })}
            >
              Start Learning
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-2xl"
          >
            <Image
              src="/app-mockup.svg"
              alt="Community Preview"
              width={1200}
              height={800}
            />
          </motion.div>
        </div>
      </motion.section>

      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">EduLink</h3>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduLink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: "All in One",
    description: "Your files, notes, and chat history in one place.",
  },

  {
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: "Group Conversations",
    description: "Chat with your course classmates and tutors.",
  },
  {
    icon: <BrainIcon className="h-12 w-12 text-primary" />,
    title: "AI-Powered Learnig",
    description: "Leverage AI to improve your learning experience.",
  },
  {
    icon: <ShieldIcon className="h-12 w-12 text-primary" />,
    title: "Security & Privacy",
    description: "Your data is safe with us.",
  },
];

const stats = [
  { value: "30+", label: "Beta Users" },
  { value: "10+", label: "Supported Courses" },
  { value: "4.8", label: "App Store Rating" },
];
export default LandingPage;
