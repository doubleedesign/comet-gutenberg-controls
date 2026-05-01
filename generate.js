import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the component name from the command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name as an argument.');
  process.exit(1);
}

const componentDir = path.join(__dirname, 'src', 'components', componentName);
console.log(componentDir);
if (!fs.existsSync(componentDir)) {
    throw new Error(`Component directory does not exist: ${componentDir}`);
}

// Read the contents of the template file
const templateFilePath = path.join(__dirname, '_template.stories.tsx');
const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
// Replace the placeholder with the actual component name
const storiesContent = templateContent.replaceAll(/ComponentName/g, componentName);

// Create the stories file in src/components/{ComponentName}/stories.tsx
const storiesFilePath = path.join(componentDir, `${componentName}.stories.tsx`);

// Write the new stories file
fs.writeFileSync(storiesFilePath, storiesContent);

console.log(`Stories file created at: ${storiesFilePath}`);