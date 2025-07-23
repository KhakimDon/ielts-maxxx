import localFont from 'next/font/local';

const atyp = localFont({
  src: [
    {
      path: './files/AtypText-Medium.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './files/AtypText-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './files/AtypText-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-atyp',
  display: 'swap',
});

export default atyp;
