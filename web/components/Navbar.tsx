import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import ThemeSwitch from "@/components/theme-switch";
import { trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import {
  AlertCircle,
  BadgeHelp,
  Calendar,
  HomeIcon,
  LogIn,
  LogOut,
  UserCog,
  UserPen,
  UserPlus,
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { AppSidebar } from "./ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

const ITEMS_AUTH = [
  {
    title: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: ChatBubbleIcon,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Support",
    href: "/support",
    icon: BadgeHelp,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: UserCog,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserPen,
  },
];

const ITEMS_UNAUTH = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "Features",
    href: "#features",
    icon: ChatBubbleIcon,
  },
  {
    title: "Statistics",
    href: "#stats",
    icon: Calendar,
  },
  {
    title: "Start Learning",
    href: "#start",
    icon: UserCog,
  },

  {
    title: "Support Learning",
    href: "/support",
    icon: UserCog,
  },
  {
    title: "Login",
    href: "/sign-in",
    icon: LogIn,
  },
  {
    title: "Sign Up",
    href: "/sign-up",
    icon: UserPlus,
  },
];

const Navbar = async () => {
  const currUser = await currentUser();

  const userRoles = await trpc.profiles.roles();

  return (
    <>
      <div className="hidden lg:block">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <nav className="sticky z-20 h-16 inset-x-0 top-0 w-full backdrop-blur-lg transition-all">
            <div className="flex h-16 items-center justify-between flex-row w-full px-8">
              <div className="flex flex-row gap-4 text-primary-light justify-center items-center font-bold text-2xl">
                <Link
                  href={`${currUser ? "/home" : "/"}`}
                  className="flex gap-2 items-center justify-center"
                >
                  <Image
                    src={"/logo.png"}
                    alt={"Logo"}
                    width={80}
                    height={80}
                  />
                  EduLink
                </Link>
              </div>
              <div className="h-full flex items-center">
                {/* @ts-ignore*/}
                <SignedIn>
                  {ITEMS_AUTH.map((item) => {
                    if (item.title === "Admin") {
                      if (!Boolean(userRoles.admin)) {
                        return null;
                      }
                    }
                    if (item.title === "Logout" || item.title === "Profile") {
                      return null;
                    }

                    return (
                      <NavLink href={item.href} key={item.href}>
                        <item.icon />
                        {item.title}
                      </NavLink>
                    );
                  })}
                </SignedIn>
                {/* @ts-ignore*/}
                <SignedOut>
                  {ITEMS_UNAUTH.map((item) => {
                    if (item.title === "Login" || item.title === "Sign Up") {
                      return null;
                    }

                    return (
                      <NavLink href={item.href} key={item.href}>
                        <item.icon />
                        {item.title}
                      </NavLink>
                    );
                  })}
                </SignedOut>
              </div>
              <div className="h-full flex items-center gap-4">
                <ThemeSwitch />
                {/* @ts-ignore*/}
                <SignedIn>
                  <NavLink href="/profile">Profile</NavLink>
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

                {/* @ts-ignore*/}
                <SignedOut>
                  <div className="flex gap-4">
                    <NavLink href="/sign-in" variant="ghost">
                      <LogIn />
                      Login
                    </NavLink>
                    <NavLink
                      href="/sign-up"
                      className="bg-primary-light text-white"
                      variant="default"
                    >
                      <UserPlus />
                      Sign Up
                    </NavLink>
                  </div>
                </SignedOut>
              </div>
            </div>
          </nav>
        </ErrorBoundary>
      </div>
      <div className="block md:hidden lg:hidden">
        <SidebarProvider>
          <nav className="sticky z-20 h-16 inset-x-0 top-0 w-full backdrop-blur-lg transition-all">
            <div className="flex flex-row-reverse justify-between items-start border-b pr-8">
              <div className="flex flex-row gap-4 text-primary-light justify-center items-center font-bold text-lg">
                <Link
                  href={`${currUser ? "/home" : "/"}`}
                  className="flex gap-2 items-center justify-center"
                >
                  <Image
                    src={"/logo.png"}
                    alt={"Logo"}
                    width={44}
                    height={44}
                  />
                  EduLink
                </Link>
              </div>
              <SidebarTrigger />
            </div>
            <AppSidebar
              items={!!currUser ? ITEMS_AUTH : ITEMS_UNAUTH}
              roles={userRoles}
            />
          </nav>
        </SidebarProvider>
      </div>
    </>
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

const ErrorFallback = () => (
  <div className="flex items-center justify-center h-16 bg-red-100 text-red-500">
    <AlertCircle className="mr-2" />
    <span>An error occurred. Please try again later.</span>
  </div>
);

export default Navbar;
