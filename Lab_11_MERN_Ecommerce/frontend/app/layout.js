import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Bazaar | Curated Products',
  description: 'Discover Products Worth Owning',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-light min-h-screen flex flex-col font-sans antialiased selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-grow flex flex-col items-center w-full">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}