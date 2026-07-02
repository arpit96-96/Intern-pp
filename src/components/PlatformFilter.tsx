import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => {
          const isSelected = selected === p;

          return (
            <button
              key={p}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(p)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "border-violet-500 bg-violet-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:text-violet-700"
              }`}
            >
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>
      <label className="relative block">
        <span className="sr-only">Search creators</span>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          ⌕
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </label>
    </div>
  );
}
