import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Design Tokens Contract', () => {
  const stylesDir = path.join(__dirname, '.');
  const cssFiles = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css'));
  
  const definitions = new Set();
  const usages = [];
  const selfReferences = [];

  // Parse all files
  cssFiles.forEach(file => {
    const filePath = path.join(stylesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Find definitions: --token-name:
      const defMatch = line.match(/(--[a-zA-Z0-9-]+)\s*:/);
      if (defMatch) {
        definitions.add(defMatch[1]);
      }

      // Find usages: var(--token-name)
      const usageMatches = [...line.matchAll(/var\((--[a-zA-Z0-9-]+)\)/g)];
      for (const match of usageMatches) {
        usages.push({
          token: match[1],
          file: file,
          line: index + 1
        });

        // Check self-reference
        if (defMatch && defMatch[1] === match[1]) {
          selfReferences.push({
            token: match[1],
            file: file,
            line: index + 1
          });
        }
      }
    });
  });

  it('should not have undefined custom properties', () => {
    const undefinedUsages = usages.filter(u => !definitions.has(u.token));
    
    if (undefinedUsages.length > 0) {
      const messages = undefinedUsages.map(u => `Undefined token ${u.token} used in ${u.file}:${u.line}`);
      throw new Error("Found undefined tokens:\n" + messages.join('\n'));
    }
    
    expect(undefinedUsages.length).toBe(0);
  });

  it('should not have direct self-references', () => {
    if (selfReferences.length > 0) {
      const messages = selfReferences.map(u => `Self-reference token ${u.token} in ${u.file}:${u.line}`);
      throw new Error("Found direct self-references:\n" + messages.join('\n'));
    }
    expect(selfReferences.length).toBe(0);
  });
});
