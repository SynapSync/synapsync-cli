---
sidebar_position: 15
title: version
---

# synapsync version

Show version information and check for updates.

## Usage

```bash
synapsync version [options]
synapsync --version
synapsync -v
```

## Options

| Option | Description |
|--------|-------------|
| `--check` | Check for available updates |

## Examples

### Show Version

```bash
synapsync version
```

```
synapsync v0.1.0
```

### Short Form

```bash
synapsync -v
synapsync --version
```

```
0.1.0
```

### Check for Updates

```bash
synapsync version --check
```

```
synapsync v0.1.0

Checking for updates...
✓ You're on the latest version
```

Or if an update is available:

```
synapsync v0.1.0

Checking for updates...
⚠ Update available: 0.1.0 → 0.2.0

Run 'npm update -g synapsync' to update
```

## Notes

- Version follows semantic versioning (semver)
- `--check` queries the npm registry
- Update instructions provided when newer version available
