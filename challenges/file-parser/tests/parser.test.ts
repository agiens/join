import { describe, it, expect } from 'vitest';
import { parseFileOperation } from '../src/parser.js';

describe('parseFileOperation - Basic Cases (PASSING)', () => {
  it('parses arrow style read operations', () => {
    expect(parseFileOperation('→ Read src/App.tsx')).toEqual({ 
      tool: 'read_file', 
      file: 'src/App.tsx' 
    });
  });

  it('parses arrow style edit operations', () => {
    expect(parseFileOperation('← Edit src/App.tsx')).toEqual({ 
      tool: 'edit_file', 
      file: 'src/App.tsx' 
    });
  });

  it('parses arrow style create operations', () => {
    expect(parseFileOperation('← Create src/new.ts')).toEqual({ 
      tool: 'create_file', 
      file: 'src/new.ts' 
    });
  });

  it('returns null for non-file operation lines', () => {
    expect(parseFileOperation('Thinking about next step')).toBeNull();
    expect(parseFileOperation('Some random text')).toBeNull();
  });
});

describe('parseFileOperation - Edge Cases with Spaces (FAILING)', () => {
  it('handles filenames with spaces in double quotes', () => {
    const result = parseFileOperation('← Edit "src/my component.tsx"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/my component.tsx' 
    });
  });

  it('handles filenames with spaces in single quotes', () => {
    const result = parseFileOperation("← Edit 'src/my component.tsx'");
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/my component.tsx' 
    });
  });

  it('handles read operations with quoted filenames', () => {
    const result = parseFileOperation('→ Read "src/utils/helper functions.ts"');
    expect(result).toEqual({ 
      tool: 'read_file', 
      file: 'src/utils/helper functions.ts' 
    });
  });

  it('handles create operations with quoted filenames', () => {
    const result = parseFileOperation('← Create "tests/integration tests/api.test.ts"');
    expect(result).toEqual({ 
      tool: 'create_file', 
      file: 'tests/integration tests/api.test.ts' 
    });
  });
});

describe('parseFileOperation - Edge Cases with Escaped Quotes (FAILING)', () => {
  it('handles escaped double quotes in filename', () => {
    const result = parseFileOperation('← Edit "src/file\\"with\\"quotes.tsx"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/file"with"quotes.tsx' 
    });
  });

  it('handles escaped single quotes in filename', () => {
    const result = parseFileOperation("← Edit 'src/file\\'s.tsx'");
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: "src/file's.tsx" 
    });
  });

  it('handles apostrophes in single-quoted filenames', () => {
    const result = parseFileOperation("← Edit 'src/user\\'s profile.tsx'");
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: "src/user's profile.tsx" 
    });
  });
});

describe('parseFileOperation - Edge Cases with Mixed Quotes (FAILING)', () => {
  it('handles single quotes inside double-quoted filename', () => {
    const result = parseFileOperation('← Edit "src/\'special\'.tsx"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: "src/'special'.tsx" 
    });
  });

  it('handles double quotes inside single-quoted filename', () => {
    const result = parseFileOperation('← Edit \'src/"special".tsx\'');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/"special".tsx' 
    });
  });
});

describe('parseFileOperation - Edge Cases with Special Characters (FAILING)', () => {
  it('handles parentheses in filenames', () => {
    const result = parseFileOperation('← Edit "src/utils (legacy)/helper.ts"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/utils (legacy)/helper.ts' 
    });
  });

  it('handles brackets in filenames', () => {
    const result = parseFileOperation('← Edit "src/[id]/page.tsx"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/[id]/page.tsx' 
    });
  });

  it('handles Unicode characters in filenames', () => {
    const result = parseFileOperation('← Edit "src/файл.tsx"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/файл.tsx' 
    });
  });

  it('handles emoji in filenames', () => {
    const result = parseFileOperation('← Edit "src/🚀rocket.tsx"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/🚀rocket.tsx' 
    });
  });
});

describe('parseFileOperation - Legacy Format Edge Cases (FAILING)', () => {
  it('handles legacy format with quoted filenames', () => {
    const result = parseFileOperation('Writing "src/my file.tsx"');
    expect(result).toEqual({ 
      tool: 'edit_file', 
      file: 'src/my file.tsx' 
    });
  });

  it('handles legacy create format with spaces', () => {
    const result = parseFileOperation('Creating "tests/new test.ts"');
    expect(result).toEqual({ 
      tool: 'create_file', 
      file: 'tests/new test.ts' 
    });
  });
});

describe('parseFileOperation - Unquoted Filenames (SHOULD STILL WORK)', () => {
  it('handles unquoted filenames without spaces', () => {
    expect(parseFileOperation('← Edit src/App.tsx')).toEqual({ 
      tool: 'edit_file', 
      file: 'src/App.tsx' 
    });
  });

  it('handles legacy format without quotes', () => {
    expect(parseFileOperation('Writing src/App.tsx')).toEqual({ 
      tool: 'edit_file', 
      file: 'src/App.tsx' 
    });
  });
});
