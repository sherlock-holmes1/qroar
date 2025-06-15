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
  download: (downloadWidth?: number, downloadHeight?: number) => void;
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
      size = 300,
    }: QRCodeBoxProps,
    ref,
  ): React.ReactElement => {
    const isExtensionUrl = (url?: string) => typeof url === 'string' && url.startsWith('chrome-extension://');

    const options = useMemo(
      () => ({
        width: size ? size : 300,
        height: size ? size : 300,
        image: pathToLogo && !isExtensionUrl(pathToLogo) ? pathToLogo : undefined,
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
        size,
      ],
    );

    const [qrCode] = useState(() => new QRCodeStyling(options));
    const qrRef = useRef<HTMLDivElement>(null);

    // Helper to render QR code, with fallback if logo fails
    const renderQRCode = (opts: typeof options, allowRetry = true) => {
      try {
        if (qrRef.current) {
          qrRef.current.innerHTML = '';
          qrCode.update(opts);
          qrCode.append(qrRef.current);
        }
      } catch (err) {
        // If image or pathToLogo is set, retry without them
        console.log(err);
        if (allowRetry && opts.image !== undefined) {
          renderQRCode({ ...opts, image: undefined }, false);
        } else {
          if (qrRef.current) {
            qrRef.current.innerHTML = '<div style="color:red;text-align:center;">QR code error</div>';
          }
        }
      }
    };

    useEffect(() => {
      renderQRCode(options);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrCode, qrRef, options]);

    // Expose the download handler via ref

    const handleDownload = async (downloadWidth?: number, downloadHeight?: number) => {
      if (downloadWidth && downloadHeight) {
        const prevWidth = options.width;
        const prevHeight = options.height;
        // Update to new size, download, then revert
        qrCode.update({ ...options, width: downloadWidth, height: downloadHeight });
        await qrCode.download({ extension });
        qrCode.update({ ...options, width: prevWidth, height: prevHeight });
      } else {
        await qrCode.download({ extension });
      }
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
