
import { getFoldersName } from "./getFoldersName";

export function getPackagesByArchetype({ archetype }: { archetype: string }) {
  return getFoldersName({ exactlyPath: `${__dirname}/src/packages/${archetype}` })
}
