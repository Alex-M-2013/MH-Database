const removeDashes = (string) => string.replaceAll("-", " ");

function capitalise(string) {
    const lowerCaseString = removeDashes(string).toLowerCase();
    const lowerCaseStringWords = lowerCaseString.split(" ");

    const capitalisedStringWords = lowerCaseStringWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    const capitalisedString = capitalisedStringWords.join(" ");

    return capitalisedString;
}
