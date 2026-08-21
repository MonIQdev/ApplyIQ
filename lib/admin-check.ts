import { prisma } from './prisma';

export async function checkAccess(userId: string, action: 'resume' | 'coverletter' | 'answer') {
  const user = await prisma.user.findUnique({ 
    where: { id: userId }, 
    include: { subscription: true } 
  });
  
  const stop = await prisma.appSettings.findUnique({ where: { key: 'emergency_stop' } });
  if (stop?.value === 'true' && !user?.isAdmin) {
    const url = await prisma.appSettings.findUnique({ where: { key: 'donation_url' } });
    throw new Error(`🚨 I'm too broke to keep this running - consider donating ❤️ ${url?.value}`);
  }

  if (user?.isAdmin || user?.subscription?.status === 'PRO') return true;

  const now = new Date();
  const count = await prisma.usageLog.count({
    where: { userId, action, month: now.getMonth() + 1, year: now.getFullYear() }
  });

  const limits = { resume: 3, coverletter: 3, answer: 10 };
  if (count >= (limits[action] || 0)) throw new Error("Free limit reached. Upgrade to Pro!");
  
  return true;
}
