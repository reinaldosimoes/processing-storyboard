import {
  ShieldCheck,
  Sparkles,
  Globe,
  ScanSearch,
  Activity,
  Database,
  Bell,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";

/**
 * Available operation types for processing steps
 * Each type has a specific purpose and visual representation
 */
export type OperationType =
  | "validate" // Input validation and sanitization
  | "enrich" // Data enrichment and enhancement
  | "external" // External API calls and integrations
  | "fraud" // Fraud detection and sanctions screening
  | "risk" // Risk assessment and scoring
  | "persist" // Data persistence and storage
  | "notify" // Notifications and webhooks
  | "payment" // Payment processing
  | "success" // Operation completion
  | "error"; // Error handling and fallback

/**
 * Operation latency levels that control progress bar speed
 * - slow: External API calls, fraud checks
 * - average: Data enrichment, risk scoring
 * - fast: Validation, persistence, notifications
 */
export type OperationLatency = "slow" | "average" | "fast";

/**
 * Operation configuration including visual and behavioral properties
 */
export interface Operation {
  type: OperationType;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  latency: OperationLatency;
}

/**
 * Operation configurations for each type
 * - Each operation has a unique icon and color
 * - Latency determines progress bar animation speed
 * - Icons and colors help users identify operation types
 */
export const operations: Record<OperationType, Operation> = {
  validate: {
    type: "validate",
    title: "Validate / Sanitize",
    description: "Validate and sanitize input data",
    icon: ShieldCheck,
    color: "text-blue-500",
    latency: "fast",
  },
  enrich: {
    type: "enrich",
    title: "Enrich Data",
    description: "Enhance data with additional information",
    icon: Sparkles,
    color: "text-purple-500",
    latency: "average",
  },
  external: {
    type: "external",
    title: "External API Call",
    description: "Make external API requests",
    icon: Globe,
    color: "text-green-500",
    latency: "slow",
  },
  fraud: {
    type: "fraud",
    title: "Fraud / Sanctions Screening",
    description: "Screen for fraud and sanctions",
    icon: ScanSearch,
    color: "text-red-500",
    latency: "slow",
  },
  risk: {
    type: "risk",
    title: "Risk Scoring",
    description: "Calculate risk scores",
    icon: Activity,
    color: "text-orange-500",
    latency: "average",
  },
  persist: {
    type: "persist",
    title: "Persistence / DB Write",
    description: "Store data in database",
    icon: Database,
    color: "text-indigo-500",
    latency: "fast",
  },
  notify: {
    type: "notify",
    title: "Notification / Webhook",
    description: "Send notifications and webhooks",
    icon: Bell,
    color: "text-pink-500",
    latency: "fast",
  },
  payment: {
    type: "payment",
    title: "Payment Capture",
    description: "Process payment transactions",
    icon: CreditCard,
    color: "text-teal-500",
    latency: "slow",
  },
  success: {
    type: "success",
    title: "Success / Complete",
    description: "Operation completed successfully",
    icon: CheckCircle,
    color: "text-emerald-500",
    latency: "fast",
  },
  error: {
    type: "error",
    title: "Error / Fallback",
    description: "Operation failed or fallback triggered",
    icon: XCircle,
    color: "text-rose-500",
    latency: "fast",
  },
};
