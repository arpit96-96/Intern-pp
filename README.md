# Influencer Compass

Influencer Compass is a React + TypeScript influencer discovery dashboard built for the Wobb frontend assignment. It helps users browse creators across Instagram, YouTube, and TikTok, inspect profile details, and maintain a persistent shortlist of selected profiles.

The app has been refactored from the starter code into a more production-ready frontend with stronger typing, cleaner state management, improved UI states, accessibility fixes, and regression coverage for shortlist behavior.

## Live Workflow

Users can:

- Browse creators by platform.
- Search creators by username, display name, or handle.
- Open a creator detail page.
- Add creators to a persistent shortlist.
- Avoid duplicate shortlist entries.
- Remove individual shortlisted creators.
- Clear the full shortlist.
- Keep shortlist state after page reloads through localStorage.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand for global shortlist state
- Framer Motion for UI animation
- Lucide React for icons
- clsx and tailwind-merge for class composition
- Vitest and jsdom for regression tests
- React Router for client-side routing

## Architecture

```text
src/
  App.tsx
  main.tsx
  index.css

  components/
    AddToListButton.tsx
    Layout.tsx
    PlatformFilter.tsx
    ProfileCard.tsx
    ProfileList.tsx
    SelectedProfilesPanel.tsx
    ToastViewport.tsx
    VerifiedBadge.tsx

  pages/
    SearchPage.tsx
    ProfileDetailPage.tsx

  store/
    selectedProfilesStore.ts
    selectedProfilesStore.test.ts
    toastStore.ts

  utils/
    dataHelpers.ts
    formatters.ts
    profileLoader.ts

  lib/
    cn.ts
    motion.ts

  types/
    index.ts

  assets/
    data/
      search/
      profiles/
```

## Key Engineering Decisions

### Zustand instead of React Context

The selected-list workflow uses Zustand rather than React Context. This keeps global state lightweight, avoids unnecessary provider nesting, and gives components direct access to focused selectors and actions.

The store exposes a small API:

- `useSelectedProfiles`
- `useSelectedProfileActions`
- `useIsProfileSelected`

Profile key generation and duplicate detection are private implementation details inside the store.

### Persistent shortlist

The shortlist uses Zustand persistence with localStorage. This is appropriate for a self-contained assignment app because it preserves user intent across reloads without adding backend complexity.

### Data normalization

The search JSON contains a few records without a `username`. `dataHelpers.ts` normalizes these records using `username`, then `handle`, then `user_id` as a fallback. Components receive a consistent `UserProfileSummary` shape.

### Detail fallback

Not every search result has a matching detail JSON file. The profile detail page first attempts to load the full profile file. If it does not exist, it falls back to the normalized search summary so users do not hit a broken experience.

### Component structure

The UI is composed from reusable, focused components:

- `Layout` owns the app frame.
- `PlatformFilter` owns platform chips and search input.
- `ProfileList` owns loading, empty, error, and list rendering states.
- `ProfileCard` owns creator preview display.
- `AddToListButton` owns shortlist add interactions.
- `SelectedProfilesPanel` owns shortlist management.
- `ToastViewport` owns transient feedback.

## Features Implemented

- Fixed dependency conflict by removing deprecated `react-beautiful-dnd`.
- Added Zustand for state management.
- Added persistent shortlist with duplicate prevention.
- Implemented Add to List from both profile cards and detail pages.
- Added remove and clear actions for selected profiles.
- Added toast notifications for shortlist actions.
- Fixed engagement-rate formatting.
- Fixed engagements metric display.
- Fixed case-insensitive search.
- Added data normalization for incomplete JSON records.
- Added fallback details for profiles without detail JSON files.
- Removed stale debug logging.
- Removed unused components.
- Added missing image alt text.
- Added safe external link attributes.
- Improved responsive layout behavior.
- Added regression tests for shortlist behavior.

## UI and UX

The interface has been moved toward a premium SaaS dashboard direction:

- Dark, professional dashboard shell.
- Elevated glass panels where readability is preserved.
- Animated feedback through Framer Motion.
- Toast notifications for successful actions.
- Loading skeletons.
- Empty and error states.
- Responsive layout for mobile, tablet, and desktop.
- Keyboard-friendly buttons and links.
- Clear focus states and semantic controls.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test -- --run
```

## Local Development

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Validation

The following checks pass:

```bash
npm run build
npm run lint
npm run test -- --run
```

## Trade-offs

- Data comes from static JSON files, so it is deterministic and easy to review, but not live.
- Shortlist persistence uses localStorage, so it is device-local rather than account-based.
- The UI includes animation and premium styling while avoiding heavy 3D libraries to keep performance healthy.
- The app focuses on the core assignment workflow rather than adding a full CRM or campaign management system.

## Future Improvements

- Add richer filters such as follower range, engagement threshold, and average views.
- Add sortable shortlist ordering.
- Add end-to-end tests for the full browsing and shortlist journey.
- Replace local JSON data with an API-backed data layer.
- Add deployment metadata for Vercel, Netlify, or GitHub Pages.

## Repository Status

This repository is ready for review after running the validation commands above.
