import type { MouseEvent } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import {
  useIsProfileSelected,
  useSelectedProfileActions,
} from "@/store/selectedProfilesStore";

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
  const isSelected = useIsProfileSelected(profile, platform);
  const isDisabled = !platform || isSelected;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    if (platform) {
      addProfile(profile, platform);
    }
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`px-3 py-1 text-sm rounded ${
        isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
      onClick={handleClick}
    >
      {isSelected ? "Added" : "Add to List"}
    </button>
  );
}
