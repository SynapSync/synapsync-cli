---
sidebar_position: 3
title: config
---

# synapsync config

View and modify project configuration.

## Usage

```bash
synapsync config <subcommand> [args]
```

## Subcommands

### list

Show all configuration values:

```bash
synapsync config list
```

```
Configuration
─────────────

project.name:           my-project
project.description:    AI-enhanced development

providers.claude.enabled:   true
providers.claude.path:      .claude
providers.cursor.enabled:   false
providers.cursor.path:      .cursor
...

storage.cognitivesDir:  .synapsync

cli.theme:              default
cli.verbose:            false
```

### get

Get a specific value:

```bash
synapsync config get project.name
```

```
my-project
```

Supports nested keys with dot notation:

```bash
synapsync config get providers.claude.enabled
```

```
true
```

### set

Set a configuration value:

```bash
synapsync config set project.name "new-name"
synapsync config set cli.verbose true
synapsync config set providers.cursor.enabled true
```

## Configuration File

Settings are stored in `synapsync.config.yaml`:

```yaml
project:
  name: my-project
  description: AI-enhanced development

providers:
  claude:
    enabled: true
    path: .claude
  cursor:
    enabled: false
    path: .cursor
  openai:
    enabled: false
    path: .openai
  windsurf:
    enabled: false
    path: .windsurf
  gemini:
    enabled: false
    path: .gemini
  copilot:
    enabled: false
    path: .github

storage:
  cognitivesDir: .synapsync

cli:
  theme: default
  verbose: false
```

## Key Reference

| Key | Type | Description |
|-----|------|-------------|
| `project.name` | string | Project name |
| `project.description` | string | Project description |
| `providers.<name>.enabled` | boolean | Enable/disable provider |
| `providers.<name>.path` | string | Provider directory path |
| `storage.cognitivesDir` | string | Central storage directory |
| `cli.theme` | string | Color theme |
| `cli.verbose` | boolean | Verbose output by default |

## Notes

- Changes take effect immediately
- Use `providers` command for provider-specific shortcuts
- Invalid keys are rejected with an error
