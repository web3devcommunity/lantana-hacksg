import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    // <React.StrictMode>
    <div>
      <h1>Lantana - Volunteering Events Website</h1>
      <Link href="/events">
        <div>View all Events</div>
      </Link>
    </div>
    // </React.StrictMode>
  );
}
