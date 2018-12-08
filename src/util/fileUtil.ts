import { readFileSync } from 'fs';

export class FileUtil {
  data: string;

  constructor(private path: string) {
    this.data = readFileSync(this.path, 'utf8');
  }
}
