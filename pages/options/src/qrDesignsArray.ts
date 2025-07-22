import type React from 'react';
import type { QRCodeBoxProps } from '@extension/storage';

export const qrDesigns: {
  bg: string;
  border: string;
  svg?: React.ReactNode;
  src?: string;
  settings: QRCodeBoxProps;
}[] = [
  {
    bg: 'bg-white', // classic
    border: '',
    src: 'designs/classic.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#ffffff', // white
      foregroundColor: '#000000', // black
      showGradient: false,
      cornersSquareType: 'square',
      cornersDotType: 'square',
      dotsType: 'square',
    },
  },
  {
    bg: 'bg-[#cfe2f3]', // blue
    border: '',
    src: 'designs/blue.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#cfe2f3',
      foregroundColor: '#0b5394',
      gradientColor: '#cc0000',
      showGradient: true,
      cornersSquareType: 'dot',
      cornersDotType: 'square',
    },
  },
  {
    bg: 'bg-[#fce5cd]',
    border: '',
    src: 'designs/orange.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#fce5cd', // light orange 3
      foregroundColor: '#b45f06', // dark orange 1
      showGradient: false,
      cornersSquareType: 'dot',
      dotsType: 'classy',
    },
  },
  {
    bg: 'bg-[#9900ff]',
    border: '',
    src: 'designs/purple.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#9900ff', // purple
      foregroundColor: '#ffffff', // white
      showGradient: false,
      cornersSquareType: 'square',
      dotsType: 'classy-rounded',
    },
  },
  {
    bg: 'bg-yellow-100',
    border: '',
    src: 'designs/yellow.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#fff2cc', // light yellow 3
      foregroundColor: '#bf9000', // dark yellow 1
      showGradient: false,
      cornersDotType: 'square',
      dotsType: 'extra-rounded',
    },
  },
  {
    bg: 'bg-green-200',
    border: '',
    src: 'designs/green.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#d9ead3', // light green 3
      foregroundColor: '#38761d', // dark green 2
      gradientColor: '#9900ff', // purple
      showGradient: true,
      cornersSquareType: 'dot',
      cornersDotType: 'square',
      dotsType: 'square',
    },
  },
  {
    bg: 'bg-[#ead1dc]',
    border: '',
    src: 'designs/red.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#ead1dc',
      foregroundColor: '#cc0000',
      showGradient: false,
      cornersDotType: 'square',
    },
  },
  {
    bg: 'bg-[#e6b8af]',
    border: '',
    src: 'designs/brown.svg',
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#e6b8af',
      foregroundColor: '#85200c',
      showGradient: false,
      dotsType: 'rounded',
    },
  },
];
