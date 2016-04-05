
var socket = io();
var cal = 0;
socket.on('UrgentHelp', function (msg) {
    console.log("333333");
    cal++;
    $("#note").text(cal+"emergency");
    notifyMe1(msg.location);

});




function notifyMe1(location) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var options = {
            body: "Location"+location,
            dir : "ltr",
            icon :"/images/danger.jpg"
        };
        var notification = new Notification("one more people need urgent help",options);
    }
    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // Whatever the user answers, we make sure we store the information
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var options = {
                    body:location,
                    dir : "ltr",
                    icon :"/images/danger.jpg"
                };
                var notification = new Notification("one more people need urgent help",options);
            }
        });
    }
    // At last, if the user already denied any notification, and you
    // want to be respectful there is no need to bother them any more.
}
