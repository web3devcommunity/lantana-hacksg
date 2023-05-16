import './globals.css';
import DynamicWagmi from './components/DynamicWagmi';
import Navbar from './components/Navbar/Navbar';

export const metadata = {
  title: 'Lantana - Volunteering Events Website',
  description: '',
  icons: {
    icon: './favicon',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DynamicWagmi>
          <Navbar />
          <main>
            {children}
          </main>
        </DynamicWagmi>
      </body>
    </html>
  );
}
