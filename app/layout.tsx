import { prisma } from '@/lib/prisma';
import '../globals.css’

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const stop = await prisma.appSettings.findUnique({ where: { key: 'emergency_stop' } });
  const donationUrl = await prisma.appSettings.findUnique({ where: { key: 'donation_url' } });

  return (
    <html lang="en">
      <body>
        {stop?.value === 'true' && (
          <div className="bg-red-600 text-white p-2 text-center text-sm font-bold">
            🚨 ApplyIQ is paused due to API costs. <a href={donationUrl?.value} className="underline">Donate to help ❤️</a>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
