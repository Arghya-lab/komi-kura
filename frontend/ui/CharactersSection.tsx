import type { IMangaInfo, ITitle } from "@consumet/extensions";
import convertTitleToString from "../../lib/convertTitleToString.js";

function CharactersSection({ mangaInfo }: { mangaInfo: IMangaInfo }) {
  const characters = mangaInfo.characters as
    | {
        id: string;
        role: string;
        name: string | string[] | [lang: string][] | ITitle;
        image: string;
      }[]
    | undefined;

  if (!characters) return null;

  return (
    <>
      <link rel="stylesheet" href="/assets/styles/characters-section.css" />
      <section class="characters">
        <h3 class="heading">characters</h3>

        <div class="character-grid">
          {characters.map((character) => (
            <div class="character">
              <div class="cover">
                <div class="image-background" />
                <img src={character.image} class="image" />
              </div>
              <div class="content">
                <p class="name">{convertTitleToString(character.name)}</p>
                <p class="role">{character.role.toLowerCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CharactersSection;
