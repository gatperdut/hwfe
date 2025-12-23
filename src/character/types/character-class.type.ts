export const CharacterClasses = ['BARBARIAN', 'WIZARD', 'ELF', 'DWARF'] as const;

export type CharacterClass = (typeof CharacterClasses)[number];
