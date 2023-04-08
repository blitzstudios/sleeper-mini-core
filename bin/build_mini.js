#!/usr/bin/env node

const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

const isWindows = os.platform() === 'win32';

const outputFile = 'mini-app';
const zipFile = `${outputFile}.zip`;
const assetsDestPath = {
  ios: path.join(outputFile, 'ios'),
  android: path.join(outputFile, 'android'),
};
const bundleOutputPath = {
  ios: path.join(assetsDestPath["ios"], 'index.bundle'),
  android: path.join(assetsDestPath["android"], 'index.bundle'),
};
const sourcemapOutputPath = {
  ios: path.join(assetsDestPath["ios"], 'index.bundle.map'),
  android: path.join(assetsDestPath["android"], 'index.bundle.map'),
};
const reactNativeCliPath = path.join('node_modules', 'react-native', 'cli.js');

const spawnProcess = (command, errorMessage) => {
  return new Promise((resolve) => {
    const child = isWindows
      ? spawn('cmd.exe', ['/c', command])
      : spawn(command, { shell: true });

    child.stdout.on('data', (data) => {
      process.stdout.write(data); // output the data to the console
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data); // output the error to the console
    });

    child.on('close', (code) => {
      if (code !== 0) {
        printError(errorMessage || `command exited with non-zero code: ${code}`);
        process.exit(1);
      }
      resolve();
    });
  });
};

const printError = (error) => {
  console.error("\n\033[91m" + error + "\033[0m");
};

const printInfo = (message) => {
  console.log("\n\033[96m" + message + "\033[0m");
};

const printComplete = (message) => {
  console.log("\033[92m" + message + "\033[0m");
};

const getBundleCommand = (platform) => {
  return `node ${reactNativeCliPath} webpack-bundle \
  --entry-file index.tsx \
  --platform ${platform} \
  --dev false \
  --reset-cache \
  --bundle-output ${bundleOutputPath[platform]} \
  --sourcemap-output ${sourcemapOutputPath[platform]} \
  --minify false \
  --assets-dest ${assetsDestPath[platform]}`;
};

const deleteCommand = (isWindows ? 'rmdir /s /q ' : 'rm -rf ');
const zipCommand = isWindows ?
  `powershell Compress-Archive -Path ${outputFile} -DestinationPath ${zipFile}` :
  `zip -r ${zipFile} ${outputFile}`;
const openCommand = isWindows ? `start .` : `open .`;
const cleanIndexCommand = `${deleteCommand} ${bundleOutputPath["ios"]} ${bundleOutputPath["android"]} ${sourcemapOutputPath["ios"]} ${sourcemapOutputPath["android"]}`;
const cleanAllCommand = `${deleteCommand} ${outputFile} ${zipFile}`;
const cleanBuildCommand = `${deleteCommand} ${outputFile}`;

const main = async () => {
  // Clean build folders
  await spawnProcess(cleanAllCommand, "clean command exited with non-zero code");

  // Build iOS
  printInfo("Building iOS...");
  await spawnProcess(getBundleCommand("ios"), "webpack-bundle ios command exited with non-zero code");
  printComplete("iOS build complete.");

  // Build Android
  printInfo("Building Android...");
  await spawnProcess(getBundleCommand("android"), "webpack-bundle android command exited with non-zero code");
  printComplete("Android build complete.");

  // Create Zip Archive
  printInfo("Creating zip archive...");
  await spawnProcess(cleanIndexCommand, "clean command exited with non-zero code");
  await spawnProcess(zipCommand, "zip command exited with non-zero code");
  printComplete("Zip archive created successfully at mini-app.zip.");

  // Clean build folders
  await spawnProcess(cleanBuildCommand, "clean command exited with non-zero code");

  // Open output folder
  spawnProcess(openCommand);
};

main();
