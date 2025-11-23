import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_START_MARKER = '<!--START_SECTION:dev-jokes-->';
const DEFAULT_END_MARKER = '<!--END_SECTION:dev-jokes-->';

/**
 * Updates README.md with the new joke content
 */
export function UpdateReadme(
  JokeContent: string, 
  ReadmePath?: string,
  StartMarker?: string,
  EndMarker?: string
): void {
  const TargetPath = ReadmePath || path.join(process.cwd(), 'README.md');
  const StartMarkerToUse = StartMarker || DEFAULT_START_MARKER;
  const EndMarkerToUse = EndMarker || DEFAULT_END_MARKER;
  
  // Read current README
  let ReadmeContent = '';
  if (fs.existsSync(TargetPath)) {
    ReadmeContent = fs.readFileSync(TargetPath, 'utf8');
  } else {
    // Create a basic README if it doesn't exist
    ReadmeContent = `# Daily Dev Jokes

${StartMarkerToUse}
${EndMarkerToUse}

## How to Contribute

Submit an issue with "joke" in the title and your joke in the body!
`;
  }

  // Check for markers
  const StartIndex = ReadmeContent.indexOf(StartMarkerToUse);
  const EndIndex = ReadmeContent.indexOf(EndMarkerToUse);

  if (StartIndex === -1 || EndIndex === -1) {
    throw new Error(
      `README.md must contain both markers:\n${StartMarkerToUse}\n${EndMarkerToUse}`
    );
  }

  // Replace the content between markers
  const Before = ReadmeContent.substring(0, StartIndex + StartMarkerToUse.length);
  const After = ReadmeContent.substring(EndIndex);

  const NewReadmeContent = `${Before}\n\n${JokeContent}\n\n${After}`;

  // Write updated README
  fs.writeFileSync(TargetPath, NewReadmeContent, 'utf8');
  console.log('✅ README.md updated successfully!');
}

