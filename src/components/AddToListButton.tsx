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
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-600 shadow-slate-200/60"
          : "border-slate-950 bg-slate-950 text-white shadow-slate-950/20 hover:bg-slate-800"
      }`}
      onClick={handleClick}
    >
      <Icon className="h-4 w-4" aria-hidden />
      <span>{isSelected ? "Added" : platform ? "Shortlist" : "Unavailable"}</span>
    </motion.button>
  );
}
