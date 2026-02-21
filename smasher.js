var nodelist = [`${vms.socket}`]
var message = ["directv?!?","tester","bing chillin","dat was nickelodeon vor vandaag. tot morgen!","giggity giggity goo!"]
function uwu() {
  nodelist.forEach((url) => {
    try {
      var wawa = new WebSocket(url, "guacamole");

      wawa.onopen = () => {
        wawa.send("4.list;");
      };

      wawa.onmessage = (event) => {
        var mrrp = fix(event.data);
        if (!mrrp) return;

        if (mrrp[0] === 'list') {
          wawa.close();
          guh(url, mrrp[1]);
        }
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
  const name = `goob${Math.floor(Math.random() * 100000)}`;
  wawa.send(`6.rename,${name.length}.${name};`);

  wawa.send("3.nop;");

  if (message.length > 0) {
    const randomMsg = message[Math.floor(Math.random() * message.length)];
    wawa.send(`4.chat,${randomMsg.length}.${randomMsg};`);
  }
};

  wawa.onmessage = (event) => {
    var mrrp = fix(event.data);
    if (!mrrp) return;

    switch (mrrp[0]) {
      case 'nop':
        wawa.send("3.nop;");
        break;
    }
  };

  wawa.onclose = () => {
    console.warn("disconnected qwq");
    setTimeout(() => guh(url, node), 1000); // prevent instant flood loop
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

