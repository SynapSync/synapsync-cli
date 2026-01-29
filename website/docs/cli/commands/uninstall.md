---
sidebar_position: 8
title: uninstall
---

# synapsync uninstall

Remove an installed cognitive.

## Usage

```bash
synapsync uninstall <name> [options]
synapsync rm <name> [options]
```

## Options

| Option | Description |
|--------|-------------|
| `-f, --force` | Skip confirmation prompt |
| `--keep-files` | Keep files, only remove from manifest |

## Examples

### Basic Uninstall

```bash
synapsync uninstall code-reviewer
```

```
? Are you sure you want to uninstall 'code-reviewer'? (y/N) y

✓ Removed from manifest
✓ Deleted .synapsync/skills/general/code-reviewer/
✓ Removed symlink .claude/skills/code-reviewer/

Uninstalled code-reviewer
```

### Force Uninstall

```bash
synapsync uninstall code-reviewer --force
```

Skips confirmation prompt.

### Keep Files

```bash
synapsync uninstall code-reviewer --keep-files
```

Removes from manifest but keeps files in `.synapsync/`.

## Aliases

`rm` is an alias for `uninstall`:

```bash
synapsync rm code-reviewer
synapsync rm code-reviewer --force
```

## What Gets Removed

1. Entry from `manifest.json`
2. Files from `.synapsync/<type>/<category>/<name>/`
3. Symlinks from all enabled provider directories

## Notes

- Symlinks in provider directories are automatically removed
- Use `--keep-files` to preserve the cognitive for manual backup
- Run `synapsync clean --orphans` if symlinks remain after uninstall
