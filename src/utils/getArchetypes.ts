
import { getFoldersName } from "./getFoldersName";

export function getArchetypes() {
  return getFoldersName({ exactlyPath: `${process.cwd()}/src/templates` })
}
