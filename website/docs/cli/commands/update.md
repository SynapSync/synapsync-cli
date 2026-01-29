---
sidebar_position: 11
title: update
---

# synapsync update

Update installed cognitives to their latest versions.

## Usage

```bash
synapsync update [cognitive] [options]
```

## Options

| Option | Description |
|--------|-------------|
| `-a, --all` | Update all cognitives |
| `-f, --force` | Force update even if latest |
| `--dry-run` | Preview updates without applying |
| `--json` | JSON output |

## Examples

### Check for Updates

```bash
synapsync update
```

```
Checking for updates...

Updates available:
  code-reviewer     1.0.0 → 1.1.0
  react-patterns    2.0.0 → 2.1.0

Run 'synapsync update --all' to update all
Run 'synapsync update <name>' to update specific cognitive
```

### Update Specific Cognitive

```bash
synapsync update code-reviewer
```

```
✓ Updated code-reviewer: 1.0.0 → 1.1.0
```

### Update All

```bash
synapsync update --all
```

```
Updating all cognitives...

✓ code-reviewer: 1.0.0 → 1.1.0
✓ react-patterns: 2.0.0 → 2.1.0
⊘ api-designer: already latest (1.0.0)

Updated 2 cognitives
```

### Dry Run

```bash
synapsync update --all --dry-run
```

```
[DRY RUN] Would update:

  code-reviewer     1.0.0 → 1.1.0
  react-patterns    2.0.0 → 2.1.0
```

### Force Update

```bash
synapsync update code-reviewer --force
```

Re-downloads even if already at latest version.

### JSON Output

```bash
synapsync update --json
```

```json
{
  "updates": [
    {
      "name": "code-reviewer",
      "current": "1.0.0",
      "latest": "1.1.0",
      "hasUpdate": true
    }
  ]
}
```

## Notes

- Only checks cognitives installed from the registry
- Local and GitHub-installed cognitives are skipped
- Run `sync` after update to refresh provider symlinks
