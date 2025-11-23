"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReadme = UpdateReadme;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DEFAULT_START_MARKER = '<!--START_SECTION:dev-jokes-->';
const DEFAULT_END_MARKER = '<!--END_SECTION:dev-jokes-->';
/**
 * Updates README.md with the new joke content
 */
function UpdateReadme(JokeContent, ReadmePath, StartMarker, EndMarker) {
    const TargetPath = ReadmePath || path.join(process.cwd(), 'README.md');
    const StartMarkerToUse = StartMarker || DEFAULT_START_MARKER;
    const EndMarkerToUse = EndMarker || DEFAULT_END_MARKER;
    // Read current README
    let ReadmeContent = '';
    if (fs.existsSync(TargetPath)) {
        ReadmeContent = fs.readFileSync(TargetPath, 'utf8');
    }
    else {
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
        throw new Error(`README.md must contain both markers:\n${StartMarkerToUse}\n${EndMarkerToUse}`);
    }
    // Replace the content between markers
    const Before = ReadmeContent.substring(0, StartIndex + StartMarkerToUse.length);
    const After = ReadmeContent.substring(EndIndex);
    const NewReadmeContent = `${Before}\n\n${JokeContent}\n\n${After}`;
    // Write updated README
    fs.writeFileSync(TargetPath, NewReadmeContent, 'utf8');
    console.log('✅ README.md updated successfully!');
}
//# sourceMappingURL=readme.util.js.map