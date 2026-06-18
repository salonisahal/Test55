# App_RN — Screens & Navigation

## How to run
cd /home/hewlett/projects/frontend_generator_backend/frontend_generator_backend/frontend_runs/run_80f0db79_20260618_055547/project
npm install && npx expo start
# Press 'a' for Android, 'i' for iOS simulator, 'w' for web,
# or scan the QR code with the Expo Go app on a physical iOS/Android device.

## Screens
| Screen | File | Description |
|--------|------|-------------|
| Home | src/screens/HomeScreen.tsx | Hero header, subject recommendations, and next lessons list. |
| Schedule | src/screens/ScheduleScreen.tsx | Weekly calendar selector with lesson timeline. |
| Messages | src/screens/MessagesScreen.tsx | Instructor message threads list. |
| Profile | src/screens/ProfileScreen.tsx | Student profile details and preference toggles. |
| NotFound | src/screens/NotFoundScreen.tsx | Fallback screen for unknown routes. |

## Navigation map
- Home -> Schedule (tap search icon or a subject card)
- Bottom tab: Home <-> Schedule <-> Messages <-> Profile (tap tab icons)
- Any screen -> NotFound (unmatched route handled by stack)

## Shared components
- HeaderBar.tsx: Title bar with optional back and right actions.
- SubjectCard.tsx: Colored subject card with icon and kebab menu.
- LessonCard.tsx: Lesson summary card with location and teacher details.
- DayPill.tsx: Calendar day selector pill.
- SectionHeader.tsx: Section title + subtitle block.
- TimeRow.tsx: Lesson time column entry.
- TabIcon.tsx: Tab icon with label styling.
- EmptyState.tsx: Empty list placeholder.
- ScreenContainer.tsx: Root background container with web overflow handling.
- IconButton.tsx: Circular icon button.
- HeroIllustration.tsx: Decorative hero graphic placeholders.
- TodayBadge.tsx: “Today” badge button.

## Design tokens
primary, primaryDark, primaryLight, accent, background, surface, card, border, textPrimary, textSecondary, textDisabled, textInverse, success, warning, error, info, shadowColor.
