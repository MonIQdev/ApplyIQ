import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 className="text-6xl font-black mb-6">Stop applying. Start getting interviews.</h1>
      <p className="text-xl text-slate-600 mb-10">Free AI Autofill for LinkedIn, Indeed, and Workday.</p>
      <div className="flex gap-4 justify-center">
       <div className="flex gap-4 justify-center">
  <Link href="/login"><Button size="lg">Get Started</Button></Link>
  <Link href="/donate"><Button size="lg" variant="outline">Support Project</Button></Link>
</div>
      </div>
    </main>
  );
}
