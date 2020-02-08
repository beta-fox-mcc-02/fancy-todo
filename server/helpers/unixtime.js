module.exports = {
    unixTime: function(date) {
        return Math.floor(new Date(date).getTime() / 1000);
    }
}

