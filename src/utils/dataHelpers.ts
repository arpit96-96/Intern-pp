import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

type RawUserProfileSummary = Omit<UserProfileSummary, "username"> & {
  username?: string;
};

interface RawSearchData {
  total: number;
  accounts: Array<{
    account: {
      user_profile: RawUserProfileSummary;
      audience_source: string;
    };
  }>;
}

export const PLATFORMS = ["instagram", "youtube", "tiktok"] as const;

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const platformData = {
  instagram: instagramData,
  youtube: youtubeData,
  tiktok: tiktokData,
} satisfies Record<Platform, RawSearchData>;

function normalizeProfile(profile: RawUserProfileSummary): UserProfileSummary {
  return {
    ...profile,
    username: profile.username ?? profile.handle ?? profile.user_id,
  };
}

export function getSearchData(platform: Platform): SearchData {
  const data = platformData[platform];

  return {
    total: data.total,
    accounts: data.accounts.map((item) => ({
      account: {
        audience_source: item.account.audience_source,
        user_profile: normalizeProfile(item.account.user_profile),
      },
    })),
  };
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => item.account.user_profile);
}

export function findProfileSummaryByUsername(
  username: string,
  platform: Platform | null
): UserProfileSummary | null {
  const normalizedUsername = username.toLowerCase();
  const platforms = platform ? [platform] : PLATFORMS;

  for (const currentPlatform of platforms) {
    const profile = extractProfiles(currentPlatform).find((item) => {
      const usernameMatches =
        item.username.toLowerCase() === normalizedUsername;
      const handleMatches = item.handle?.toLowerCase() === normalizedUsername;

      return usernameMatches || handleMatches;
    });

    if (profile) {
      return profile;
    }
  }

  return null;
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return profiles;

  return profiles.filter((p) => {
    const matchUsername = p.username.toLowerCase().includes(normalizedQuery);
    const matchFullname = p.fullname.toLowerCase().includes(normalizedQuery);
    const matchHandle = p.handle?.toLowerCase().includes(normalizedQuery);

    return matchUsername || matchFullname || Boolean(matchHandle);
  });
}

export function getPlatformLabel(platform: Platform): string {
  return PLATFORM_LABELS[platform];
}

export function isPlatform(value: string | null): value is Platform {
  return PLATFORMS.includes(value as Platform);
}
