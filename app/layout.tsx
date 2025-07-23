import "./globals.css";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import atypText from './fonts/atyp';

export const metadata = {
  title: 'IELTS MAXXX',
  description: 'Лендинг книги IELTS MAXXX',
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
