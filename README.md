# benlei/parse-simple-md-table

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Parses a basic Markdown table and sets an output with a JSON string
representating each row of the table.

## Inputs

<!-- markdownlint-disable MD013 -->

| Input Name | Required | Description                |
| ---------- | -------- | -------------------------- |
| `markdown` | yes      | The Markdown text to parse |

<!-- markdownlint-enable MD013 -->

## Outputs

<!-- markdownlint-disable MD013 -->

| Output Name | Description                          |
| ----------- | ------------------------------------ |
| `result`    | The parsed Markdown as a JSON string |

<!-- markdownlint-enable MD013 -->

## Example

```yaml
- name: Parse Markdown Table
  uses: benlei/parse-simple-md-table@v1
  with:
    markdown: |
      | Hello World | Goodbye World |
      | --- | --- |
      | 123 | abc |
      | foo | bar |
```
