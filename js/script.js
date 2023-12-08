let menuIcon = document.querySelector('.menuIcon');
        let nav = document.querySelector('.overlay-menu');

        menuIcon.addEventListener('click', () => {
            if (nav.style.transform != 'translateX(0%)') {
                nav.style.transform = 'translateX(0%)';
                nav.style.transition = 'transform 0.2s ease-out';
            } else { 
                nav.style.transform = 'translateX(-100%)';
                nav.style.transition = 'transform 0.2s ease-out';
            }
        });


        // Toggle Menu Icon ========================================
        let toggleIcon = document.querySelector('.menuIcon');

        toggleIcon.addEventListener('click', () => {
            if (toggleIcon.className != 'menuIcon toggle') {
                toggleIcon.className += ' toggle';
            } else {
                toggleIcon.className = 'menuIcon';
            }
        });

          function scheduleAppointment() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            // Use the Google Calendar API to schedule the appointment
            gapi.client.init({
                apiKey: 'YOUR_GOOGLE_API_KEY', // Replace with your Google API Key
                clientId: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: 'https://www.googleapis.com/auth/calendar.events'
            }).then(() => {
                gapi.auth2.getAuthInstance().signIn().then(() => {
                    const event = {
                        'summary': 'Appointment with ' + name,
                        'description': 'Email: ' + email,
                        'start': {
                            'dateTime': date + 'T' + time + ':00',
                            'timeZone': 'UTC',
                        },
                        'end': {
                            'dateTime': date + 'T' + time + ':30',
                            'timeZone': 'UTC',
                        }
                    };

                    gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
                    }).then(response => {
                        alert('Appointment scheduled successfully! Event ID: ' + response.result.id);
                    }, error => {
                        console.error('Error scheduling appointment:', error);
                    });
                });
            });
        }