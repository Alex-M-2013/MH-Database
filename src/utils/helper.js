export const removeDashes = (string) => string.replaceAll("-", " ");

export function capitalise(string) {
    const lowerCaseString = removeDashes(string).toLowerCase();
    const lowerCaseStringWords = lowerCaseString.split(" ");

    const capitalisedStringWords = lowerCaseStringWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return capitalisedStringWords.join(" ");
}
