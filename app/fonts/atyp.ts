import localFont from 'next/font/local';

const atyp = localFont({
  src: [
    {
      path: '../../public/fonts/AtypText-Medium.ttf',
      weight: '300', // ⬅️ Light
      style: 'normal',
    },
    {
      path: '../../public/fonts/AtypText-Regular.ttf',
      weight: '400', // ⬅️ Regular (Normal)
      style: 'normal',
    },
    {
      path: '../../public/fonts/AtypText-bold.ttf',
      weight: '700', // ⬅️ Bold
      style: 'normal',
    },
  ],
  variable: '--font-atyp',
  display: 'swap',
});

export default atyp;
