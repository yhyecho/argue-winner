// 生成请求
export interface GenerateRequest {
    opponentMessage: string;  // 对方的话
    intensity: number;        // 语气强度 1-10
}

// 生成响应
export interface GenerateResponse {
    responses: string[];      // 3条回复
    error?: string;
}

// 历史记录
export interface HistoryItem {
    id: string;
    opponentMessage: string;
    intensity: number;
    responses: string[];
    createdAt: number;
}
