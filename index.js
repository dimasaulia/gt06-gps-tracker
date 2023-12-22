var gps = require("gps-tracking");

var options = {
    debug: true,
    port: 8090,
    device_adapter: "GT06",
};

var server = gps.server(options, function (device, connection) {
    connection.on("data", function (res) {
        //When raw data comes from the device
        console.log(`RAW DATA => ${res}`);
    });

    device.on("login_request", function (device_id, msg_parts) {
        //Do some stuff before authenticate the device...
        // This way you can prevent from anyone to send their position without your consent
        console.log("Device ID => ", device_id);
        console.log("Device MSG => ", msg_parts);
        this.login_authorized(true); //Accept the login request.
    });

    device.on("login", function () {
        console.log("Hi! i'm " + device.uid);
        console.log("Hi! i come from " + device.ip + ":" + device.port);
    });

    device.on("login_rejected", function () {});

    device.on("ping", function (data) {
        //After the ping is received
        console.log(data);
        // console.log(
        //     "I'm here now: " + gps_data.latitude + ", " + gps_data.longitude
        // );
        return data;
    });

    device.on("alarm", function (alarm_code, alarm_data, msg_data) {
        console.log(
            "Help! Something happend: " +
                alarm_code +
                " (" +
                alarm_data.msg +
                ")"
        );
        //call_me();
    });
});

server.setDebug(true);
