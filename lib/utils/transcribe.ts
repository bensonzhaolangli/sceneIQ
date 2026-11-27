import os from 'node:os';
import fs from 'node:fs';

export async function transcribeAudio(
  videoFilePath: string
): Promise<{ path: string } | undefined> {
  try {
    const whisperModule = await import('node-whisper');
    const whisper = whisperModule.default;

    const data = await whisper(videoFilePath, {
      output_format: 'json',
      output_dir: os.tmpdir(),
      word_timestamps: true,
    });

    if (fs.existsSync(data.json.file)) {
      return { path: data.json.file };
    }
    fs.writeFileSync(data.json.file, JSON.stringify({}));
    return { path: data.json.file };
  } catch (err) {
    console.error('Error:', err);
    return undefined;
  }
}
