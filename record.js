var recbutton = document.getElementsByClassName("videorec")[0]
var videovm = (function() {

    var recorder = null;
    var chunks = [];
    var recording = false;
    var rafId = null;

    function forceFrames(canvas) {
        var ctx = canvas.getContext("2d");

        function tick() {
            ctx.globalAlpha = 0.00001;
            ctx.fillRect(0, 0, 1, 1);
            ctx.globalAlpha = 1;

            rafId = requestAnimationFrame(tick);
        }

        tick();
    }

    return function () {

        var canvas = document.querySelector("canvas");
        if (!canvas) return;

        if (!recording) {

            var stream = canvas.captureStream(60);
            recorder = new MediaRecorder(stream, {
                mimeType: "video/webm;codecs=vp9"
            });

            chunks = [];

            recorder.ondataavailable = function (e) {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = function () {

                cancelAnimationFrame(rafId);

                var blob = new Blob(chunks, { type: "video/webm" });
                var url = URL.createObjectURL(blob);

                var a = document.createElement("a");
                a.href = url;
                a.download = "vm.webm";
                a.click();

                URL.revokeObjectURL(url);
            };

            forceFrames(canvas);
            recorder.start();

            if (typeof recbutton !== "undefined") {
                recbutton.innerHTML = "Recording...";
            }

            recording = true;

        } else {

            recorder.stop();

            if (typeof recbutton !== "undefined") {
                recbutton.innerHTML = "Record VM Screen";
            }

            recording = false;
        }
    };

})();
var screenshotvm = function() {

    function run() {
        var c = document.querySelector("canvas");
        if (!c) {
            requestAnimationFrame(run);
            return;
        }

        var link = document.createElement("a");
        link.download = "vm.png";
        link.href = c.toDataURL("image/png");
        link.click();
    }

    if (document.readyState === "complete") {
        run();
    } else {
        window.addEventListener("load", run);
    }

};