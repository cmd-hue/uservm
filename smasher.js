let nodelist;

function updateNodeList() {
    nodelist = currentConn.ws.url;
}


currentConn.ws.addEventListener("open", updateNodeList);

let usernames = [];
let messages = [];

// load JSON files
async function loadData() {
  try {
    const namesRes = await fetch("names.json");
    usernames = await namesRes.json();

    const msgRes = await fetch("message.json");
    messages = await msgRes.json();

    console.log("Loaded usernames & messages");
  } catch (e) {
    console.error("Failed to load JSON files:", e);
  }
}

// get random item
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
          url.split('/').pop() +
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
    const name = randomItem(usernames) || "anon";
    const msg = randomItem(messages) || "hello";

    wawa.send(`6.rename,${name.length}.${name}`);
    wawa.send("3.nop;");
    wawa.send(`4.chat,${msg.length}.${msg};`);
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
    setInterval(() => {
      guh(url, node);
    }, 2000);
  };

  wawa.onerror = () => {
    console.warn("websocket connection broke qwq");
    guh(url, node);
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
  // init
function spaminit() {
loadData().then(() => {
  uwu();
});
}