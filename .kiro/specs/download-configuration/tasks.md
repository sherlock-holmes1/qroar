# Implementation Plan

- [x] 1. Create download settings storage infrastructure






  - Implement downloadSettingsStorage.ts following the existing qrSettingsStorage pattern
  - Define DownloadSettings type with format and size properties
  - Create storage methods for setFormat, setSize, setAll, and reset
  - Export from storage package index
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 2. Enhance QRCodeBox component for configurable downloads





  - Modify QRCodeBoxHandle interface to accept format and size options in download method
  - Update handleDownload function to use format parameter for qr-code-styling
  - Add size mapping logic to convert size names to pixel dimensions
  - Maintain backward compatibility with existing download calls
  - _Requirements: 2.3, 2.4, 5.1, 5.3_

- [x] 3. Create DownloadSettings UI component





  - Build DownloadSettings.tsx component with format selection (SVG/PNG radio buttons)
  - Add size selection with three options (Small 300x300, Medium 1000x1000, Large 5000x5000)
  - Implement conditional logic to disable size options when SVG format is selected
  - Style component consistently with existing ColorSettings and LogoSettings components
  - _Requirements: 1.1, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4_

- [ ] 4. Integrate download settings into Options page
  - Add "Download Settings" navigation item to Options.tsx sidebar
  - Create new section in main content area for download settings
  - Implement state management for download settings using storage hooks
  - Add hash-based navigation support for the new section
  - _Requirements: 3.1, 3.2, 4.1, 4.2_

- [ ] 5. Connect download settings to QR code downloads
  - Update popup download button to use configured download settings
  - Modify QRCodeBox usage in popup to pass download configuration
  - Ensure settings are loaded from storage before download operations
  - Test that downloads use the correct format and size based on user preferences
  - _Requirements: 2.3, 2.4, 4.3, 5.1, 5.2_

- [ ] 6. Add visual feedback and user experience enhancements
  - Implement visual indication when size options are disabled for SVG format
  - Add immediate feedback when settings are saved
  - Ensure proper loading states while settings are being retrieved
  - Add tooltips or help text explaining the difference between formats and sizes
  - _Requirements: 3.4, 3.5, 2.2_

- [ ] 7. Write comprehensive tests for download configuration
  - Create unit tests for downloadSettingsStorage CRUD operations
  - Write component tests for DownloadSettings UI interactions
  - Add integration tests for settings persistence and download functionality
  - Test edge cases like SVG format with size settings and large PNG downloads
  - _Requirements: 1.4, 2.1, 2.2, 4.1, 4.2, 4.3_