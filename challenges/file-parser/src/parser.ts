/**
 * Parse file operations from OpenCode AI output.
 *
 * OpenCode is an AI coding assistant that outputs file operations like:
 *   → Read src/App.tsx
 *   ← Edit src/App.tsx
 *   ← Create src/new-file.tsx
 *
 * This parser extracts the operation type and file path from these lines.
 */

export interface FileOperation {
  tool: 'read_file' | 'edit_file' | 'create_file';
  file: string;
}

/**
 * Parse a single line of OpenCode output to extract file operations.
 * 
 * Supported formats:
 * - Arrow format: "→ Read <path>" or "← Edit|Write|Create <path>"
 * - Legacy format: "Writing <path>", "Creating <path>", "File: <path>"
 * 
 * @param line - A single line of OpenCode output
 * @returns FileOperation object if the line contains a file operation, null otherwise
 */
export function parseFileOperation(line: string): FileOperation | null {
  // OpenCode arrow format: "→ Read <path>" or "← Edit|Write|Create <path>"
  const arrowRead = line.match(/^[\u2192>]\s*Read\s+(.+)$/i);
  if (arrowRead) {
    return { tool: 'read_file', file: arrowRead[1].trim() };
  }

  const arrowWrite = line.match(/^[\u2190<]\s*(?:Edit|Write|Create)\s+(.+)$/i);
  if (arrowWrite) {
    const file = arrowWrite[1].trim();
    return { tool: line.toLowerCase().includes('create') ? 'create_file' : 'edit_file', file };
  }

  // Legacy fallback patterns
  const legacyPatterns = [
    /(?:Writing|Editing|Modifying)\s+['"]?([^\s'"]+)['"]?/i,
    /(?:Creating|Adding)\s+['"]?([^\s'"]+)['"]?/i,
    /(?:File|Updated|Created):\s*['"]?([^\s'"]+)['"]?/i,
  ];

  for (const pattern of legacyPatterns) {
    const match = line.match(pattern);
    if (match && match[1]) {
      const file = match[1];
      return { tool: line.toLowerCase().includes('creat') ? 'create_file' : 'edit_file', file };
    }
  }

  return null;
}
