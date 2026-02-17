var catboxvm = async function (forcePrompt) {

    const STORAGE_KEY = "catboxvm_discord_webhook";

    // ---- Webhook handling ----
    let webhook = localStorage.getItem(STORAGE_KEY);

    if (forcePrompt === true) {
        webhook = prompt("Enter your Discord webhook URL:");
        if (!webhook) {
            alert("Webhook not set.");
            return;
        }
        localStorage.setItem(STORAGE_KEY, webhook);
        alert("Webhook saved.");
    }

    if (!webhook) {
        alert("No webhook set. Go to Settings.");
        return;
    }

    // ---- Get canvas ----
    const canvas = document.querySelector("canvas");
    if (!canvas) {
        console.error("No canvas found.");
        return;
    }

    const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, "image/png")
    );

    if (!blob) {
        console.error("Failed to create blob.");
        return;
    }

    // ---- Upload to Catbox ----
    const formData = new FormData();
    formData.append("reqtype", "fileupload");
    formData.append("fileToUpload", blob, "canvas.png");

    let catboxUrl;

    try {
        const uploadResponse = await fetch("https://api.codetabs.com/v1/proxy/?quest=https://catbox.moe/user/api.php", {
            method: "POST",
            body: formData
        });

        catboxUrl = (await uploadResponse.text()).trim();

        if (!catboxUrl.startsWith("https://")) {
            console.error("Catbox upload failed:", catboxUrl);
            return;
        }

        console.log("Uploaded to Catbox:", catboxUrl);

    } catch (err) {
        console.error("Catbox upload error:", err);
        return;
    }

    // ---- Send to Discord ----
    try {
        await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: catboxUrl
            })
        });

        console.log("Sent to Discord.");

    } catch (err) {
        console.error("Discord webhook error:", err);
    }
};
