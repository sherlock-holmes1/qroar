import { useEffect, useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
} from 'qr-code-styling';

interface QRCodeBoxProps {
  url: string;
  extension?: 'svg' | 'png' | 'jpeg' | 'webp';
  style?: React.CSSProperties;
}
export interface QRCodeBoxHandle {
  download: () => void;
}
export const QRCodeBox = forwardRef<QRCodeBoxHandle, QRCodeBoxProps>(({ url, extension = 'svg', style }, ref) => {
  const options = useMemo(
    () => ({
      width: 300,
      height: 300,
      type: extension as DrawType,
      data: url,
      margin: 10,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: 'Byte' as Mode,
        errorCorrectionLevel: 'Q' as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        color: '#222222',
        type: 'rounded' as DotType,
      },
      backgroundOptions: {
        color: '#5FD4F3',
      },
      cornersSquareOptions: {
        color: '#222222',
        type: 'extra-rounded' as CornerSquareType,
      },
      cornersDotOptions: {
        color: '#222222',
        type: 'dot' as CornerDotType,
      },
    }),
    [url, extension],
  );

  const [qrCode] = useState(() => new QRCodeStyling(options));
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode, qrRef]);

  useEffect(() => {
    qrCode.update(options);
  }, [qrCode, options]);

  // Expose the download handler via ref

  const handleDownload = () => {
    qrCode.download({ extension });
  };

  useImperativeHandle(ref, () => ({
    download: handleDownload,
  }));

  return (
    <div style={{ width: '100%' }}>
      <div
        ref={qrRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 340,
          ...style,
        }}
      />
    </div>
  );
});
