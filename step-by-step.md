### Step-by-Step Plan

1.  **Analyze Existing Components:** I will start by examining the existing code in `pages/options/src/Options.tsx` and the shared UI components in `packages/ui` to understand the current implementation and identify reusable components.

2.  **Create New UI Components:**
    *   I will create a new `Select` component in `packages/ui/lib` for the file type selection.
    *   I will create a new `Input` component in `packages/ui/lib` for the QR code size.

3.  **Update Options Page:**
    *   I will add a new "Download Options" section to the `pages/options/src/Options.tsx` file.
    *   I will integrate the new `Select` and `Input` components into this section.

4.  **Add Translations:**
    *   I will add the necessary labels for the new settings to the translation files in `packages/i18n/locales/`.

5.  **Implement State Management:**
    *   I will use the existing storage solution in `packages/storage` to manage the state of the new settings.

6.  **Verify Implementation:**
    *   I will provide instructions on how to run the development server and manually test the new settings in the options page.
