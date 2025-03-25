const date_to_string = (date) => {
    if((typeof(date)) != 'date')
        date = new Date();
    return date.getFullYear() + "-" +
        (date.getMonth() <= 8 ? "0" : "") +
        ((date.getMonth() + 1)) + "-" +
        (date.getDate() <= 9 ? "0" : "") +
        date.getDate();
}

export default date_to_string;