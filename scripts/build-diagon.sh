#!/bin/bash

VENDORS_DIR="vendors/diagon"
SOURCE_DIR="$VENDORS_DIR/source"
BUILD_DIR="$SOURCE_DIR/build"
DIST_DIR="dist"

clone_diagon_source() {
  if [ ! -d "$SOURCE_DIR" ]; then
    git clone https://github.com/ArthurSonzogni/Diagon.git "$SOURCE_DIR"
  fi
}

build_diagon_source() {
  emcmake cmake -S "$SOURCE_DIR" -B "$BUILD_DIR" \
    -DCMAKE_BUILD_TYPE:STRING=Release \
    -DDIAGON_BUILD_TESTS:BOOL=OFF \
    -DDIAGON_BUILD_TESTS_FUZZER:BOOL=OFF \
    -DCMAKE_CXX_FLAGS="${CMAKE_CXX_FLAGS} -Dmain=Noop -Oz -s WASM_ASYNC_COMPILATION=0"
  cmake --build "$BUILD_DIR"
}

copy_diagon_artifacts() {
  cp "$BUILD_DIR/diagon.js" "$VENDORS_DIR/index.js"
  ln -s "../../types/diagon.d.ts" "./$VENDORS_DIR/index.d.ts"
  find "$BUILD_DIR" -name 'diagon.js*.wasm' -exec cp {} "$VENDORS_DIR/" \;

  mkdir -p "$DIST_DIR"
  find "$BUILD_DIR" -name 'diagon.js*.wasm' -exec cp {} "$DIST_DIR/" \;
}

clone_diagon_source
build_diagon_source
copy_diagon_artifacts
