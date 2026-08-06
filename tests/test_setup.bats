#!/usr/bin/env bats

setup() {
  # Create a temporary directory for tests
  TEST_DIR="$(mktemp -d)"

  # Copy the script we want to test to the test directory
  # Note: assuming tests is run from the root of the repo
  cp "./setup.sh" "$TEST_DIR/"

  # Create a mock _config.yml to modify
  cat << 'CONFIG_EOF' > "$TEST_DIR/_config.yml"
name: "Old Name"
title: "Old Title"
institution: "Old Inst"
email: old@email.com
CONFIG_EOF

  # Move into the test directory
  cd "$TEST_DIR"
}

teardown() {
  # Go back to the original directory
  cd "$BATS_TEST_DIRNAME/.."
  # Remove the temporary test directory
  rm -rf "$TEST_DIR"
}

@test "setup.sh correctly updates _config.yml" {
  # Run the script with mock input via printf
  run bash -c 'printf "New Name\nNew Title\nNew Institution\nnew@example.com\n" | ./setup.sh'

  # Verify exit status is 0 (success)
  [ "$status" -eq 0 ]

  # Verify the config was updated correctly
  run grep '^name: "New Name"' _config.yml
  [ "$status" -eq 0 ]

  run grep '^title: "New Title"' _config.yml
  [ "$status" -eq 0 ]

  run grep '^institution: "New Institution"' _config.yml
  [ "$status" -eq 0 ]

  run grep '^email: new@example.com' _config.yml
  [ "$status" -eq 0 ]
}

@test "setup.sh fails and prompts migration if old config is detected" {
  # Overwrite _config.yml with an old-style one
  cat << 'CONFIG_EOF' > _config.yml
affiliation: "Old Affiliation"
CONFIG_EOF

  # Run the script
  run bash -c 'printf "New Name\nNew Title\nNew Institution\nnew@example.com\n" | ./setup.sh'

  # Verify it fails (status 1)
  [ "$status" -eq 1 ]

  # Verify the error message contains the expected text
  [[ "$output" =~ "old-style _config.yml" ]]
}

@test "setup.sh cleans up .bak files" {
  # Run the script with mock input via printf
  run bash -c 'printf "New Name\nNew Title\nNew Institution\nnew@example.com\n" | ./setup.sh'

  # Verify exit status is 0 (success)
  [ "$status" -eq 0 ]

  # Verify that _config.yml.bak does not exist
  [ ! -f "_config.yml.bak" ]
}
