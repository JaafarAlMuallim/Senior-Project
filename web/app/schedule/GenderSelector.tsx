"use client";

import { useState, useCallback, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface GenderSelectorProps {
  gender: string;
  setGender: (value: string) => void;
}

export const GenderSelector = ({ gender, setGender }: GenderSelectorProps) => {
  const [localGender, setLocalGender] = useState<string>(gender);
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (value: string) => {
      setLocalGender(value);
      setOpen(false);
      // Debounce the update to parent component
      setTimeout(() => setGender(value), 100);
    },
    [setGender],
  );

  useEffect(() => {
    setLocalGender(gender);
  }, [gender]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-28 justify-between capitalize")}
        >
          {localGender}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-28 p-0">
        <Command>
          <CommandList>
            {["male", "female"].map((value) => (
              <CommandItem
                key={value}
                onSelect={() => handleSelect(value)}
                className="capitalize"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    localGender === value ? "opacity-100" : "opacity-0",
                  )}
                />
                {value}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// import { Check, ChevronsUpDown } from "lucide-react";
//
// import { Button } from "@/components/ui/button";
// import { Command, CommandItem, CommandList } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
//
// export const GenderSelector = ({
//   gender,
//   setGender,
// }: {
//   gender: string;
//   setGender: (value: string) => void;
// }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           className={cn("w-28 justify-between capitalize")}
//         >
//           {gender}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-28 p-0">
//         <Command>
//           <CommandList>
//             {["male", "female"].map((value) => (
//               <CommandItem
//                 key={value}
//                 onSelect={() => setGender(value)}
//                 className="capitalize"
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     gender === value ? "opacity-100" : "opacity-0",
//                   )}
//                 />
//                 {value}
//               </CommandItem>
//             ))}
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };
