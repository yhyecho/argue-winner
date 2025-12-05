'use client';

import { useState, useCallback } from 'react';
import { GenerateRequest, GenerateResponse } from '@/types';
import { saveToHistory } from '@/utils/storage';

interface UseGenerateResult {
    responses: string[];
    isLoading: boolean;
    error: string | null;
    generate: (request: GenerateRequest) => Promise<void>;
    reset: () => void;
}

export function useGenerate(): UseGenerateResult {
    const [responses, setResponses] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = useCallback(async (request: GenerateRequest) => {
        setIsLoading(true);
        setError(null);
        setResponses([]);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            const data: GenerateResponse = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            if (data.responses && data.responses.length > 0) {
                setResponses(data.responses);

                // 保存到历史记录
                saveToHistory({
                    opponentMessage: request.opponentMessage,
                    intensity: request.intensity,
                    responses: data.responses,
                });
            } else {
                setError('生成失败，请重试');
            }
        } catch (err) {
            console.error('Generate error:', err);
            setError('网络错误，请检查网络连接后重试');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setResponses([]);
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        responses,
        isLoading,
        error,
        generate,
        reset,
    };
}
