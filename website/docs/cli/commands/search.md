---
sidebar_position: 5
title: search
---

# synapsync search

Search for cognitives in the public registry.

## Usage

```bash
synapsync search [query] [options]
```

## Options

| Option | Description |
|--------|-------------|
| `-t, --type <type>` | Filter by type |
| `-c, --category <cat>` | Filter by category |
| `--tag <tag>` | Filter by tag |
| `-l, --limit <n>` | Limit results (default: 20) |
| `--json` | JSON output |

## Examples

### Search All

```bash
synapsync search
```

Lists all available cognitives in the registry.

### Search by Query

```bash
synapsync search react
```

```
Search Results for "react"
──────────────────────────

  react-patterns     skill     frontend  React component patterns and best practices
  react-testing      skill     testing   Testing patterns for React applications
  react-hooks        skill     frontend  Custom hooks collection

Found 3 results
```

### Filter by Type

```bash
synapsync search --type agent
```

### Filter by Category

```bash
synapsync search --category security
```

### Combine Query and Filters

```bash
synapsync search test --type skill --category testing
```

### Limit Results

```bash
synapsync search --limit 5
```

### JSON Output

```bash
synapsync search react --json
```

```json
[
  {
    "name": "react-patterns",
    "type": "skill",
    "category": "frontend",
    "version": "2.1.0",
    "description": "React component patterns and best practices",
    "tags": ["react", "frontend", "patterns"]
  }
]
```

## Available Filters

### Types
- `skill`, `agent`, `prompt`, `workflow`, `tool`

### Categories
- `frontend`, `backend`, `database`, `devops`, `security`, `testing`, `analytics`, `automation`, `general`

## Notes

- Query searches name, description, and tags
- Without query, lists all cognitives
- Use `list --remote` for browsing without search
- Results are sorted by relevance when using a query
