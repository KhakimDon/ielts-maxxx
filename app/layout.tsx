import "./globals.css";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import atypText from './fonts/atyp';

export const metadata = {
  title: 'IELTS MAXXX',
  description: 'IELTS MAXXX',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
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
      <body className={atypText.variable}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
