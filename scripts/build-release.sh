#!/bin/bash

set -e

echo "🧹 Cleaning environment..."
watchman watch-del-all || true
sudo rm -rf node_modules
sudo rm -rf android/.cxx android/app/build android/build
sudo rm -rf ~/.gradle/caches ~/.gradle/daemon
sudo rm -rf android/app/build/generated

echo "📦 Reinstalling dependencies..."
yarn install

echo "🩹 Applying patches..."
npx patch-package

echo "🔧 Installing react-native-codegen..."
yarn add --dev react-native-codegen

echo "⚙️  Generating codegen artifacts..."
cd android
./gradlew generateCodegenArtifactsFromSchema

echo "📦 Building release APK..."
./gradlew assembleRelease

echo "✅ Build complete. Find your APK at:"
echo "   android/app/build/outputs/apk/release/app-release.apk"
