import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Platform,
  ProfileKey,
  SelectedProfile,
  UserProfileSummary,
} from "@/types";

function getProfileKey(
  platform: Platform,
  profile: Pick<UserProfileSummary, "user_id" | "username">
): ProfileKey {
  return `${platform}:${profile.user_id || profile.username}`;
}

interface SelectedProfilesState {
  profiles: SelectedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (
    profile: Pick<SelectedProfile, "platform" | "user_id" | "username">
  ) => void;
  clearProfiles: () => void;
  isProfileSelected: (
    profile: Pick<UserProfileSummary, "user_id" | "username">,
    platform: Platform
  ) => boolean;
}

export const useSelectedProfilesStore = create<SelectedProfilesState>()(
  persist(
    (set, get) => ({
      profiles: [],
      addProfile: (profile, platform) =>
        set((state) => {
          if (get().isProfileSelected(profile, platform)) {
            return state;
          }

          return {
            profiles: [
              ...state.profiles,
              {
                ...profile,
                platform,
                selectedAt: new Date().toISOString(),
              },
            ],
          };
        }),
      removeProfile: (profile) =>
        set((state) => ({
          profiles: state.profiles.filter(
            (selectedProfile) =>
              getProfileKey(selectedProfile.platform, selectedProfile) !==
              getProfileKey(profile.platform, profile)
          ),
        })),
      clearProfiles: () => set({ profiles: [] }),
      isProfileSelected: (profile, platform) => {
        const key = getProfileKey(platform, profile);

        return get().profiles.some(
          (selectedProfile) =>
            getProfileKey(selectedProfile.platform, selectedProfile) === key
        );
      },
    }),
    {
      name: "wobb-selected-profiles",
      version: 1,
    }
  )
);

export function useSelectedProfiles() {
  return useSelectedProfilesStore((state) => state.profiles);
}

export function useSelectedProfileActions() {
  const addProfile = useSelectedProfilesStore((state) => state.addProfile);
  const removeProfile = useSelectedProfilesStore((state) => state.removeProfile);
  const clearProfiles = useSelectedProfilesStore((state) => state.clearProfiles);

  return { addProfile, removeProfile, clearProfiles };
}

export function useIsProfileSelected(
  profile: Pick<UserProfileSummary, "user_id" | "username">,
  platform: Platform | null
) {
  return useSelectedProfilesStore((state) =>
    platform ? state.isProfileSelected(profile, platform) : false
  );
}
