import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true
  });
}

export function readProperties(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const props = {};
  for (const line of lines) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...rest] = line.split('=');
      props[key.trim()] = rest.join('=').trim();
    }
  }
  return props;
}

// Add more reusable generic methods here as needed
