import { WebhookConfig, MonitoringRule } from "./WebhookManager";
import { logger } from "@/utils/logger";

const STORAGE_KEYS = {
  WEBHOOKS: "code_guardian_webhooks",
  MONITORING_RULES: "code_guardian_monitoring_rules",
  WEBHOOK_LOGS: "code_guardian_webhook_logs",
};

export class LocalStorageWebhookAdapter {
  private getStored<T>(key: string): T[] {
    if (typeof window === "undefined") return [];
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      logger.error(`Error reading from localStorage key ${key}:`, error);
      return [];
    }
  }

  private setStored<T>(key: string, data: T[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      logger.error(`Error writing to localStorage key ${key}:`, error);
    }
  }

  async createWebhook(
    config: Omit<WebhookConfig, "id" | "createdAt" | "updatedAt" | "secret">
  ): Promise<WebhookConfig> {
    const now = Date.now();
    const secret = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const newWebhook: WebhookConfig = {
      ...config,
      id: `webhook_${now}_${Math.random().toString(36).substr(2, 9)}`,
      secret,
      createdAt: now,
      updatedAt: now,
    };

    const webhooks = this.getStored<WebhookConfig>(STORAGE_KEYS.WEBHOOKS);
    this.setStored(STORAGE_KEYS.WEBHOOKS, [...webhooks, newWebhook]);

    return newWebhook;
  }

  async getWebhooks(userId: string): Promise<WebhookConfig[]> {
    const webhooks = this.getStored<WebhookConfig>(STORAGE_KEYS.WEBHOOKS);
    return webhooks.filter((w) => w.userId === userId);
  }

  async updateWebhook(
    webhookId: string,
    updates: Partial<WebhookConfig>
  ): Promise<void> {
    const webhooks = this.getStored<WebhookConfig>(STORAGE_KEYS.WEBHOOKS);
    const index = webhooks.findIndex((w) => w.id === webhookId);

    if (index !== -1) {
      webhooks[index] = {
        ...webhooks[index],
        ...updates,
        updatedAt: Date.now(),
      };
      this.setStored(STORAGE_KEYS.WEBHOOKS, webhooks);
    }
  }

  async deleteWebhook(webhookId: string): Promise<void> {
    const webhooks = this.getStored<WebhookConfig>(STORAGE_KEYS.WEBHOOKS);
    const filteredWebhooks = webhooks.filter((w) => w.id !== webhookId);
    this.setStored(STORAGE_KEYS.WEBHOOKS, filteredWebhooks);

    // Also delete associated rules
    const rules = this.getStored<MonitoringRule>(STORAGE_KEYS.MONITORING_RULES);
    const filteredRules = rules.filter((r) => r.webhookId !== webhookId);
    this.setStored(STORAGE_KEYS.MONITORING_RULES, filteredRules);
  }

  async createMonitoringRule(
    rule: Omit<MonitoringRule, "id" | "createdAt" | "updatedAt">
  ): Promise<MonitoringRule> {
    const now = Date.now();
    const newRule: MonitoringRule = {
      ...rule,
      id: `rule_${now}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };

    const rules = this.getStored<MonitoringRule>(STORAGE_KEYS.MONITORING_RULES);
    this.setStored(STORAGE_KEYS.MONITORING_RULES, [...rules, newRule]);

    return newRule;
  }

  async getMonitoringRules(webhookId: string): Promise<MonitoringRule[]> {
    const rules = this.getStored<MonitoringRule>(STORAGE_KEYS.MONITORING_RULES);
    return rules.filter((r) => r.webhookId === webhookId);
  }

  async getWebhookStats(webhookId: string): Promise<{
    totalEvents: number;
    eventsByType: Record<string, number>;
    lastEvent?: number;
  }> {
    const logs = this.getStored<{
      webhookId: string;
      event: string;
      timestamp: number;
    }>(STORAGE_KEYS.WEBHOOK_LOGS).filter((log) => log.webhookId === webhookId);

    const eventsByType = logs.reduce<Record<string, number>>((acc, log) => {
      acc[log.event] = (acc[log.event] || 0) + 1;
      return acc;
    }, {});

    const lastEvent =
      logs.length > 0
        ? Math.max(...logs.map((log) => log.timestamp))
        : undefined;

    return {
      totalEvents: logs.length,
      eventsByType,
      lastEvent,
    };
  }
}

export const localStorageWebhookAdapter = new LocalStorageWebhookAdapter();
