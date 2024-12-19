
import { getFoldersName } from "./get-folders-name";

export function getArchetypes() {
  return getFoldersName({ exactlyPath: `${__dirname}/src/templates` })
}
