/**
 * Core types for SynapSync CLI
 */

import type { CognitiveType, Category, SupportedProvider } from '../core/constants.js';

// ============================================
// Base Cognitive Types
// ============================================

/**
 * Base metadata shared by all cognitive types
 * Cognitives are the building blocks of AI capabilities
 */
export interface CognitiveMetadata {
  name: string;
  type: CognitiveType;
  version: string;
  category: Category;
  description: string;
  author?: string;
  tags?: string[];
  providers?: SupportedProvider[];
}

/**
 * A complete cognitive with content and location
 */
export interface Cognitive extends CognitiveMetadata {
  content: string;
  path: string;
}

/**
 * Record of an installed cognitive
 */
export interface InstalledCognitive {
  name: string;
  type: CognitiveType;
  category: Category;
  version: string;
  installedAt: Date;
  source: 'registry' | 'local' | 'git';
  sourceUrl?: string;
}

// ============================================
// Specialized Cognitive Types
// ============================================

/**
 * Skill - Reusable instruction sets for AI assistants
 */
export interface Skill extends Cognitive {
  type: 'skill';
}

/**
 * Agent - Autonomous AI entities with specific behaviors
 */
export interface Agent extends Cognitive {
  type: 'agent';
  capabilities?: string[];
  systemPrompt?: string;
}

/**
 * Prompt - Reusable prompt templates
 */
export interface Prompt extends Cognitive {
  type: 'prompt';
  variables?: string[];
  examples?: string[];
}

/**
 * Workflow - Multi-step AI processes
 */
export interface Workflow extends Cognitive {
  type: 'workflow';
  steps?: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'prompt' | 'agent' | 'tool' | 'condition';
  config: Record<string, unknown>;
}

/**
 * Tool - External integrations and functions
 */
export interface Tool extends Cognitive {
  type: 'tool';
  schema?: Record<string, unknown>;
  endpoint?: string;
}

// ============================================
// Manifest Types
// ============================================

export interface SynapSyncManifest {
  version: string;
  lastUpdated: string;
  cognitives: Record<string, InstalledCognitive>;
  syncs: Record<
    SupportedProvider,
    {
      lastSync: string;
      method: 'symlink' | 'copy';
      cognitives: string[];
    }
  >;
}

// ============================================
// Provider Types
// ============================================

export interface ProviderConnection {
  id: string;
  name: SupportedProvider;
  status: 'connected' | 'disconnected' | 'error';
  config: ProviderConfig;
  lastSync?: Date;
  createdAt: Date;
}

export interface ProviderConfig {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  apiKeyEnvVar?: string;
}

export interface ProviderHealthStatus {
  healthy: boolean;
  latency?: number;
  error?: string;
}

// ============================================
// Configuration Types
// ============================================

export interface SyncConfig {
  defaultMethod: 'symlink' | 'copy';
  providers: Partial<
    Record<
      SupportedProvider,
      {
        enabled: boolean;
        paths?: Partial<Record<CognitiveType, string>>;
      }
    >
  >;
}

export interface CLIConfig {
  theme: 'auto' | 'light' | 'dark';
  color: boolean;
  verbose: boolean;
}

export interface ProjectConfig {
  name: string;
  version: string;
  cli: CLIConfig;
  storage: {
    dir: string;
  };
  sync: SyncConfig;
  providers: Partial<Record<SupportedProvider, ProviderConnection>>;
}

// ============================================
// Command Types
// ============================================

export interface CommandContext {
  cwd: string;
  config?: ProjectConfig;
  verbose: boolean;
}

// ============================================
// Registry Types
// ============================================

export interface RegistryCognitive {
  name: string;
  type: CognitiveType;
  version: string;
  description: string;
  author: string;
  downloads: number;
  stars: number;
  lastUpdated: string;
}

export interface RegistrySearchResult {
  cognitives: RegistryCognitive[];
  total: number;
  page: number;
  perPage: number;
}

// ============================================
// Re-exports
// ============================================
export type { CognitiveType, Category, SupportedProvider };
