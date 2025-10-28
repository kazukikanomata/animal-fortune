import { AnimalType } from "@/app/config";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "path";

type Submission = {
    timestamp: string;
    nickname: string;
    animalType: AnimalType;
    answers: Record<string, {
        value: string,
        text: string,
    }>;
};

export async function POST(request: NextRequest) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Not Available' }, { status: 403 });
    }
    const body = await request.json();

    // 保存する内容
    const submission = {
        timeStamp: new Date().toISOString(),
        ...body,
    }
    // 保存場所
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');

    // 保存処理
    try {
        let submissions = [];
        const data = await fs.readFile(filePath, 'utf-8');
        submissions = JSON.parse(data);

        submissions.push(submission);

        await fs.mkdir(filePath), { recursive: true };
        await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

}

export async function GET(request: NextRequest) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Not Available' }, { status: 403 });
    }
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const submissions = JSON.parse(data);

        return NextResponse.json(submissions.reverse());
    } catch {
        return NextResponse.json([]);
    }
}