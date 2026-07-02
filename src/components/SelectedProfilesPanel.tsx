import { Link } from "react-router-dom";
import {
  useSelectedProfileActions,
  useSelectedProfiles,
} from "@/store/selectedProfilesStore";
import { getPlatformLabel } from "@/utils/dataHelpers";
import { formatFollowerCount } from "@/utils/formatters";

export function SelectedProfilesPanel() {
  const profiles = useSelectedProfiles();
  const { removeProfile, clearProfiles } = useSelectedProfileActions();

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
            Shortlist
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Selected profiles ({profiles.length})
          </h2>
        </div>
        {profiles.length > 0 ? (
          <button
            type="button"
            className="text-sm font-medium text-rose-600 transition hover:text-rose-700"
            onClick={clearProfiles}
            aria-label="Clear all shortlisted profiles"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {profiles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          <p className="font-medium text-slate-700">Nothing selected yet.</p>
          <p className="mt-1">Add creators as you browse to build a shortlist.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {profiles.map((profile) => (
            <li
              key={`${profile.platform}-${profile.user_id}-${profile.username}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3"
            >
              <Link
                to={`/profile/${profile.username}?platform=${profile.platform}`}
                className="min-w-0"
              >
                <span className="block truncate text-sm font-semibold text-slate-900">
                  @{profile.username}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {getPlatformLabel(profile.platform)} • {formatFollowerCount(profile.followers)}
                </span>
              </Link>
              <button
                type="button"
                className="text-sm font-medium text-rose-600 transition hover:text-rose-700"
                onClick={() => removeProfile(profile)}
                aria-label={`Remove ${profile.username} from shortlist`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
