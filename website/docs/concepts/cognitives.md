---
sidebar_position: 1
title: Cognitives
---

# Cognitives

A **cognitive** is a reusable AI capability—instructions, behaviors, or integrations that enhance AI assistants.

## Types

SynapSync supports 5 cognitive types:

| Type | File | Purpose | Sync Mode |
|------|------|---------|-----------|
| **Skill** | `SKILL.md` | Reusable instructions with optional assets | Folder |
| **Agent** | `AGENT.md` | Autonomous task executors | File |
| **Prompt** | `PROMPT.md` | Template prompts with variables | File |
| **Workflow** | `WORKFLOW.yaml` | Multi-step processes | File |
| **Tool** | `TOOL.md` | External integrations | File |

### Skills

Most common type. Instructions that teach AI how to perform specific tasks.

```markdown
---
name: code-reviewer
description: Reviews code for best practices
version: 1.0.0
---

# Code Reviewer

Review code for:
- Security vulnerabilities
- Performance issues
- Best practices
...
```

Skills can include assets (templates, examples) in their folder.

### Agents

Autonomous entities with specific behaviors and goals.

```markdown
---
name: feature-branch-manager
description: Manages git feature branches
version: 1.0.0
---

# Feature Branch Manager

When the user starts a new feature:
1. Create a feature branch
2. Set up the branch structure
...
```

### Prompts

Reusable prompt templates with variable substitution.

```markdown
---
name: code-review-prompt
description: Template for code reviews
variables:
  - language
  - context
---

Review this {{language}} code:
{{context}}
...
```

### Workflows

Multi-step processes defined in YAML.

```yaml
name: ci-pipeline
steps:
  - name: lint
    cognitive: code-linter
  - name: test
    cognitive: test-runner
  - name: review
    cognitive: code-reviewer
```

### Tools

External integrations and function definitions.

```markdown
---
name: github-integration
description: GitHub API integration
---

# GitHub Integration

Functions:
- create_issue(title, body)
- create_pr(branch, title)
...
```

## Storage Structure

Cognitives are organized by type and category:

```
.synapsync/
├── skills/
│   ├── frontend/
│   │   └── react-patterns/
│   │       └── SKILL.md
│   └── general/
│       └── code-reviewer/
│           ├── SKILL.md
│           └── assets/
│               └── checklist.md
├── agents/
│   └── general/
│       └── feature-branch-manager/
│           └── AGENT.md
├── prompts/
├── workflows/
└── tools/
```

## Categories

Cognitives are organized into categories:

- `frontend` — React, Vue, CSS, UI/UX
- `backend` — APIs, databases, servers
- `database` — SQL, migrations, modeling
- `devops` — CI/CD, Docker, Kubernetes
- `security` — Audits, vulnerabilities
- `testing` — Unit tests, E2E, coverage
- `analytics` — Metrics, monitoring
- `automation` — Scripts, workflows
- `general` — Multi-purpose (default)

## Sync Modes

Different types sync differently to providers:

| Sync Mode | Types | Provider Path |
|-----------|-------|---------------|
| **Folder** | Skills | `.claude/skills/skill-name/` |
| **File** | Agents, Prompts, Workflows, Tools | `.claude/agents/agent-name.md` |

Skills sync as folders to preserve their assets. Other types sync as individual files.
