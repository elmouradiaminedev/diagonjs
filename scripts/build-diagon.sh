#!/bin/bash

# Directory paths
VENDORS_DIR="vendors/diagon"
SOURCE_DIR="$VENDORS_DIR/source"
BUILD_DIR="$SOURCE_DIR/build"
DIST_DIR="dist"

# Function to clone
clone_diagon_source() {
  if [ ! -d "$SOURCE_DIR" ]; then
    git clone https://github.com/ArthurSonzogni/Diagon.git "$SOURCE_DIR"
  fi
}

# Function to build Diagon source using emcmake and cmake
build_diagon_source() {
  emcmake cmake -S "$SOURCE_DIR" -B "$BUILD_DIR" \
    -DCMAKE_BUILD_TYPE:STRING=Release \
    -DDIAGON_BUILD_TESTS:BOOL=OFF \
    -DDIAGON_BUILD_TESTS_FUZZER:BOOL=OFF \
    -DCMAKE_CXX_FLAGS="${CMAKE_CXX_FLAGS} -Dmain=Noop -Oz"
  cmake --build "$BUILD_DIR"
}

# Function to copy Diagon artifacts to the appropriate directories
copy_diagon_artifacts() {
  cp "$BUILD_DIR/diagon.js" "$VENDORS_DIR/index.js"
  # cp ./types/diagon.d.ts "$VENDORS_DIR/index.d.ts"
  ln -s "../../types/diagon.d.ts" "./$VENDORS_DIR/index.d.ts"

  # Create dist directory and copy wasm file
  mkdir -p "$DIST_DIR"
  find "$BUILD_DIR" -name 'diagon.js*.wasm' -exec cp {} "$DIST_DIR/" \;
}

clone_diagon_source
build_diagon_source
copy_diagon_artifacts
