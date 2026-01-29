---
sidebar_position: 4
title: status
---

# synapsync status

Show current project status and health overview.

## Usage

```bash
synapsync status
```

## Output

```
Project Status
──────────────

Project:
  Name:           my-project
  Initialized:    Yes
  Config:         synapsync.config.yaml ✓
  Storage:        .synapsync/ ✓

Cognitives:       4 installed
  Skills:         3
  Agents:         1
  Prompts:        0
  Workflows:      0
  Tools:          0

Providers:
  claude:         enabled (.claude/)
  cursor:         enabled (.cursor/)
  openai:         disabled
  windsurf:       disabled
  gemini:         disabled
  copilot:        disabled

Last Sync:        2 hours ago
```

## Information Displayed

### Project Section
- Project name from config
- Initialization status
- Config file presence and validity
- Storage directory status

### Cognitives Section
- Total installed count
- Breakdown by type

### Providers Section
- Each provider's enabled/disabled status
- Configured paths for enabled providers

### Sync Section
- Last sync timestamp
- Sync status (if issues detected)

## Use Cases

- Quick project health check
- Verify setup after `init`
- Check which providers are enabled
- See cognitive counts before/after operations

## Notes

- No options or flags
- Read-only operation
- Run from project root directory
