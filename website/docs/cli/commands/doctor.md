---
sidebar_position: 12
title: doctor
---

# synapsync doctor

Diagnose and fix issues with your SynapSync project.

## Usage

```bash
synapsync doctor [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--fix` | Auto-fix detected issues |
| `--check <checks...>` | Run specific checks only |
| `--verbose` | Show detailed output |
| `--json` | JSON output |

## Checks Performed

| Check | Description | Auto-fixable |
|-------|-------------|--------------|
| `node-version` | Node.js >= 20.0.0 | No |
| `synapsync-dir` | `.synapsync/` exists | Yes |
| `config-valid` | Config file is valid YAML | No |
| `manifest-exists` | `manifest.json` exists | Yes |
| `manifest-consistency` | Manifest matches filesystem | Yes |
| `providers-configured` | At least one provider enabled | No |
| `symlinks-valid` | Provider symlinks point to valid targets | Yes |
| `registry-connectivity` | Can reach the registry | No |

## Examples

### Run All Checks

```bash
synapsync doctor
```

```
Running diagnostics...

✓ node-version        Node.js v20.10.0
✓ synapsync-dir       .synapsync/ exists
✓ config-valid        Config is valid
✓ manifest-exists     manifest.json exists
⚠ manifest-consistency  2 orphaned entries
✓ providers-configured  1 provider enabled
✗ symlinks-valid       3 broken symlinks
✓ registry-connectivity  Registry reachable

Found 2 issues (1 fixable)

Run 'synapsync doctor --fix' to auto-fix
```

### Auto-fix Issues

```bash
synapsync doctor --fix
```

```
Running diagnostics with auto-fix...

✓ node-version        Node.js v20.10.0
✓ synapsync-dir       .synapsync/ exists
✓ config-valid        Config is valid
✓ manifest-exists     manifest.json exists
⚠ manifest-consistency  Fixed: removed 2 orphaned entries
✓ providers-configured  1 provider enabled
⚠ symlinks-valid       Fixed: removed 3 broken symlinks
✓ registry-connectivity  Registry reachable

Fixed 2 issues
```

### Run Specific Checks

```bash
synapsync doctor --check symlinks-valid manifest-consistency
```

### Verbose Output

```bash
synapsync doctor --verbose
```

Shows detailed information about each check.

### JSON Output

```bash
synapsync doctor --json
```

```json
{
  "checks": [
    {
      "name": "node-version",
      "status": "pass",
      "message": "Node.js v20.10.0"
    },
    {
      "name": "symlinks-valid",
      "status": "fail",
      "message": "3 broken symlinks",
      "fixable": true
    }
  ],
  "summary": {
    "passed": 6,
    "failed": 2,
    "fixable": 1
  }
}
```

## Common Issues

### Broken Symlinks

Caused by manually deleting cognitives from `.synapsync/`.

**Fix:** `synapsync doctor --fix` or `synapsync clean --orphans`

### Manifest Inconsistency

Manifest doesn't match filesystem contents.

**Fix:** `synapsync doctor --fix` or `synapsync sync`

### Missing .synapsync Directory

Project not initialized or directory deleted.

**Fix:** `synapsync init` or `synapsync doctor --fix`
