"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
// import { useAuthStore } from "@/store/AuthStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // const { user, login, logout } = useAuthStore();
  const router = useRouter();

  return (
    <nav className="sticky z-20 h-12 inset-x-0 top-0 w-full backdrop-blur-lg transition-all print:hidden">
      <div className="flex h-14 items-center justify-center flex-row w-full px-8">
        <div className="flex flex-row gap-4 mr-auto"></div>
        <div className="h-full flex items-center"  id="onboarding-home-button">
          <Link
            href="/"
            className={buttonVariants({
              className: "text-lg font-semibold",
              variant: "ghost",
            })}
          >
            Home
          </Link>

          {/*<Link
            href="/"
            onClick={() => {
              logout();
            }}
            className={buttonVariants({
              className: "text-lg",
              variant: "default",
            })}
          >
            Logout
          </Link>*/}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
