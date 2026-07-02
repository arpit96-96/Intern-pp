import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { formatFollowerCount } from "@/utils/formatters";
import { AddToListButton } from "./AddToListButton";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
    >
      <img src={profile.picture} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowerCount(profile.followers)}</div>
      </div>
      <AddToListButton
        profile={profile}
        platform={platform}
        stopPropagation
      />
    </div>
  );
}
