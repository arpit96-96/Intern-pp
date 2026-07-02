import { memo } from "react";
import { Link } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { formatFollowerCount } from "@/utils/formatters";
import { AddToListButton } from "./AddToListButton";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
      <Link
        to={`/profile/${profile.username}?platform=${platform}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-sm"
        />
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">
              @{profile.username}
            </h3>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <p className="truncate text-sm text-slate-600">{profile.fullname}</p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {formatFollowerCount(profile.followers)}
          </p>
        </div>
      </Link>
      <AddToListButton profile={profile} platform={platform} stopPropagation />
    </article>
  );
});
