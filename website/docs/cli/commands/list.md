---
sidebar_position: 7
title: list
---

# synapsync list

List installed cognitives or browse the registry.

## Usage

```bash
synapsync list [options]
synapsync ls [options]
```

## Options

| Option | Description |
|--------|-------------|
| `-t, --type <type>` | Filter by type |
| `-c, --category <cat>` | Filter by category |
| `-r, --remote` | Browse registry instead of local |
| `--json` | JSON output |

## Examples

### List Installed

```bash
synapsync list
```

```
Installed Cognitives
────────────────────

Skills (3)
  code-reviewer      v1.0.0  general   Reviews code for best practices
  react-patterns     v2.1.0  frontend  React component patterns
  api-designer       v1.0.0  backend   API design guidelines

Agents (1)
  feature-branch     v1.0.0  general   Manages feature branches

Total: 4 cognitives
```

### Filter by Type

```bash
synapsync list --type skill
```

```
Skills (3)
  code-reviewer      v1.0.0  general
  react-patterns     v2.1.0  frontend
  api-designer       v1.0.0  backend
```

### Filter by Category

```bash
synapsync list --category frontend
```

### Browse Registry

```bash
synapsync list --remote
```

```
Registry Cognitives
───────────────────

Skills (25)
  code-reviewer      v1.0.0  Reviews code for best practices
  test-generator     v1.2.0  Generates unit tests
  ...

Use 'synapsync add <name>' to add
```

### JSON Output

```bash
synapsync list --json
```

```json
[
  {
    "name": "code-reviewer",
    "type": "skill",
    "version": "1.0.0",
    "category": "general",
    "description": "Reviews code for best practices"
  }
]
```

### Combine Filters

```bash
synapsync list --type skill --category frontend --json
```

## Aliases

`ls` is an alias for `list`:

```bash
synapsync ls
synapsync ls --remote
```

## Notes

- Without `--remote`, shows only locally installed cognitives
- With `--remote`, queries the public registry
- Use `search` for text-based registry queries
