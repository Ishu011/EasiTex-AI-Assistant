import { Message } from '../types/chat';

export class ChatStorage {
  private static readonly STORAGE_KEY = 'easitex-chat-history';
  private static readonly MAX_MESSAGES = 50; // Limit stored messages

  static saveHistory(messages: Message[]): void {
    try {
      // Keep only the most recent messages to prevent localStorage bloat
      const recentMessages = messages.slice(-this.MAX_MESSAGES);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentMessages));
    } catch (error) {
      console.warn('Failed to save chat history:', error);
    }
  }

  static loadHistory(): Message[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.warn('Failed to load chat history:', error);
    }
    return [];
  }

  static clearHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear chat history:', error);
    }
  }
}