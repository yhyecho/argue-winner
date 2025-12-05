import { NextRequest, NextResponse } from 'next/server';
import { generateArguments } from '@/services/ai';
import { GenerateRequest } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();

        // 验证请求参数
        if (!body.opponentMessage || typeof body.opponentMessage !== 'string') {
            return NextResponse.json(
                { responses: [], error: '请输入对方说的话' },
                { status: 400 }
            );
        }

        if (body.opponentMessage.trim().length === 0) {
            return NextResponse.json(
                { responses: [], error: '请输入对方说的话' },
                { status: 400 }
            );
        }

        if (body.opponentMessage.length > 1000) {
            return NextResponse.json(
                { responses: [], error: '输入内容过长，请限制在1000字以内' },
                { status: 400 }
            );
        }

        const intensity = body.intensity;
        if (typeof intensity !== 'number' || intensity < 1 || intensity > 10) {
            return NextResponse.json(
                { responses: [], error: '语气强度必须在1-10之间' },
                { status: 400 }
            );
        }

        // 调用 AI 服务生成回复
        const result = await generateArguments({
            opponentMessage: body.opponentMessage.trim(),
            intensity: Math.round(intensity),
        });

        if (result.error) {
            return NextResponse.json(result, { status: 500 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { responses: [], error: '服务器错误，请稍后重试' },
            { status: 500 }
        );
    }
}
