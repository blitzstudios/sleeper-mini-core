#!/usr/bin/env node

const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const readLine = require('readline');
const fs = require('fs');

const isWindows = os.platform() === 'win32';

const getCommands = (projectName) => {
  // Pathing
  const distPath = path.join('dist', projectName);
  const zipFilePath = `${distPath}.zip`;
  const assetsDestPath = {
    ios: path.join(distPath, 'ios'),
    android: path.join(distPath, 'android'),
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
  
  // Commands
  const removeDir = (isWindows ? 'rmdir /s /q ' : 'rm -rf ');
  // TODO (Windows): double check this zip command.
  const zip = isWindows ?
    `powershell Compress-Archive -Path "${distPath}" -DestinationPath "${zipFilePath}"` :
    `cd dist && zip -r "${projectName}.zip" * && cd -`;
  const openFile = isWindows ? `start .` : `open .`;
  const cleanIndex = `${removeDir} "${bundleOutputPath["ios"]}" "${bundleOutputPath["android"]}" "${sourcemapOutputPath["ios"]}" "${sourcemapOutputPath["android"]}"`;
  const cleanAll = `${removeDir} dist node_modules`;
  const cleanBuild = `${removeDir} "${distPath}" "${assetsDestPath["ios"]}" "${assetsDestPath["android"]}"`;
  const install = `yarn install && cd ios && pod install && cd -`;

  const getBundleCommand = (platform) => {
    return `node "${reactNativeCliPath}" webpack-bundle \
    --entry-file ./node_modules/@sleeperhq/mini-core/start.tsx \
    --platform ${platform} \
    --dev false \
    --reset-cache \
    --bundle-output "${bundleOutputPath[platform]}" \
    --sourcemap-output "${sourcemapOutputPath[platform]}" \
    --minify false \
    --assets-dest "${assetsDestPath[platform]}" \
    --webpackConfig ./node_modules/@sleeperhq/mini-core/webpack.config.js`;
  };
  
  // Exposed
  return {
    bundleIOS: getBundleCommand('ios'),
    bundleAndroid: getBundleCommand('android'),
    zip,
    openFile,
    cleanIndex,
    cleanAll,
    cleanBuild,
    zipFilePath,
    install,
  }
}

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

const getInput = (message, fallback) => {
  const interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    interface.question("\n\033[96m[current: " + fallback + "]\033[0m " + message, (name) => {
      const result = name.trim();
      if (!result) {
        resolve(fallback);
      }
      resolve(name.trim());
    });
  });
};

const getProjectName = () => {
  const appJsonPath = 'app.json';
  const appJson = JSON.parse(fs.readFileSync(appJsonPath));
  return appJson.name;
}

const setProjectName = (name) => {
  const podfilePath = path.join('ios', 'Podfile');
  const podfileString = fs.readFileSync(podfilePath).toString();
  const newPodfileString = podfileString.replace(/target '.*'/, `target '${name}'`);
  fs.writeFileSync(podfilePath, newPodfileString);
}

const validateProjectName = (name) => {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(name);
}

const main = async () => {
  // Enter project name.
  const fallback = getProjectName();
  const projectName = await getInput("Enter project name: ", fallback);
  if (!validateProjectName(projectName)) {
    printError("Invalid project name. Only alphanumeric characters and underscores are allowed.");
    process.exit(1);
  }
  
  if (projectName !== fallback) {
    await spawnProcess(`yarn react-native-rename "${projectName}" --skipGitStatusCheck`, "rename command exited with non-zero code");
    setProjectName(projectName);
  }

  const commands = getCommands(projectName);

  // Clean build folders
  await spawnProcess(commands.cleanAll, "clean command exited with non-zero code");

  // Run yarn + pod install
  await spawnProcess(commands.install, "clean command exited with non-zero code");

  // Build iOS
  printInfo("Building iOS...");
  await spawnProcess(commands.bundleIOS, "webpack-bundle ios command exited with non-zero code");
  printComplete("iOS build complete.");

  // Build Android
  printInfo("Building Android...");
  await spawnProcess(commands.bundleAndroid, "webpack-bundle android command exited with non-zero code");
  printComplete("Android build complete.");

  // Create Zip Archive
  printInfo("Creating zip archive...");
  await spawnProcess(commands.cleanIndex, "clean command exited with non-zero code");
  await spawnProcess(commands.zip, "zip command exited with non-zero code");
  printComplete(`Zip archive created successfully at ${commands.zipFilePath}`);

  // Clean build folders
  await spawnProcess(commands.cleanBuild, "clean command exited with non-zero code");

  // Open output folder
  await spawnProcess(commands.openFile);
  process.exit(0);
};

main();
