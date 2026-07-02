import type { ProfileDetailResponse } from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json",
  { import: "default" }
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (!loader) {
    return null;
  }

  return loader();
}
