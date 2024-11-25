"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  // const { user, login, logout } = useAuthStore();
  const user = null;
  const isAdmin = false;

  return (
    <nav className="sticky z-20 h-16 inset-x-0 top-0 w-full backdrop-blur-lg transition-all">
      <div className="flex h-16 items-center justify-between flex-row w-full px-8">
        <div className="flex flex-row gap-4 text-primary-light justify-center items-center font-bold text-2xl">
          <Image src={"/logo.png"} alt={"Logo"} width={64} height={64} />
          EduLink
        </div>
        <div className="h-full flex items-center">
          <SignedIn>
            <Link
              href="/"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Home
            </Link>
            <Link
              href="#features"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Chat
            </Link>
            <Link
              href="#stats"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Schedule
            </Link>
            <Link
              href="#start"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Material
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={buttonVariants({
                  className: "font-semibold",
                  variant: "ghost",
                })}
              >
                Admin
              </Link>
            )}
          </SignedIn>

          <SignedOut>
            <Link
              href="/"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Home
            </Link>
            <Link
              href="#features"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Features
            </Link>
            <Link
              href="#stats"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Statistics
            </Link>
            <Link
              href="#start"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Start Learning
            </Link>
          </SignedOut>
        </div>

        <div className="h-full flex items-center">
          <SignedIn>
            {/* <Button
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
              onClick={() => {
                // TODO: LOGOUT
              }}
            >
              Logout
            </Button> */}

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
            <Link
              href="/auth?tab=login"
              className={buttonVariants({
                className: "font-semibold",
                variant: "ghost",
              })}
            >
              Login
            </Link>
            <Link
              href="/auth?tab=register"
              className={buttonVariants({
                className: "font-semibold bg-primary-light text-white",
                variant: "default",
              })}
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
