import "./globals.css";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import atypText from './fonts/atyp';
import { digital7 } from './fonts/digital';
import dmSans from './fonts/dm-sans';

export const metadata = {
  title: 'IELTS MAXXX',
  description: 'IELTS MAXXX',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${atypText.variable} ${digital7.variable} ${dmSans.variable}`}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
