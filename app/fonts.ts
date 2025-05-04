import localFont from 'next/font/local';

export const merriweather = localFont({
  src: [
    {
      path: '../public/front/Merriweather-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/front/Merriweather-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/front/Merriweather Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/front/Merriweather UltraBold.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/front/Merriweather-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/front/Merriweather-BoldIt.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-merriweather',
}); 