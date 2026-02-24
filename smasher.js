// Keep nodelist dynamic
Object.defineProperty(window, 'nodelist', {
    get: () => {
        return (typeof vms !== 'undefined' && vms.socket) ? [vms.socket] : [];
    }
});

var message = ["directv?!?", 
    "tester", 
    "bing chillin", 
    "dat was nickelodeon vor vandaag. tot morgen!", 
    "giggity giggity goo!",
    "would you play with my dingaling?",
    "Kyai's Forehead has been farted on.",
    "I LOVE PENIS!!!!",
    "I'm P Diffie and i love to inject dr. jr.",
    "SNIFFS COCAINE.",
    "%myusb",
    "!help",
    "%help",
    "i want to kill this vm so bad my nigga",
    "I'm back, enemies. Your raids will go in vain.",
    "mango mustard 67 skibidi rizz in ohio",
    "ME LOVES DILDOS! FUCK NIGGERS!",
    "vore me",
    "FLOODED BY CHOCOLATEMAN! FUCK NIGGERS! FUCK FORKIES!",
    "FUCK NIGGERS! FUCK FORKIES! FUCK JEWS!",
    "come suck my pie ness",
    "terug",
    "VM7 there is a forkie",
    "JUST LET ME PLAY SCRIBBLENAUTS AND STOP ASKING QUESTIONS YOU AREN'T ABLE TO HANDLE THE ANSWERS TO!",
    "I LOGGED YOUR MOTHER!"];
var newn = [
    "friesaweecfr 3es", 
    "BING", 
    "WORK MY ASS OFF", 
    "TOT MORGEN!", 
    "GOOGLE PLA", 
    "IM GONNA PLA", 
    "DR. JR.", 
    "name",
    "MANGO MUSTARD",
    "DIRECTIONS",
    "Boomerang",
    "deep fried",
    "CHOCOLATEMAN",
    "Dr. JJ Jr.",
    "sussy baka",
    "mango mustard 67",
    "bing ching",
    "terug",
    "kindernet"];

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
            // Delay chat slightly to avoid sending too early
            if (message.length > 0) {
                setTimeout(() => {
                    const randomMsg = message[Math.floor(Math.random() * message.length)];
                    wawa.send(`4.chat,${randomMsg.length}.${randomMsg};`);
                }, 200); // 200ms delay, adjust as needed
            }

        setTimeout(() => {
                if (Math.floor(Math.random()*10) === 5) {
                setTimeout(() => {
                    wawa.send(`4.vote,1.1;`);
                    wawa.send(`4.vote,1.0;`);
                }, 100); // 500ms delay, adjust as needed
            }
        },100)

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
