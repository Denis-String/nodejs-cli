
import { getFoldersName } from './file';

export function getArchetypes() {
  return getFoldersName({ exactlyPath: `${__dirname}/src/templates` });
}
