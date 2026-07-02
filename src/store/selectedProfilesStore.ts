import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Platform,
  ProfileKey,
  SelectedProfile,
  UserProfileSummary,
} from "@/types";

export function getProfileKey(
  platform: Platform,
  profile: Pick<UserProfileSummary, "user_id" | "username">
): ProfileKey {
  return `${platform}:${profile.user_id || profile.username}`;
}

interface SelectedProfilesState {
  profiles: SelectedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (key: ProfileKey) => void;
  clearProfiles: () => void;
}

export const useSelectedProfilesStore = create<SelectedProfilesState>()(
  persist(
    (set) => ({
      profiles: [],
      addProfile: (profile, platform) =>
        set((state) => {
          const key = getProfileKey(platform, profile);
          const alreadySelected = state.profiles.some(
            (selectedProfile) =>
              getProfileKey(selectedProfile.platform, selectedProfile) === key
          );

          if (alreadySelected) {
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
      removeProfile: (key) =>
        set((state) => ({
          profiles: state.profiles.filter(
            (profile) => getProfileKey(profile.platform, profile) !== key
          ),
        })),
      clearProfiles: () => set({ profiles: [] }),
    }),
    {
      name: "wobb-selected-profiles",
      version: 1,
    }
  )
);
