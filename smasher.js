let nodelist = [];
let usernames = [];
let messages = [];

/* =========================
   GET NODE URL FROM CURRENT VM
========================= */
function updateNodeList() {
  if (!currentConn || !currentConn.ws) {
    console.warn("currentConn not ready");
    return;
  }

  const url = currentConn.ws.url || "wss://vms.befacivm.us.to/1/";

  if (!url) {
    console.warn("No websocket URL found");
    return;
  }

  nodelist = [url]; // ✅ always an array
  console.log("Node list set:", nodelist);
}

// wait for VM connection
if (typeof currentConn !== "null" && currentConn.ws) {
  currentConn.ws.addEventListener("open", updateNodeList);
}

/* =========================
   LOAD JSON DATA
========================= */
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

/* =========================
   UTIL
========================= */
function randomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   MAIN LOOP
========================= */
function uwu() {
  if (!Array.isArray(nodelist) || nodelist.length === 0) {
    console.error("nodelist not ready:", nodelist);
    return;
  }

  nodelist.forEach((url) => {
    try {
      const wawa = new WebSocket(url, "guacamole");

      wawa.onopen = () => {
        wawa.send("4.list;");
      };

      wawa.onmessage = (event) => {
        const mrrp = fix(event.data);
        if (!mrrp) return;

        if (mrrp[0] === "list") {
          wawa.close();
          guh(url, mrrp[1]);
        }
      };

      wawa.onerror = (err) => {
        console.warn(
          url.split("/").pop() +
          " failed qwq",
          err
        );
      };

    } catch (e) {
      console.warn("Connection error:", url, e);
    }
  });
}

/* =========================
   CHAT CONNECTION
========================= */
function guh(url, node) {
  const wawa = new WebSocket(url, "guacamole");

  wawa.onopen = () => {
    const name = randomItem(usernames) || "anon";
    const msg = randomItem(messages) || "hello";

    wawa.send(`6.rename,${name.length}.${name};`);
    wawa.send("3.nop;");
    wawa.send(`4.chat,${msg.length}.${msg};`);
  };

  wawa.onmessage = (event) => {
    const mrrp = fix(event.data);
    if (!mrrp) return;

    if (mrrp[0] === "nop") {
      wawa.send("3.nop;");
    }
  };

  wawa.onclose = () => {
    console.warn("disconnected qwq");
    setTimeout(() => guh(url, node), 2000); // ✅ safe reconnect
  };

  wawa.onerror = () => {
    console.warn("websocket broke qwq");
    wawa.close();
  };
}

/* =========================
   PARSER
========================= */
function fix(uwu) {
  let owo = [];

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

/* =========================
   INIT
========================= */
function spaminit() {
  loadData().then(() => {
    const wait = setInterval(() => {
      if (Array.isArray(nodelist) && nodelist.length > 0) {
        clearInterval(wait);
        uwu();
      }
    }, 100);
  });
}