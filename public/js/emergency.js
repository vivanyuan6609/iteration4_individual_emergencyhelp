
    $(document).ready(function() {
        var socket = io();

        $('#statusbutton').click(function () {
            var user_status = $('#statusselect').val();
            var user_location = $('#location').val();
            console.log(user_status);
            var totalunread = 0;
            if (user_status == 2) {
                socket.emit('UrgentHelp', {status: user_status, location: user_location});
                console.log("yuanyuan22222");
            }
            else if (user_status == 1) {
                socket.emit('Help', {status: user_status, location: user_location});
                console.log("yuanyuan44444");
            }
        });

       
    });