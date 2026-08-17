import { copyFile, mkdir } from 'node:fs/promises';

const outputDirectory = new URL('../dist/server/', import.meta.url);

await mkdir(outputDirectory, { recursive: true });
await copyFile(new URL('../worker/index.js', import.meta.url), new URL('index.js', outputDirectory));
