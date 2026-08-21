import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature')!;

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      if (session.mode === 'subscription') {
        await prisma.subscription.update({
          where: { userId: session.metadata.userId },
          data: { status: 'PRO' }
        });
      } else {
        await prisma.donation.create({
          data: { amount: session.amount_total / 100, userId: session.metadata.userId }
        });
      }
    }
    return new Response('ok');
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}
