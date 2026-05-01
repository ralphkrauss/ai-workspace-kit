# Python Profile

Use for repositories containing `pyproject.toml`, `requirements.txt`, `uv.lock`,
`poetry.lock`, or Python package directories.

## Detect

- package manager: `uv`, Poetry, Hatch, pip-tools, pip
- test framework, usually pytest
- type checker and linter
- virtual environment policy

## Adaptation Notes

- Prefer repository-provided task commands.
- Ask before creating or modifying virtual environments.
- Ask before installing dependencies.
- Keep generated caches and local env files out of AI workspace changes.

## Candidate Commands

Only use these if the repository has no better local convention:

```text
uv run pytest
python -m pytest
ruff check .
mypy .
```
