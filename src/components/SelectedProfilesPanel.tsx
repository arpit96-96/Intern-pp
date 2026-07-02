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
    <section className="border rounded p-3 mb-4 text-left">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-base font-semibold m-0">
          Selected List ({profiles.length})
        </h2>
        {profiles.length > 0 && (
          <button
            type="button"
            className="text-xs text-red-600 underline"
            onClick={clearProfiles}
          >
            Clear all
          </button>
        )}
      </div>

      {profiles.length === 0 ? (
        <p className="text-sm text-gray-500">No profiles selected yet.</p>
      ) : (
        <ul className="space-y-2">
          {profiles.map((profile) => (
            <li
              key={profile.selectedAt}
              className="flex items-center justify-between gap-3 border-t pt-2"
            >
              <Link
                to={`/profile/${profile.username}?platform=${profile.platform}`}
                className="min-w-0"
              >
                <span className="block text-sm font-semibold truncate">
                  @{profile.username}
                </span>
                <span className="block text-xs text-gray-500">
                  {getPlatformLabel(profile.platform)} -{" "}
                  {formatFollowerCount(profile.followers)}
                </span>
              </Link>
              <button
                type="button"
                className="text-xs text-red-600 underline"
                onClick={() => removeProfile(profile)}
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
