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
  GradientType,
} from 'qr-code-styling';
import type { QRCodeBoxProps } from '@extension/storage';

export interface QRCodeBoxHandle {
  download: () => void;
}
export const QRCodeBox = forwardRef<QRCodeBoxHandle, QRCodeBoxProps>(
  (
    {
      qrText,
      pathToLogo,
      extension = 'svg',
      style,
      backgroundColor = '#5FD4F3',
      foregroundColor = '#222222',
      showGradient = false,
      gradientColor = '#0000ff',
      cornersSquareType = 'extra-rounded',
      cornersDotType = 'dot',
      dotsType = 'dots',
    }: QRCodeBoxProps,
    ref,
  ): React.ReactElement => {
    const options = useMemo(
      () => ({
        width: 300,
        height: 300,
        image: pathToLogo,
        type: extension as DrawType,
        data: qrText,
        margin: 10,
        qrOptions: {
          typeNumber: 0 as TypeNumber,
          mode: 'Byte' as Mode,
          errorCorrectionLevel: 'Q' as ErrorCorrectionLevel,
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.7,
          margin: 20,
          crossOrigin: 'anonymous',
        },
        dotsOptions: {
          color: foregroundColor,
          type: dotsType as DotType,
          gradient: showGradient
            ? {
                type: 'linear' as GradientType,
                rotation: 0,
                colorStops: [
                  { offset: 0, color: foregroundColor },
                  { offset: 1, color: gradientColor },
                ],
              }
            : undefined,
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        cornersSquareOptions: {
          color: foregroundColor,
          type: cornersSquareType as CornerSquareType,
        },
        cornersDotOptions: {
          color: foregroundColor,
          type: cornersDotType as CornerDotType,
        },
      }),
      [
        qrText,
        extension,
        backgroundColor,
        foregroundColor,
        showGradient,
        gradientColor,
        pathToLogo,
        cornersSquareType,
        cornersDotType,
        dotsType,
      ],
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
  },
);
