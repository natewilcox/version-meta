#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function emitVersionJson(packageJsonPath: string, outputDir: string): void {

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

emitVersionJson('./package.json', './');