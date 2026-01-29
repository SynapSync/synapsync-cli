---
sidebar_position: 2
title: Providers
---

# Providers

Providers are AI tools that can use your cognitives. SynapSync syncs cognitives to provider-specific directories.

## Supported Providers

| Provider | Directory | Description |
|----------|-----------|-------------|
| **claude** | `.claude/` | Claude Code, Claude Desktop |
| **cursor** | `.cursor/` | Cursor IDE |
| **windsurf** | `.windsurf/` | Windsurf IDE |
| **openai** | `.openai/` | ChatGPT, OpenAI API |
| **gemini** | `.gemini/` | Google Gemini |
| **copilot** | `.github/` | GitHub Copilot |

## Managing Providers

### List Providers

```bash
synapsync providers
```

```
Providers
─────────

  claude      enabled   .claude/
  cursor      disabled  .cursor/
  openai      disabled  .openai/
  windsurf    disabled  .windsurf/
  gemini      disabled  .gemini/
  copilot     disabled  .github/
```

### Enable a Provider

```bash
synapsync providers enable cursor
```

### Disable a Provider

```bash
synapsync providers disable openai
```

### Custom Path

```bash
synapsync providers path claude ./custom/path
```

## Configuration

Provider settings in `synapsync.config.yaml`:

```yaml
providers:
  claude:
    enabled: true
    path: .claude
  cursor:
    enabled: true
    path: .cursor
  openai:
    enabled: false
    path: .openai
```

## Provider Directory Structure

After syncing, each provider directory contains:

```
.claude/
├── skills/
│   └── code-reviewer/           # Folder (symlink)
├── agents/
│   └── feature-branch-manager.md  # File (symlink)
├── prompts/
├── workflows/
└── tools/
```

## Symlinks vs Copies

By default, SynapSync creates **symlinks** pointing to `.synapsync/`:

```
.claude/skills/code-reviewer/ → ../../.synapsync/skills/general/code-reviewer/
```

**Benefits:**
- Single source of truth
- Changes in `.synapsync/` reflect everywhere
- No file duplication

**Windows Note:** If symlinks fail, SynapSync falls back to file copies. Use `--copy` flag to force this behavior:

```bash
synapsync sync --copy
```

## Multi-Provider Sync

Sync to all enabled providers:

```bash
synapsync sync
```

Sync to a specific provider:

```bash
synapsync sync --provider claude
```
