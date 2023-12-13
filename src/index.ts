#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

export function addBuildInfo(data: { version: string, date: string }) {

    const versionDiv = document.createElement('div');
    versionDiv.textContent = `Version: ${data.version} - ${data.date}`;
    versionDiv.style.position = 'absolute';
    versionDiv.style.fontSize = '10px';
    versionDiv.style.bottom = '0';
    versionDiv.style.left = '0';
    versionDiv.style.zIndex = '1000';
    versionDiv.style.padding = '2px 4px';
    versionDiv.style.fontFamily = 'Courier New, monospace';
    versionDiv.style.position = 'fixed';
    document.body.appendChild(versionDiv);
}

export function emitVersionJson(packageJsonPath: string, outputDir: string): void {

    console.log("Generating version.json file...")
    // Read the package.json file
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Extract the version
    const { version } = packageJson;

    // Create a new object with the current date and the version
    const versionJson = {
        date: new Date().toISOString(),
        version,
    };

    // Convert the object to a JSON string
    const versionJsonString = JSON.stringify(versionJson, null, 2);

    // Write the JSON string to a new file
    fs.writeFileSync(path.join(outputDir, 'version.json'), versionJsonString);
    console.log("version.json file generated.")
}

//avoid running the script if it is imported
if (require.main === module) {

    // Get the command line arguments
    const args = process.argv.slice(2);
    const targetArg = args.find(arg => arg.startsWith('--target='));
    const targetPath = targetArg ? targetArg.split('=')[1] : './';

    console.log("Will output version.json file to: " + targetPath);
    emitVersionJson('./package.json', targetPath);
  }