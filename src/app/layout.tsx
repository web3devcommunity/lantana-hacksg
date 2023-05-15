import './globals.css';
import DynamicWagmi from './components/DynamicWagmi';

export const metadata = {
  title: 'Lantana',
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
        <DynamicWagmi>{children}</DynamicWagmi>
      </body>
    </html>
  );
}
