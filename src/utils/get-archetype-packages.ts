
import { getFoldersName } from './file';

export function getPackagesByArchetype({ archetype }: { archetype: string }) {
  return getFoldersName({ exactlyPath: `${__dirname}/src/packages/${archetype}` });
}
