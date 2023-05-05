const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define the source and destination directories
const srcDir = './build';
const destDir = process.env.REMOTE_DEST_BUILD;
const skippedDirectories = [];

// Promisify the fs functions we'll be using
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const copyFile = promisify(fs.copyFile);

// Clean up the destination directory before copying
async function cleanupDestDir() {
  try {
    const destFiles = await readdir(destDir);
    for (const file of destFiles) {
      const filePath = path.join(destDir, file);
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) {
        await unlink(filePath);
      }
    }
  } catch (err) {
    console.error(`Error cleaning up destination directory: ${err}`);
  }
}

async function copyDirectory(src, dest) {
    try {
        await fs.promises.mkdir(dest, { recursive: true });
        const files = await readdir(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            const fileStat = await stat(srcPath);
            if (fileStat.isDirectory()) {
                await copyDirectory(srcPath, destPath); // recursive call for subdirectories
            } else {
                await copyFile(srcPath, destPath);
            }
        }
    } catch (err) {
        console.error(`Error copying directory ${src}: ${err}`);
    }
}

// Copy files from source to destination directory
async function copyFiles() {
  try {
    const srcFiles = await readdir(srcDir);
    for (const file of srcFiles) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      const fileStat = await stat(srcPath);
      if (fileStat.isDirectory() && skippedDirectories.includes(file)) {
        console.log(`Skipping directory ${file}`);
        continue;
      }
      if (fileStat.isDirectory()) {
        console.log(`Copying directory ${file}`);
        await copyDirectory(srcPath, destPath); // new function for copying directories
      } else {
        console.log(`Copying file ${file}`);
        await copyFile(srcPath, destPath);
      }
    }
    console.log(`\n\x1b[32mFiles copied successfully!\x1b[0m\n`);
  } catch (err) {
    console.error(`Error copying files: ${err}`);
  }
}

// Run the cleanup and copy functions
async function run() {
  await cleanupDestDir();
  await copyFiles();
}

console.log(`\n\x1b[32mPublish to directory: ${destDir}\x1b[0m\n`);
run();