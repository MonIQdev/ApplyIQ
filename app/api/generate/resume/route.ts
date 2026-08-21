import { OpenAI } from 'openai';
import { prisma } from '@/lib/prisma';
import { checkAccess } from '@/lib/admin-check';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId, jobUrl, resumeData } = await req.json();
    await checkAccess(userId, 'resume');

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: `Tailor this: ${JSON.stringify(resumeData)} to job: ${jobUrl}` }],
    });

    await prisma.usageLog.create({
      data: { userId, action: 'resume', month: new Date().getMonth() + 1, year: new Date().getFullYear() }
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
