import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import ThemeSwitch from "@/components/theme-switch"
import { trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const Navbar = async () => {
  const userRoles = await trpc.profiles.roles();
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <nav className="sticky z-20 h-16 inset-x-0 top-0 w-full backdrop-blur-lg transition-all">
        <div className="flex h-16 items-center justify-between flex-row w-full px-8">
          <div className="flex flex-row gap-4 text-primary-light justify-center items-center font-bold text-2xl">
            <Image src={"/logo.png"} alt={"Logo"} width={64} height={64} />
            EduLink
          </div>
          <div className="h-full flex items-center">
            <SignedIn>
              <NavLink href="/home">Home</NavLink>
              <NavLink href="/chat">Chat</NavLink>
              <NavLink href="/schedule">Schedule</NavLink>
              <NavLink href="/material">Material</NavLink>
              {Boolean(userRoles.admin) && (
                <NavLink href="/admin">Admin</NavLink>
              )}
            </SignedIn>
            <SignedOut>
              <NavLink href="/">Home</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#stats">Statistics</NavLink>
              <NavLink href="#start">Start Learning</NavLink>
            </SignedOut>
          </div>
          <div className="h-full flex items-center gap-4">
            <SignedIn>
              <SignOutButton>
                <Button
                  className={buttonVariants({
                    className: "font-semibold",
                    variant: "ghost",
                  })}
                >
                  Logout
                </Button>
              </SignOutButton>
            </SignedIn>

            <SignedOut>
              <div className="flex gap-4">
                <NavLink href="/sign-in" variant="ghost">
                  Login
                </NavLink>
                <NavLink
                  href="sign-up"
                  className="bg-primary-light text-white"
                  variant="default"
                >
                  Sign Up
                </NavLink>
              </div>
            </SignedOut>
           <ThemeSwitch />
          </div>
        </div>
      </nav>
    </ErrorBoundary>
  );
};

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};
const NavLink = ({
  href,
  children,
  className = "",
  variant = "ghost",
}: NavLinkProps) => (
  <Link
    href={href}
    className={buttonVariants({
      className: `font-semibold ${className}`,
      variant,
    })}
  >
    {children}
  </Link>
);

const NavbarError = () => (
  <div className="flex items-center text-red-500">
    <AlertCircle className="mr-2" />
    <span>Error loading menu</span>
  </div>
);

const ErrorFallback = () => (
  <div className="flex items-center justify-center h-16 bg-red-100 text-red-500">
    <AlertCircle className="mr-2" />
    <span>An error occurred. Please try again later.</span>
  </div>
);

export default Navbar;
