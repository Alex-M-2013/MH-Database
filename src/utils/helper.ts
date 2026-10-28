export const removeDashes = (string: string | undefined): string => (string ?? "").replaceAll("-", " ");

export function capitalise(string: string | undefined): string {
    const lowerCaseString: string = removeDashes(string).toLowerCase();
    const lowerCaseStringWords: string[] = lowerCaseString.split(" ");

    const capitalisedStringWords: string[] = lowerCaseStringWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return capitalisedStringWords.join(" ");
}
