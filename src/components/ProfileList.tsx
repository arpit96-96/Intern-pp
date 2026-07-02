import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
}

export function ProfileList({
  profiles,
  platform,
  isLoading = false,
  isError = false,
  emptyMessage = "No profiles found for this search yet.",
}: ProfileListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-52 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        We couldn’t load this creator list right now. Please try again in a moment.
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-500 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {profiles.map((profile) => (
        <ProfileCard key={profile.user_id} profile={profile} platform={platform} />
      ))}
    </div>
  );
}
