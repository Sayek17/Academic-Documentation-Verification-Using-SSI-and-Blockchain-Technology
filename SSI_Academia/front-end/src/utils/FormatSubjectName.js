const formatSubjectName = (courseName) => {
    // Replace underscores with spaces and capitalize each word
    return courseName
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export {formatSubjectName};