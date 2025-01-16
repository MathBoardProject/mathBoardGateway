#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to the script directory
cd "$SCRIPT_DIR"

echo "Current directory: $SCRIPT_DIR"

#Define source files
source_file="$(pwd)/envTemplate.txt"
target_file="$(pwd)/../.env"

# Error handling
if [[ ! -f $source_file ]]; then
  echo "Error: Source file $source_file does not exist."
  exit 1
fi

# Copy contents
cat "$source_file" > "$target_file"

echo "Contents of $source_file have been copied to $target_file."
