import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { MouseEvent } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import {
  useIsProfileSelected,
  useSelectedProfileActions,
} from "@/store/selectedProfilesStore";
import { useToastStore } from "@/store/toastStore";

interface AddToListButtonProps {
  profile: UserProfileSummary;
  platform: Platform | null;
  stopPropagation?: boolean;
}

export function AddToListButton({
  profile,
  platform,
  stopPropagation = false,
}: AddToListButtonProps) {
  const { addProfile } = useSelectedProfileActions();
  const notify = useToastStore((state) => state.notify);
  const isSelected = useIsProfileSelected(profile, platform);
  const isDisabled = !platform || isSelected;
  const Icon = isSelected ? Check : Plus;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    if (!platform || isSelected) return;

    addProfile(profile, platform);
    notify({
      title: "Added to shortlist",
      description: `@${profile.username} is ready for review.`,
    });
  };

  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      aria-pressed={isSelected}
      whileHover={isDisabled ? undefined : { y: -2, scale: 1.02 }}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-300/50 ${
        isDisabled
          ? "cursor-not-allowed border-white/10 bg-white/8 text-slate-400"
          : "border-cyan-300/30 bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300/20"
      }`}
      onClick={handleClick}
    >
      <Icon className="h-4 w-4" aria-hidden />
      <span>{isSelected ? "Added" : platform ? "Shortlist" : "Unavailable"}</span>
    </motion.button>
  );
}
