(function () {
    function liveTime() {
        const date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();

        hours = fillWithZeros(hours.toString(), 2);
        minutes = fillWithZeros(minutes.toString(), 2);

        function fillWithZeros(str, length) {
            const counter = length - str.length;
            return '0'.repeat(counter > 0 ? counter : '0') + str;
        }

        let time_str = (hours + ':' + minutes);

        const clock = document.getElementById('live-time');
        if (clock.innerText != time_str) {
            clock.innerText = time_str;
        }
    }

    setInterval(() => {
        liveTime();
    }, 1000)
})()
