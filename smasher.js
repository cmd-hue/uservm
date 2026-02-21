// Keep nodelist dynamic
Object.defineProperty(window, 'nodelist', {
    get: () => {
        return (typeof vms !== 'undefined' && vms.socket) ? [vms.socket] : [];
    }
});

var message = ["directv?!?", "tester", "bing chillin", "dat was nickelodeon vor vandaag. tot morgen!", "giggity giggity goo!"];
var newn = ["friesaweecfr 3es", "BING", "WORK MY ASS OFF", "TOT MORGEN!", "GOOGLE PLA", "IM GONNA PLA", "DR. JR.", "name"];

// Main function to connect to all nodes
function uwu() {
    nodelist.forEach(url => {
        connect(url);
    });
}

// Reconnecting WebSocket
function connect(url) {
    let wawa;

    function init() {
        wawa = new WebSocket(url, "guacamole");

        wawa.onopen = () => {
            console.log("Connected to", url);

            // Send rename every 1 second
            setInterval(() => {
                const name = newn[Math.floor(Math.random() * newn.length)];
                wawa.send(`6.rename,${name.length}.${name};`);
            }, 1000);

            // Send chat message
            if (message.length > 0) {
                const randomMsg = message[Math.floor(Math.random() * message.length)];
                wawa.send(`4.chat,${randomMsg.length}.${randomMsg};`);
            }

            // Optional nop
            wawa.send("3.nop;");
        };

        wawa.onclose = () => {
            console.warn("Disconnected from", url, "– reconnecting in 1s");
            setTimeout(init, 1000); // reconnect after 1 second
        };

        wawa.onerror = (err) => {
            console.warn("WebSocket error on", url, err);
        };
    }

    init();
}

// Optional parser function
function fix(uwuStr) {
    let owo = [];

    while (uwuStr.length > 0) {
        if (isNaN(uwuStr[0])) return null;

        let match = uwuStr.match(/^(\d+)/);
        if (!match) return null;

        let len = parseInt(match[1]);
        let start = match[1].length + 1;
        let end = start + len;

        owo.push(uwuStr.substring(start, end));
        uwuStr = uwuStr.substring(end + 1);
    }

    return owo;
}
