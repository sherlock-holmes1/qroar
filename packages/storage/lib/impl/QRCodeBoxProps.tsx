export interface QRCodeBoxProps {
  qrText: string;
  pathToLogo: string | undefined;
  extension?: 'svg' | 'png' | 'jpeg' | 'webp';
  style?: React.CSSProperties;
  backgroundColor?: string;
  foregroundColor?: string;
  showGradient?: boolean;
  gradientColor?: string;
  cornersSquareType?: 'dot' | 'square' | 'extra-rounded';
  cornersDotType?: 'dot' | 'square' | 'extra-rounded';
  dotsType?: 'dots' | 'square' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
  size?: number;
  selectedDesign?: string;
}
