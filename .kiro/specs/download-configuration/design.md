# Design Document

## Overview

The download configuration feature adds a new settings section to the options page that allows users to customize QR code download parameters. This feature extends the existing storage system and integrates with the current QRCodeBox component to provide configurable download sizes and file formats.

The design leverages the existing storage pattern used by `qrSettingsStorage` and follows the same architectural principles for consistency and maintainability.

## Architecture

### Storage Layer
- **New Storage Module**: `downloadSettingsStorage.ts` following the same pattern as `qrSettingsStorage.ts`
- **Storage Location**: Browser local storage using the existing `createStorage` utility
- **Storage Key**: `download-settings-storage-key` to avoid conflicts with existing settings
- **Default Values**: Medium size (1000x1000px) and PNG format for broad compatibility

### UI Layer
- **New Component**: `DownloadSettings.tsx` component in the options page
- **Integration Point**: Added as a new section in the existing Options.tsx sidebar navigation
- **Styling**: Consistent with existing ColorSettings and LogoSettings components using TailwindCSS

### Download Integration
- **QRCodeBox Enhancement**: Extend the existing download method to accept format and size parameters
- **Backward Compatibility**: Maintain existing download functionality while adding new configuration options
- **Format Handling**: SVG downloads ignore size settings (vector format), PNG downloads use configured size

## Components and Interfaces

### DownloadSettingsStorage Interface
```typescript
export type DownloadSettings = {
  format: 'svg' | 'png';
  size: 'small' | 'medium' | 'large';
};

export type DownloadSettingsStorage = BaseStorage<DownloadSettings> & {
  setFormat: (format: 'svg' | 'png') => Promise<void>;
  setSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
  setAll: (settings: Partial<DownloadSettings>) => Promise<void>;
  reset: () => Promise<void>;
};
```

### DownloadSettings Component Interface
```typescript
interface DownloadSettingsProps {
  format: 'svg' | 'png';
  size: 'small' | 'medium' | 'large';
  onFormatChange: (format: 'svg' | 'png') => void;
  onSizeChange: (size: 'small' | 'medium' | 'large') => void;
}
```

### Enhanced QRCodeBox Download Method
```typescript
interface QRCodeBoxHandle {
  download: (options?: {
    format?: 'svg' | 'png';
    width?: number;
    height?: number;
  }) => void;
}
```

## Data Models

### Size Configuration Mapping
```typescript
const SIZE_MAPPING = {
  small: { width: 300, height: 300 },
  medium: { width: 1000, height: 1000 },
  large: { width: 5000, height: 5000 },
} as const;
```

### Default Settings
```typescript
const defaultDownloadSettings: DownloadSettings = {
  format: 'png',
  size: 'medium',
};
```

### Storage Schema
The download settings will be stored as a JSON object in browser local storage:
```json
{
  "format": "png",
  "size": "medium"
}
```

## Error Handling

### Storage Errors
- **Fallback Strategy**: If storage fails to load, use default settings
- **Error Logging**: Log storage errors to console for debugging
- **User Feedback**: Silent fallback to defaults, no user-facing error messages for storage issues

### Download Errors
- **Format Validation**: Validate format parameter before download
- **Size Validation**: Ensure size parameters are within reasonable bounds
- **QR Generation Errors**: Maintain existing error handling in QRCodeBox component
- **File System Errors**: Browser handles download failures, no additional handling needed

### UI Errors
- **Invalid State Prevention**: Disable size options when SVG format is selected
- **Visual Feedback**: Clear indication when size options are disabled
- **Graceful Degradation**: If settings fail to load, show default values

## Testing Strategy

### Unit Tests
- **Storage Operations**: Test all CRUD operations for download settings storage
- **Component Rendering**: Test DownloadSettings component with various prop combinations
- **Format/Size Logic**: Test the interaction between format selection and size availability
- **Default Values**: Verify correct default values are used when no settings exist

### Integration Tests
- **Settings Persistence**: Test that settings persist across browser sessions
- **Download Integration**: Test that QRCodeBox uses the configured download settings
- **Options Page Integration**: Test the new section appears correctly in the options page
- **Cross-Component Communication**: Test that settings changes are reflected in downloads

### E2E Tests
- **Complete User Flow**: Test user can navigate to settings, change options, and download with new settings
- **Format Switching**: Test switching between SVG and PNG formats
- **Size Configuration**: Test changing size settings and verifying download dimensions
- **Settings Persistence**: Test that settings are remembered after browser restart

### Edge Cases
- **Large File Sizes**: Test 5000x5000px PNG downloads don't cause memory issues
- **SVG with Size Settings**: Verify SVG downloads ignore size settings appropriately
- **Rapid Setting Changes**: Test multiple rapid changes don't cause race conditions
- **Storage Quota**: Test behavior when browser storage is full or unavailable

## Implementation Notes

### File Organization
```
packages/storage/lib/impl/
├── downloadSettingsStorage.ts    # New storage implementation
└── index.ts                      # Export new storage

pages/options/src/
├── DownloadSettings.tsx          # New settings component
└── Options.tsx                   # Updated to include new section

packages/ui/lib/components/
└── QRCodeBox.tsx                 # Enhanced download method
```

### Dependencies
- **No New Dependencies**: Implementation uses existing libraries and patterns
- **Existing Storage System**: Leverages `createStorage` utility from base storage
- **Existing UI Components**: Uses same styling and component patterns as other settings sections
- **QR Code Library**: Extends existing `qr-code-styling` usage for format/size handling

### Performance Considerations
- **Storage Efficiency**: Minimal storage footprint with simple JSON structure
- **Download Performance**: Large PNG files (5000x5000) may take time to generate
- **Memory Usage**: Large QR codes temporarily increase memory usage during generation
- **UI Responsiveness**: Settings changes are immediate, downloads are asynchronous

### Browser Compatibility
- **Storage API**: Uses existing browser storage patterns already implemented
- **Download API**: Leverages existing download functionality in QRCodeBox
- **File Formats**: SVG and PNG are universally supported
- **Large Files**: Modern browsers handle large PNG downloads appropriately