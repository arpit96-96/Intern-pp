import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AddToListButton } from "@/components/AddToListButton";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { getPlatformLabel, isPlatform } from "@/utils/dataHelpers";
import { formatCompactNumber, formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";

interface ProfileDetailState {
  username: string | null;
  data: ProfileDetailResponse | null;
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platformParam = searchParams.get("platform");
  const platform = isPlatform(platformParam) ? platformParam : null;
  const [profileState, setProfileState] = useState<ProfileDetailState>({
    username: null,
    data: null,
  });

  useEffect(() => {
    if (!username) return;
    let isCurrent = true;

    loadProfileByUsername(username).then((data) => {
      if (isCurrent) {
        setProfileState({ username, data });
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  const loaded = profileState.username === username;
  const profileData = loaded ? profileState.data : null;

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-gray-400">Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout title={user.fullname}>
      <Link to="/" className="text-sm text-blue-600 mb-4 inline-block">
        &lt;- Back to search
      </Link>

      <div className="flex gap-6 items-start text-left max-w-2xl mx-auto">
        <img
          src={user.picture}
          alt={user.fullname}
          className="w-24 h-24 rounded-full border"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-gray-600">{user.fullname}</p>
          <p className="text-xs text-gray-400 mt-1">
            Platform: {platform ? getPlatformLabel(platform) : "Unknown"}
          </p>

          {user.description && (
            <p className="mt-3 text-sm text-gray-700">{user.description}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border p-2 rounded">
              <div className="text-gray-500">Followers</div>
              <div className="font-semibold">
                {formatCompactNumber(user.followers)}
              </div>
            </div>
            <div className="border p-2 rounded">
              <div className="text-gray-500">Engagement Rate</div>
              <div className="font-semibold">
                {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Posts</div>
                <div className="font-semibold">{user.posts_count}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Avg Likes</div>
                <div className="font-semibold">
                  {formatCompactNumber(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Avg Comments</div>
                <div className="font-semibold">{user.avg_comments}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Avg Views</div>
                <div className="font-semibold">
                  {formatCompactNumber(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border p-2 rounded">
                <div className="text-gray-500">Engagements</div>
                <div className="font-semibold">
                  {formatCompactNumber(user.engagements)}
                </div>
              </div>
            )}
          </div>

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-blue-600 text-sm"
            >
              View on platform -&gt;
            </a>
          )}

          <div className="mt-4">
            <AddToListButton profile={user} platform={platform} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
