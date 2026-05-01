# .NET Profile

Use for repositories containing `.sln`, `.slnx`, `.csproj`, or `Directory.Build.*`.

## Detect

- solution files
- project files
- test project naming conventions
- task runner such as `just`, `make`, or PowerShell scripts
- whether frontend build steps are embedded in MSBuild

## Adaptation Notes

- Prefer repository-provided task commands over raw `dotnet` commands.
- If raw `dotnet` is used, preserve any repository-specific MSBuild flags.
- Map source areas to affected test projects when possible.
- Ask before running application hosts or long-lived processes.

## Candidate Commands

Only use these if the repository has no better local convention:

```text
dotnet build <solution-or-project>
dotnet test <test-project-or-solution>
dotnet format --verify-no-changes
```
