function getCurrentTimeInFormat(){
    const currentDate = new Date();
    return currentDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false, // Use 24-hour format
    })
}

export default getCurrentTimeInFormat;