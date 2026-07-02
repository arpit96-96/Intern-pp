import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AddToListButton } from "@/components/AddToListButton";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import {
  findProfileSummaryByUsername,
  getPlatformLabel,
  isPlatform,
} from "@/utils/dataHelpers";
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
      <Layout title="Invalid profile" subtitle="The requested profile could not be found.">
        <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 text-sm text-slate-600 shadow-sm">
          <p className="mb-4">This profile route is missing a valid username.</p>
          <Link to="/" className="font-semibold text-violet-600 hover:text-violet-700">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const loaded = profileState.username === username;
  const profileData = loaded ? profileState.data : null;
  const fallbackProfile =
    loaded && username ? findProfileSummaryByUsername(username, platform) : null;

  if (!loaded) {
    return (
      <Layout title={`@${username}`} subtitle="Loading profile details...">
        <div className="mx-auto max-w-4xl animate-fade-in rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="h-24 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-56 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-72 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData && !fallbackProfile) {
    return (
      <Layout title={`@${username}`} subtitle="We couldn’t find the requested creator.">
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
          <p className="mb-4">Could not load profile details for {username}.</p>
          <Link to="/" className="font-semibold text-rose-700 underline">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData
    ? profileData.data.user_profile
    : fallbackProfile!;

  return (
    <Layout title={user.fullname} subtitle={`@${user.username} on ${platform ? getPlatformLabel(platform) : "the web"}`}>
      <div className="mx-auto max-w-4xl animate-fade-in rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
        <Link to="/" className="mb-6 inline-flex items-center text-sm font-semibold text-violet-600 transition hover:text-violet-700">
          ← Back to search
        </Link>

        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <img
            src={user.picture}
            alt={user.fullname}
            className="h-24 w-24 rounded-full border border-slate-200 object-cover shadow-sm"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold text-slate-900">@{user.username}</h2>
              <VerifiedBadge verified={user.is_verified} />
            </div>
            <p className="mt-1 text-base text-slate-600">{user.fullname}</p>
            <p className="mt-2 text-sm text-slate-500">
              Platform: {platform ? getPlatformLabel(platform) : "Unknown"}
            </p>

            {user.description ? (
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700">
                {user.description}
              </p>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-500">Followers</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {formatCompactNumber(user.followers)}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-500">Engagement Rate</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {formatEngagementRate(user.engagement_rate)}
                </div>
              </div>
              {user.posts_count !== undefined ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-sm text-slate-500">Posts</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {user.posts_count}
                  </div>
                </div>
              ) : null}
              {user.avg_likes !== undefined ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-sm text-slate-500">Avg Likes</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {formatCompactNumber(user.avg_likes)}
                  </div>
                </div>
              ) : null}
              {user.avg_comments !== undefined ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-sm text-slate-500">Avg Comments</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {user.avg_comments}
                  </div>
                </div>
              ) : null}
              {user.avg_views !== undefined && user.avg_views > 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-sm text-slate-500">Avg Views</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {formatCompactNumber(user.avg_views)}
                  </div>
                </div>
              ) : null}
              {user.engagements !== undefined ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-sm text-slate-500">Engagements</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {formatCompactNumber(user.engagements)}
                  </div>
                </div>
              ) : null}
            </div>

            {user.url ? (
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center text-sm font-semibold text-violet-600 transition hover:text-violet-700"
              >
                View on platform →
              </a>
            ) : null}

            <div className="mt-5">
              <AddToListButton profile={user} platform={platform} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
