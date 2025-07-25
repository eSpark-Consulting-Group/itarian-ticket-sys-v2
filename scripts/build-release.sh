#!/bin/bash

set -e

echo "🧹 Cleaning environment..."
watchman watch-del-all || true
rm -rf node_modules
rm -rf android/.cxx android/app/build android/build
rm -rf ~/.gradle/caches ~/.gradle/daemon
rm -rf android/app/build/generated

echo "📦 Reinstalling dependencies..."
yarn install

echo "🔧 Installing react-native-codegen..."
yarn add --dev react-native-codegen

echo "⚙️  Generating codegen artifacts..."
cd android
./gradlew generateCodegenArtifactsFromSchema

echo "📦 Building release APK..."
./gradlew assembleRelease

echo "✅ Build complete. Find your APK at:"
echo "   android/app/build/outputs/apk/release/app-release.apk"
