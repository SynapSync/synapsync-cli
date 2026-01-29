---
sidebar_position: 13
title: clean
---

# synapsync clean

Clean cache, orphaned symlinks, and temporary files.

## Usage

```bash
synapsync clean [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--cache` | Clean registry cache only |
| `--orphans` | Clean orphaned symlinks only |
| `--temp` | Clean temp files only |
| `--all` | Clean everything |
| `--dry-run` | Preview what would be cleaned |
| `--json` | JSON output |

## What Gets Cleaned

| Target | Location | Description |
|--------|----------|-------------|
| Cache | `.synapsync/cache/` | Registry response cache |
| Orphans | Provider directories | Symlinks pointing to deleted cognitives |
| Temp | `.synapsync/temp/` | Temporary download files |

## Examples

### Preview Cleanup

```bash
synapsync clean --dry-run
```

```
[DRY RUN] Would clean:

Cache:
  • registry-cache.json (2.3 KB)
  • search-cache.json (1.1 KB)

Orphaned symlinks:
  • .claude/skills/old-skill/
  • .cursor/agents/removed-agent.md

Temp files:
  • download-abc123.tmp

Total: 5 items (3.4 KB)
```

### Clean Everything

```bash
synapsync clean --all
```

```
Cleaning...

✓ Removed 2 cache files (3.4 KB)
✓ Removed 2 orphaned symlinks
✓ Removed 1 temp file

Freed 3.4 KB
```

### Clean Only Cache

```bash
synapsync clean --cache
```

### Clean Only Orphans

```bash
synapsync clean --orphans
```

Useful after uninstalling cognitives.

### JSON Output

```bash
synapsync clean --all --json
```

```json
{
  "cache": {
    "files": 2,
    "bytes": 3481
  },
  "orphans": {
    "symlinks": 2
  },
  "temp": {
    "files": 1,
    "bytes": 1024
  },
  "total": {
    "items": 5,
    "bytes": 4505
  }
}
```

## When to Clean

- After uninstalling multiple cognitives (`--orphans`)
- If search results seem stale (`--cache`)
- To free disk space (`--all`)
- Before troubleshooting (`--all`)

## Notes

- `--dry-run` is recommended before `--all`
- Cleaning cache may slow next registry query
- Orphaned symlinks don't affect functionality but clutter directories
