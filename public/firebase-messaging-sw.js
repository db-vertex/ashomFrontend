importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config


const firebaseConfig = {
    apiKey: "AIzaSyAqo6KKZE1dC34bu9Zxn3-PIlzs-Fhpz78",
    authDomain: "ashom-277f0.firebaseapp.com",
    projectId: "ashom-277f0",
    storageBucket: "ashom-277f0.appspot.com",
    messagingSenderId: "902457448135",
    appId: "1:902457448135:web:de472b98107026f176d0e2",
    measurementId: "G-37YDP0PFP9"
};

const base_url = "https://clone.ashom.app/";

self.addEventListener('notificationclick', function(event) {
    let url = base_url;
    let metaNotifData = JSON.parse(event.notification.data.FCM_MSG.data.metadata);
    let notificationType = event.notification.data.FCM_MSG.data.type;
    let company_payload = "";
    if (notificationType === "Financial Report") {
        company_payload = metaNotifData[0].Company_payload;
    }
    if (notificationType == "News")
        url = metaNotifData.data.link;
    else if (notificationType == "Forum")
        url = base_url + 'forum';
    else if (notificationType == "Financial Report")
        url = base_url + 'setselectdoc?companyid=' + company_payload.id + '&year=' + (metaNotifData[0].year) + '&period=' + (metaNotifData[0].period);
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    // console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://ashom.app/assets/images/slogo.png',
        badge: payload.data.badge,
        image: payload.data.image,
        tag: "notification-1",
        actions: [{ action: "get", title: "Get now." }]
    };

    const notificationType = payload.data.type;
    const notificationMetadata = JSON.parse(payload.data.metadata);
    console.log(notificationMetadata);
    var company_payload = "";
    if (notificationType === "Financial Report") {
        company_payload = notificationMetadata[0].Company_payload;
    }
    console.log(notificationMetadata.data.link);
    // self.registration.showNotification(notificationTitle,
    // notificationOptions);
});