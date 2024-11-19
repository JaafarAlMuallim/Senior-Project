"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AppleIcon, BrainIcon, MessageSquare, ShieldIcon } from "lucide-react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative min-h-[90vh] overflow-hidden">
        <nav className="absolute top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"></nav>

        <div className="container relative mx-auto flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-6xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-7xl">
              meow ai app
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              do your best with ai
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 w-full max-w-5xl"
          >
            <Image
              src="/app-preview.png"
              alt="App Preview"
              width={1200}
              height={800}
              className="rounded-xl border shadow-2xl"
            />
          </motion.div>
        </div>
      </header>

      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              best app ever
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              big moew
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="rounded-xl border bg-card p-8"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/10 py-24">
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
      </section>
    </div>
  );
};

const features = [
  {
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
  },

  {
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: "Group Conversations",
    description: "",
  },
  {
    icon: <BrainIcon className="h-12 w-12 text-primary" />,
    title: "AI-Powered learinig",
    description: "",
  },
  {
    icon: <ShieldIcon className="h-12 w-12 text-primary" />,
    title: "meow",
    description: "",
  },
];

const stats = [
  { value: "1M+", label: "Active Users" },
  { value: "50K+", label: "Daily Conversations" },
  { value: "4.8", label: "App Store Rating" },
];
export default LandingPage;
