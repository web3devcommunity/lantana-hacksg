import { Header } from '@/components/Header'
import { Inter } from 'next/font/google'


export const metadata = {
  title: 'Lantana',
  description: 'Generated by create next app',
}

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      {children}

    </div>
  )
}