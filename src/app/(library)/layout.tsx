export const metadata = {
  title: 'Library - Your Purchases',
  description: 'View and manage your purchased products, reviews, and digital library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
