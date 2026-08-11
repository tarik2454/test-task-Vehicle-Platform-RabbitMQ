# iOS Live Chat Height Adjustment

## Problem

On iPhone browsers, the mobile live-stream chat leaves an additional empty strip between the message input and the browser UI. Android and desktop layouts do not show the issue.

The mobile chat grid is currently constrained to `calc(100dvh - 90px)`. With `viewport-fit: cover`, iOS exposes a non-zero `safe-area-inset-bottom`, but that inset is not included in the grid height. The chat component already declares an unused iOS safe-area custom property, which supports this diagnosis.

## Desired Result

Leave only the existing chat padding of approximately 14 px below the input. Do not change Android, tablet, or desktop layout behavior.

## Design

Adjust only the mobile live-chat grid height in `LiveStreamDetail.tsx`:

```css
calc(100dvh - 90px + env(safe-area-inset-bottom, 0px))
```

The adjustment remains scoped to screens below the existing `sm` breakpoint and only while the Chat tab is active. Browsers and devices without a bottom safe-area inset resolve the additional value to `0px`, preserving the current layout.

Do not modify global viewport styles, shared layouts, input padding, or Android-specific behavior. Remove the unused safe-area custom property from `LiveStreamChat.tsx` if it has no remaining consumer.

## Alternatives Considered

- Reduce mobile chat padding: rejected because it changes normal spacing and does not account for the device-specific inset.
- Track `window.visualViewport` in JavaScript: rejected because it adds resize and keyboard-state complexity for a CSS geometry issue.

## Verification

- Add a focused regression test proving the active mobile Chat tab includes the safe-area adjustment and unrelated states remain unchanged.
- Run the focused test before implementation to confirm it fails for the missing behavior, then after implementation to confirm it passes.
- Run formatting, lint, and TypeScript checks for the affected files/project.
- Inspect an iPhone-sized browser viewport and a comparable Android-sized viewport. Confirm the iPhone gap is reduced to the normal inner padding and the Android layout remains unchanged.

## Scope

Only the live-stream mobile Chat tab is affected. Support chat, creator pages, backoffice, shared navigation, and desktop live-stream chat are out of scope.
