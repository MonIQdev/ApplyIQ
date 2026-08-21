import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';

export default async function Admin() {
  const userCount = await prisma.user.count();
  const proCount = await prisma.subscription.count({ where: { status: 'PRO' } });
  const donations = await prisma.donation.aggregate({ _sum: { amount: true } });

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white border rounded shadow">Users: {userCount}</div>
        <div className="p-6 bg-white border rounded shadow">Pro: {proCount}</div>
        <div className="p-6 bg-white border rounded shadow">Raised: ${donations._sum.amount || 0}</div>
      </div>
      <div className="p-6 bg-red-50 border border-red-200 rounded">
        <h2 className="font-bold text-red-800">EMERGENCY STOP</h2>
        <p>This disables AI for all non-admin users.</p>
        <Button variant="destructive" className="mt-4">TOGGLE STOP BUTTON</Button>
      </div>
    </div>
  );
}
