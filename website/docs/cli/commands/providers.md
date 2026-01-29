---
sidebar_position: 9
title: providers
---

# synapsync providers

Manage AI provider configuration.

## Usage

```bash
synapsync providers [subcommand] [args]
```

## Subcommands

### list (default)

Show all providers and their status:

```bash
synapsync providers
synapsync providers list
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

### enable

Enable a provider:

```bash
synapsync providers enable cursor
```

```
✓ Enabled cursor
  Path: .cursor/
```

### disable

Disable a provider:

```bash
synapsync providers disable openai
```

```
✓ Disabled openai
```

### path

Set custom path for a provider:

```bash
synapsync providers path claude ./custom/claude-dir
```

```
✓ Updated claude path: ./custom/claude-dir
```

## Supported Providers

| Provider | Default Path | Description |
|----------|-------------|-------------|
| `claude` | `.claude/` | Claude Code, Claude Desktop |
| `cursor` | `.cursor/` | Cursor IDE |
| `openai` | `.openai/` | ChatGPT, OpenAI API |
| `windsurf` | `.windsurf/` | Windsurf IDE |
| `gemini` | `.gemini/` | Google Gemini |
| `copilot` | `.github/` | GitHub Copilot |

## Examples

### Enable Multiple Providers

```bash
synapsync providers enable claude
synapsync providers enable cursor
synapsync providers enable copilot
```

### Custom Provider Path

```bash
synapsync providers path copilot ./.github/copilot
```

### Check Status

```bash
synapsync providers list
```

## Notes

- At least one provider should be enabled for sync to work
- Provider directories are created during sync
- Changes update `synapsync.config.yaml`
- Use `config` command for direct config access
