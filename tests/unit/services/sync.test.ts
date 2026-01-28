/**
 * SyncEngine Tests
 *
 * Note: Full integration tests for SyncEngine require complex mocking.
 * These tests focus on the type definitions and basic contract.
 */

import { describe, it, expect } from 'vitest';
import type { SyncResult, SyncOptions, SyncAction } from '../../../src/services/sync/types.js';

describe('Sync Types', () => {
  describe('SyncResult', () => {
    it('should have correct shape', () => {
      const result: SyncResult = {
        success: true,
        added: 1,
        removed: 0,
        updated: 2,
        unchanged: 10,
        total: 13,
        errors: [],
        actions: [],
        duration: 100,
      };

      expect(result.success).toBe(true);
      expect(result.added).toBe(1);
      expect(result.total).toBe(13);
    });

    it('should support provider results', () => {
      const result: SyncResult = {
        success: true,
        added: 0,
        removed: 0,
        updated: 0,
        unchanged: 5,
        total: 5,
        errors: [],
        actions: [],
        duration: 50,
        providerResults: [
          {
            provider: 'claude',
            created: [],
            skipped: [],
            removed: [],
            errors: [],
            method: 'symlink',
          },
        ],
      };

      expect(result.providerResults).toBeDefined();
      expect(result.providerResults?.[0].provider).toBe('claude');
    });
  });

  describe('SyncOptions', () => {
    it('should support all option types', () => {
      const options: SyncOptions = {
        dryRun: true,
        force: false,
        manifestOnly: false,
        types: ['skill', 'agent'],
        categories: ['frontend'],
        provider: 'claude',
        copy: false,
      };

      expect(options.dryRun).toBe(true);
      expect(options.types).toContain('skill');
      expect(options.provider).toBe('claude');
    });

    it('should allow partial options', () => {
      const options: SyncOptions = {};
      expect(options.dryRun).toBeUndefined();
    });
  });

  describe('SyncAction', () => {
    it('should support add operation', () => {
      const action: SyncAction = {
        operation: 'add',
        cognitive: {
          name: 'new-skill',
          type: 'skill',
          category: 'general',
          path: '/path/to/skill',
          filePath: '/path/to/skill/skill.md',
          hash: 'abc123',
          metadata: {},
        },
        reason: 'New cognitive found',
      };

      expect(action.operation).toBe('add');
      expect(typeof action.cognitive).toBe('object');
    });

    it('should support remove operation', () => {
      const action: SyncAction = {
        operation: 'remove',
        cognitive: 'old-skill',
        reason: 'No longer exists',
      };

      expect(action.operation).toBe('remove');
      expect(typeof action.cognitive).toBe('string');
    });

    it('should support update operation', () => {
      const action: SyncAction = {
        operation: 'update',
        cognitive: {
          name: 'modified-skill',
          type: 'skill',
          category: 'frontend',
          path: '/path',
          filePath: '/path/skill.md',
          hash: 'newhash',
          metadata: { version: '2.0.0' },
        },
        reason: 'Content changed',
      };

      expect(action.operation).toBe('update');
    });
  });
});
