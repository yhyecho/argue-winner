import { HistoryItem } from '@/types';

const STORAGE_KEY = 'argue_winner_history';
const MAX_HISTORY_ITEMS = 20;

/**
 * 获取历史记录
 */
export function getHistory(): HistoryItem[] {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    } catch {
        return [];
    }
}

/**
 * 保存一条新的历史记录
 */
export function saveToHistory(item: Omit<HistoryItem, 'id' | 'createdAt'>): HistoryItem {
    const history = getHistory();

    const newItem: HistoryItem = {
        ...item,
        id: generateId(),
        createdAt: Date.now(),
    };

    // 将新记录添加到开头
    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
        console.error('Failed to save history:', error);
    }

    return newItem;
}

/**
 * 清除所有历史记录
 */
export function clearHistory(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear history:', error);
    }
}

/**
 * 删除单条历史记录
 */
export function deleteHistoryItem(id: string): void {
    const history = getHistory();
    const updatedHistory = history.filter(item => item.id !== id);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
        console.error('Failed to delete history item:', error);
    }
}

/**
 * 生成唯一 ID
 */
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
