document.onkeydown = updateKey;
document.onkeyup = resetKey;

var server_port = 1026;
var server_addr = "192.168.3.2";   // the IP address of your Raspberry PI


document.addEventListener("DOMContentLoaded", function() {
    update_data();

});


// var return_data = function()
// {
//     // var text = "hi";
//     const fs = require('fs')

//     fs.readFile('/home/dabdoue/iot-labs/iot-lab-2/electron/message.txt', 'utf8', (err, data) => {
//         blue_message = data.toString();

//         if (err) {
//             // return data;
//             console.error(err)
//         }
//     })
// };


function client(){
    
    const net = require('net');
    var input = document.getElementById("message").value;

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        // document.getElementById("bluetooth").innerHTML = data;
        str_data = data.toString();
        all_data = str_data.split(",");
        document.getElementById("direction").innerHTML = all_data[0];
        document.getElementById("speed").innerHTML = all_data[1];
        document.getElementById("distance").innerHTML = all_data[2];
        document.getElementById("temperature").innerHTML = all_data[3];
        // return_data();
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });


}

// for detecting which key is been pressed w,a,s,d
function updateKey(e) {
    const net = require('net');
    e = e || window.event;
    dir = "";
    if (e.keyCode == '87')
    {
        // up (w)
        document.getElementById("upArrow").style.color = "green";
        dir = "up"
    }
    else if (e.keyCode == '83')
    {
        // down (s)
        document.getElementById("downArrow").style.color = "green";
        dir = "down"
    }
    else if (e.keyCode == '65')
    {
        // left (a)
        document.getElementById("leftArrow").style.color = "green";
        dir = "left"
    }
    else if (e.keyCode == '32')
    {
        // left (a)
        dir = "stop"
    }
    else if (e.keyCode == '68')
    {
        // right (d)
        document.getElementById("rightArrow").style.color = "green";
        dir = "right"
    }

    const client = net.createConnection({ port: server_port, host: server_addr }, () =>
    {
        // 'connect' listener.
        console.log('connected to server! in updateKey function');
        // send the message
        if (dir != "")
        {
            client.write(`${dir}`);
        }
    });

}

function printer(){
    console.log("upkey");
}
// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
}


// update data for every 50ms
function update_data()
{
    setInterval(function ()
    {
        // get image from python server
        client();
        // updateKey(e);
    }, 50);
}
