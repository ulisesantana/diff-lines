# diff-lines

[![Build Status](https://app.travis-ci.com/ulisesantana/diff-lines.svg?branch=main)](https://app.travis-ci.com/ulisesantana/diff-lines)
[![codecov](https://codecov.io/gh/ulisesantana/diff-lines/branch/main/graph/badge.svg?token=RuP84Q4Un9)](https://codecov.io/gh/ulisesantana/diff-lines)
[![Version](https://img.shields.io/npm/v/@ulisesantana%2Fdiff-lines.svg)](https://www.npmjs.com/package/@ulisesantana/diff-lines)
[![Downloads/week](https://img.shields.io/npm/dw/@ulisesantana%2Fdiff-lines.svg)](https://npmjs.org/package/@ulisesantana/diff-lines)
[![License](https://img.shields.io/npm/l/@ulisesantana%2Fdiff-lines.svg)](https://github.com/ulisesantana/diff-lines/blob/master/package.json)

This project make a diff between two files and extract the unique and common lines based only on values instead of values and position.

![Use example](docs/use.png)

## Usage

```shell
USAGE: node diff-lines [OPTION1] [OPTION2]... arg1 arg2...
The following options are supported:
  -c, --common          Generate report with common values
  -o, --output <ARG1>   File where the report will be written
  -u, --unique          Generate report with unique values
```
