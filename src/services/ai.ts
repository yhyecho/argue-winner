import { GenerateRequest, GenerateResponse } from '@/types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * 根据语气强度获取对应的描述
 */
function getIntensityDescription(intensity: number): string {
    if (intensity <= 2) {
        return '温和但坚定，有理有据，保持风度';
    } else if (intensity <= 4) {
        return '语气较强，适当反驳，不失礼貌';
    } else if (intensity <= 6) {
        return '语气强硬，直接反击，寸步不让';
    } else if (intensity <= 8) {
        return '咄咄逼人，犀利尖锐，气势压人';
    } else {
        return '火力全开，毫不留情，怼到对方无话可说';
    }
}

/**
 * 构建生成回复的 prompt
 */
function buildPrompt(opponentMessage: string, intensity: number): string {
    const intensityDesc = getIntensityDescription(intensity);

    return `你是一个帮助用户在争论中回应的助手。用户需要你帮忙回复对方的话。

对方说的话：
"${opponentMessage}"

用户选择的语气强度：${intensity}/10
语气要求：${intensityDesc}

请生成3条不同风格的回复，每条回复都应该：
1. 针对对方的话进行有力的反驳或回应
2. 符合用户选择的语气强度
3. 简洁有力，通常在1-3句话之间
4. 使用口语化的中文表达

重要：直接输出3条回复，用数字编号，不要有其他解释。格式如下：
1. [第一条回复]
2. [第二条回复]
3. [第三条回复]`;
}

/**
 * 解析 AI 返回的内容，提取3条回复
 */
function parseResponses(content: string): string[] {
    const lines = content.split('\n').filter(line => line.trim());
    const responses: string[] = [];

    for (const line of lines) {
        // 匹配 "1. xxx" 或 "1、xxx" 或 "1: xxx" 格式
        const match = line.match(/^[1-3][.、:\s]\s*(.+)/);
        if (match) {
            responses.push(match[1].trim());
        }
    }

    // 如果解析失败，尝试按行分割
    if (responses.length < 3) {
        const fallbackResponses = lines
            .filter(line => line.length > 5)
            .slice(0, 3);
        if (fallbackResponses.length > 0) {
            return fallbackResponses;
        }
    }

    return responses.slice(0, 3);
}

/**
 * 调用 OpenRouter API 生成吵架回复
 */
export async function generateArguments(
    request: GenerateRequest
): Promise<GenerateResponse> {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return {
            responses: [],
            error: 'API Key 未配置',
        };
    }

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://argue-winner.app',
                'X-Title': 'Argue Winner',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3-0324',
                messages: [
                    {
                        role: 'user',
                        content: buildPrompt(request.opponentMessage, request.intensity),
                    },
                ],
                temperature: 0.8,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('OpenRouter API Error:', errorData);
            return {
                responses: [],
                error: `API 请求失败: ${response.status}`,
            };
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';

        if (!content) {
            return {
                responses: [],
                error: '生成内容为空',
            };
        }

        const responses = parseResponses(content);

        if (responses.length === 0) {
            return {
                responses: [content],
                error: undefined,
            };
        }

        return {
            responses,
        };
    } catch (error) {
        console.error('Generate error:', error);
        return {
            responses: [],
            error: error instanceof Error ? error.message : '生成失败，请重试',
        };
    }
}
