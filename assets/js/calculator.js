(function () {
    const btn = document.getElementById('btn');
    const submitFileSize = document.getElementById('file-size');
    const submitInternetSpeed = document.getElementById('internet-speed');

    btn.addEventListener('click', calculator);

    [submitFileSize, submitInternetSpeed].forEach(input => {
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                calculator();
            }
        });
    });

    function calculator() {
        const fileSize = document.getElementById('file-size').value;
        const internetSpeed = document.getElementById('internet-speed').value;
        const fileMeasurementUnit = document.getElementById('file-measurement-unit').value;
        const notification = document.getElementById('notification');
        const notificationBtn = document.getElementById('notification-btn');
        const notificationText = document.getElementById('notification-text');

        if (fileSize === '') {
            notificationMsg('Please enter the file size.');

        } else if (internetSpeed === '') {
            notificationMsg('Please enter the connection speed.');

        } else if (fileMeasurementUnit === '') {
            notificationMsg('Please enter the unit of measurement for the file.');

        } else {
            getTime(fileSize * parseFloat(fileMeasurementUnit))
        }

        function notificationMsg(message) {
            notificationText.innerText = message;

            notification.classList.add('active');

            notificationBtn.addEventListener('click', (e) => {
                notification.classList.remove('active')
            });
        }

        function getTime(calculatedFileSize) {
            const timeInHours = ((calculatedFileSize / (internetSpeed / 8)) / 60) / 60;
            calculateTime(timeInHours)
        }

        function calculateTime(time) {
            const result = document.getElementById('time');

            result.focus();
            notification.classList.remove('active')

            if (time < 1e-6) {
                result.value = '0 hour 0 minute and 1 second';

            } else if (time > 9e20) {
                result.value = 'Many years';

            } else {
                const timeFormatted = (time + "").split('.');
                const formattedTwo = ((parseFloat('0.' + timeFormatted[1]) * 60) + "").split('.');

                const hours = parseFloat(timeFormatted[0]); //hours
                const minutes = parseFloat(formattedTwo[0]); //minutes
                const seconds = Math.ceil((parseFloat('0.' + formattedTwo[1])) * 60); //seconds

                if (hours >= 168 && hours < 730) {
                    result.value = 'More than a week.';

                } else if (hours >= 730 && hours < 1460) {
                    result.value = 'More than one month.';

                } else if (hours >= 1460 && hours < 2190) {
                    result.value = 'More than two months.';

                } else if (hours >= 2190) {
                    result.value = 'More than three months.';

                } else {
                    const hoursString = hours <= 1 ? "hour" : "hours";
                    const minutesString = minutes <= 1 ? "minute" : "minutes";
                    const secondsString = seconds <= 1 ? "second" : "seconds";

                    result.value = `${hours} ${hoursString} ${minutes} ${minutesString} and ${seconds} ${secondsString}`;
                }
            }
        }
    }
})()
