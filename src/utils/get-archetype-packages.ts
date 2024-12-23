
import { getFoldersName } from './get-folders-name';

export function getPackagesByArchetype({ archetype }: { archetype: string }) {
  return getFoldersName({ exactlyPath: `${__dirname}/src/packages/${archetype}` });
}
