import { beforeEach, describe, expect, it } from "vitest";
import type { Platform, UserProfileSummary } from "@/types";
import { useSelectedProfilesStore } from "./selectedProfilesStore";

function createProfile(overrides: Partial<UserProfileSummary> = {}): UserProfileSummary {
  return {
    user_id: "1",
    username: "creator",
    url: "https://example.com",
    picture: "https://example.com/avatar.jpg",
    fullname: "Creator Name",
    is_verified: true,
    followers: 120000,
    ...overrides,
  };
}

describe("selected profiles store", () => {
  beforeEach(() => {
    useSelectedProfilesStore.setState({ profiles: [] });
    localStorage.clear();
  });

  it("prevents adding the same profile twice and removes it cleanly", () => {
    const profile = createProfile();
    const platform: Platform = "instagram";

    useSelectedProfilesStore.getState().addProfile(profile, platform);
    useSelectedProfilesStore.getState().addProfile(profile, platform);

    expect(useSelectedProfilesStore.getState().profiles).toHaveLength(1);

    useSelectedProfilesStore.getState().removeProfile({
      platform,
      user_id: profile.user_id,
      username: profile.username,
    });

    expect(useSelectedProfilesStore.getState().profiles).toHaveLength(0);
  });

  it("persists profiles to localStorage", () => {
    useSelectedProfilesStore.getState().addProfile(createProfile(), "instagram");

    const storedValue = localStorage.getItem("wobb-selected-profiles");

    expect(storedValue).toContain("creator");
    expect(storedValue).toContain("instagram");
  });
});
