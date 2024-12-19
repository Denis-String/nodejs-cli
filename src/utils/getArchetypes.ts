
import { getFoldersName } from "./getFoldersName";

export function getArchetypes() {
  return getFoldersName({ exactlyPath: `${__dirname}/src/templates` })
}
