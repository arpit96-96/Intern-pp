import { useEffect, useMemo, useState } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { SelectedProfilesPanel } from "@/components/SelectedProfilesPanel";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState<UserProfileSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(() => {
      if (!active) return;

      setIsLoading(true);
      setError(null);

      try {
        setProfiles(extractProfiles(platform));
        setIsLoading(false);
      } catch {
        setError(`We couldn’t load profiles for ${platform} right now.`);
        setIsLoading(false);
      }
    }, 220);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [platform]);

  const filteredProfiles = useMemo(
    () => filterProfiles(profiles, searchQuery),
    [profiles, searchQuery]
  );

  return (
    <Layout
      title="Find influencers"
      subtitle="Browse top creators across Instagram, YouTube and TikTok before building your shortlist."
    >
      <div className="grid gap-6 xl:grid-cols-[1.65fr_0.95fr]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
                  Discover talent
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Search creators and add the best matches to your shortlist.
                </h2>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <div className="font-semibold text-slate-900">{profiles.length}</div>
                <div>Profiles available</div>
              </div>
            </div>

            <div className="mt-5">
              <PlatformFilter
                selected={platform}
                onChange={(p) => {
                  setPlatform(p);
                  setSearchQuery("");
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
              <p>
                {isLoading
                  ? "Loading creators..."
                  : `${filteredProfiles.length} profiles match your search.`}
              </p>
              <p className="rounded-full bg-slate-100 px-3 py-1">
                Showing {filteredProfiles.length} of {profiles.length} on {platform}
              </p>
            </div>
          </div>

          <ProfileList
            profiles={filteredProfiles}
            platform={platform}
            isLoading={isLoading}
            isError={Boolean(error)}
            emptyMessage="No creators matched your search yet. Try a broader keyword."
          />
        </section>

        <aside className="xl:sticky xl:top-4 xl:self-start">
          <SelectedProfilesPanel />
        </aside>
      </div>
    </Layout>
  );
}
