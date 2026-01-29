---
sidebar_position: 2
title: init
---

# synapsync init

Initialize a new SynapSync project in the current directory.

## Usage

```bash
synapsync init [options]
```

## Options

| Option | Description |
|--------|-------------|
| `-n, --name <name>` | Project name |
| `-d, --description <desc>` | Project description |
| `-p, --provider <provider>` | Enable provider (can be repeated) |
| `-y, --yes` | Skip prompts, use defaults |

## Examples

### Interactive Setup

```bash
synapsync init
```

Prompts for:
- Project name
- Description
- Providers to enable

### Non-interactive

```bash
synapsync init --yes
```

Uses defaults:
- Name: current directory name
- Provider: Claude enabled

### With Options

```bash
synapsync init --name "my-project" --provider claude --provider cursor
```

## Created Files

```
project/
├── synapsync.config.yaml    # Configuration file
└── .synapsync/
    └── manifest.json        # Empty manifest
```

### synapsync.config.yaml

```yaml
project:
  name: my-project
  description: ""

providers:
  claude:
    enabled: true
    path: .claude
  cursor:
    enabled: false
    path: .cursor
  # ...

storage:
  cognitivesDir: .synapsync

cli:
  theme: default
  verbose: false
```

## Notes

- Run in your project's root directory
- Safe to run in existing projects (won't overwrite)
- Creates `.synapsync/` in `.gitignore` if git repo detected
