/**
 * Purge Command
 *
 * Completely remove SynapSync from the project
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Command } from 'commander';
import pc from 'picocolors';
import { ConfigManager } from '../services/config/manager.js';
import { SUPPORTED_PROVIDERS, PROVIDER_PATHS, COGNITIVE_TYPES } from '../core/constants.js';
import { logger } from '../utils/logger.js';

// ============================================
// Types
// ============================================

interface PurgeCommandOptions {
  force?: boolean;
}

// ============================================
// Main Function
// ============================================

/**
 * Execute the purge command - completely remove SynapSync from the project
 */
export function executePurgeCommand(options: PurgeCommandOptions): void {
  logger.line();

  const configManager = ConfigManager.findConfig();
  if (configManager === null) {
    logger.error('No SynapSync project found.');
    return;
  }

  const projectRoot = configManager.getProjectRoot();
  const synapSyncDir = configManager.getSynapSyncDir();

  // Show what will be removed unless --force
  if (options.force !== true) {
    logger.log(`  ${pc.yellow('!')} This will completely remove SynapSync from your project:`);
    logger.line();

    const itemsToRemove = collectItemsToRemove(projectRoot, synapSyncDir);

    for (const item of itemsToRemove) {
      logger.log(`    ${pc.red('✗')} ${item}`);
    }

    logger.line();
    logger.hint('Use --force to confirm and remove everything.');
    logger.log(`  ${pc.dim('To confirm, run:')} synapsync purge --force`);
    return;
  }

  let removedCount = 0;

  try {
    // 1. Remove provider synced content
    removedCount += removeProviderContent(projectRoot);

    // 2. Remove .synapsync directory
    if (fs.existsSync(synapSyncDir)) {
      fs.rmSync(synapSyncDir, { recursive: true, force: true });
      logger.log(`  ${pc.red('✗')} Removed ${path.relative(projectRoot, synapSyncDir)}/`);
      removedCount++;
    }

    // 3. Remove synapsync.config.yaml
    const configPath = path.join(projectRoot, 'synapsync.config.yaml');
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
      logger.log(`  ${pc.red('✗')} Removed synapsync.config.yaml`);
      removedCount++;
    }

    // 4. Clean .gitignore entries
    if (cleanGitignore(projectRoot)) {
      logger.log(`  ${pc.red('✗')} Cleaned SynapSync entries from .gitignore`);
      removedCount++;
    }

    // Summary
    logger.line();
    if (removedCount > 0) {
      logger.log(`  ${pc.green('✓')} SynapSync has been completely removed from this project.`);
    } else {
      logger.log(`  ${pc.green('✓')} Nothing to remove.`);
    }
    logger.line();
  } catch (error) {
    logger.line();
    if (error instanceof Error) {
      logger.error(`Purge failed: ${error.message}`);
    } else {
      logger.error('Purge failed with unknown error');
    }
  }
}

// ============================================
// Collection (for preview)
// ============================================

function collectItemsToRemove(projectRoot: string, synapSyncDir: string): string[] {
  const items: string[] = [];

  // Provider content
  for (const provider of SUPPORTED_PROVIDERS) {
    const providerPaths = PROVIDER_PATHS[provider];
    for (const type of COGNITIVE_TYPES) {
      const typePath = path.join(projectRoot, providerPaths[type]);
      if (fs.existsSync(typePath)) {
        items.push(path.relative(projectRoot, typePath) + '/');
      }
    }
  }

  // .synapsync directory
  if (fs.existsSync(synapSyncDir)) {
    items.push(path.relative(projectRoot, synapSyncDir) + '/');
  }

  // Config file
  const configPath = path.join(projectRoot, 'synapsync.config.yaml');
  if (fs.existsSync(configPath)) {
    items.push('synapsync.config.yaml');
  }

  // .gitignore entries
  const gitignorePath = path.join(projectRoot, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf-8');
    if (content.includes('# SynapSync')) {
      items.push('.gitignore (SynapSync entries)');
    }
  }

  return items;
}

// ============================================
// Removal Functions
// ============================================

function removeProviderContent(projectRoot: string): number {
  let removed = 0;

  for (const provider of SUPPORTED_PROVIDERS) {
    const providerPaths = PROVIDER_PATHS[provider];

    for (const type of COGNITIVE_TYPES) {
      const typePath = path.join(projectRoot, providerPaths[type]);
      if (fs.existsSync(typePath)) {
        fs.rmSync(typePath, { recursive: true, force: true });
        logger.log(`  ${pc.red('✗')} Removed ${path.relative(projectRoot, typePath)}/`);
        removed++;
      }
    }

    // Remove empty provider directory
    const providerDir = path.join(projectRoot, providerPaths[COGNITIVE_TYPES[0]], '..');
    const resolvedDir = path.resolve(providerDir);
    if (fs.existsSync(resolvedDir)) {
      try {
        const remaining = fs.readdirSync(resolvedDir);
        if (remaining.length === 0) {
          fs.rmdirSync(resolvedDir);
          logger.log(`  ${pc.red('✗')} Removed empty ${path.relative(projectRoot, resolvedDir)}/`);
          removed++;
        }
      } catch {
        // Directory not empty or other error, skip
      }
    }
  }

  return removed;
}

function cleanGitignore(projectRoot: string): boolean {
  const gitignorePath = path.join(projectRoot, '.gitignore');
  if (!fs.existsSync(gitignorePath)) return false;

  const content = fs.readFileSync(gitignorePath, 'utf-8');
  if (!content.includes('# SynapSync')) return false;

  // Remove the SynapSync block
  const cleaned = content
    .replace(/\n?# SynapSync\n\.synapsync\/manifest\.json\n\*\.local\.yaml\n?/g, '')
    .replace(/^\s*\n$/gm, '\n'); // Clean up extra blank lines

  // If the file is empty or only whitespace after cleanup, remove it
  if (cleaned.trim() === '') {
    fs.unlinkSync(gitignorePath);
  } else {
    fs.writeFileSync(gitignorePath, cleaned, 'utf-8');
  }

  return true;
}

// ============================================
// Command Registration
// ============================================

/**
 * Register purge command with Commander
 */
export function registerPurgeCommand(program: Command): void {
  program
    .command('purge')
    .description('Completely remove SynapSync from the project')
    .option('-f, --force', 'Skip confirmation and remove everything')
    .action((options: PurgeCommandOptions) => {
      executePurgeCommand(options);
    });
}
