---
sidebar_position: 16
title: info
---

# synapsync info

Display information about SynapSync concepts.

## Usage

```bash
synapsync info [topic]
```

## Available Topics

| Topic | Description |
|-------|-------------|
| `cognitives` | Types of cognitives (skills, agents, etc.) |
| `install` | Installation sources and methods |
| `providers` | Supported AI providers |
| `categories` | Cognitive categories |
| `sync` | How synchronization works |
| `structure` | Project directory structure |

## Examples

### List All Topics

```bash
synapsync info
```

```
SynapSync Info
──────────────

Available topics:
  cognitives    Types of cognitives
  install       Installation sources
  providers     AI providers
  categories    Cognitive categories
  sync          Synchronization
  structure     Directory structure

Run 'synapsync info <topic>' for details
```

### Cognitive Types

```bash
synapsync info cognitives
```

```
Cognitive Types
───────────────

skill       Reusable instructions (SKILL.md)
agent       Autonomous task executors (AGENT.md)
prompt      Template prompts (PROMPT.md)
workflow    Multi-step processes (WORKFLOW.yaml)
tool        External integrations (TOOL.md)
```

### Installation Sources

```bash
synapsync info install
```

```
Installation Sources
────────────────────

Registry:   synapsync add <name>
GitHub:     synapsync add github:user/repo
Local:      synapsync add ./path/to/cognitive
```

### Providers

```bash
synapsync info providers
```

```
Supported Providers
───────────────────

claude      Claude Code, Desktop       .claude/
cursor      Cursor IDE                 .cursor/
openai      ChatGPT, OpenAI API       .openai/
windsurf    Windsurf IDE              .windsurf/
gemini      Google Gemini             .gemini/
copilot     GitHub Copilot            .github/
```

## Notes

- Quick reference without leaving the terminal
- Topics match documentation sections
- Use `--help` for command-specific help
