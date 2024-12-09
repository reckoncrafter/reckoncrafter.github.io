#!/usr/bin/env bash
for file in *.md; do
  if [ -f "$file" ]; then
    output="${file%.md}.html"
    multimarkdown "$file" -o "$output"
  fi
done
