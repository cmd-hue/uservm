Object.defineProperty(window, 'nodelist', {
    get: () => {
        // Make sure vms and vms.socket exist
        if (typeof vms !== 'undefined' && vms.socket) {
            return [vms.socket];
        } else {
            return []; // empty array if undefined
        }
    }
});
var message = ["directv?!?","tester","bing chillin","dat was nickelodeon vor vandaag. tot morgen!","giggity giggity goo!"]
var newn = ["friesaweecfr 3es", "BING","WORK MY ASS OFF","TOT MORGEN!","GOOGLE PLA","IM GONNA PLA","DR. JR.","name"]
function uwu() {
  nodelist.forEach((url) => {
    try {
      var wawa = new WebSocket(url, "guacamole");

      wawa.onopen = () => {
        wawa.send("4.list;");
      };

      wawa.onerror = (err) => {
        console.warn(
          url +
          " seems to have fallen off the path qwq\n",
          err
        );
      };

    } catch (e) {
      console.warn("Failed to connect:", url, e);
    }
  });
}

function guh(url, node) {
  var wawa = new WebSocket(url, "guacamole");
 

wawa.onopen = () => {
  if (name.length > 0) {
  const name = newn[Math.floor(Math.random() * newn.length)];
  setInterval(wawa.send(`6.rename,${name.length}.${name};`),1000)
  }

  wawa.send("3.nop;");

  if (message.length > 0) {
    const randomMsg = message[Math.floor(Math.random() * message.length)];
    wawa.send(`4.chat,${randomMsg.length}.${randomMsg};`);
  }
};

  wawa.onclose = () => {
    console.warn("disconnected qwq");
    setTimeout(() => guh(url, node), 1000); // instant flood loop
  };

  wawa.onerror = () => {
    console.warn("websocket connection broke qwq");
  };
}

// parser
function fix(uwu) {
  var owo = [];

  while (uwu.length > 0) {
    if (isNaN(uwu[0])) return null;

    let match = uwu.match(/^(\d+)/);
    if (!match) return null;

    let len = parseInt(match[1]);
    let start = match[1].length + 1;
    let end = start + len;

    owo.push(uwu.substring(start, end));
    uwu = uwu.substring(end + 1);
  }

  return owo;
}

