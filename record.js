var recbutton = document.getElementsByClassName("videorec")[0]

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

var videovm = (function () {

    var recorder = null;
    var chunks = [];
    var recording = false;
    var rafId = null;
    var recordCanvas = null;
    var rctx = null;

    function forceFrames(sourceCanvas) {
        function tick() {
            // Copy source canvas into fixed recording canvas
            rctx.drawImage(
                sourceCanvas,
                0,
                0,
                recordCanvas.width,
                recordCanvas.height
            );

            rafId = requestAnimationFrame(tick);
        }

        tick();
    }

    return function () {

        var canvas = document.querySelector("canvas");
        if (!canvas) return;

        if (!recording) {


            // Create separate fixed canvas
            recordCanvas = document.createElement("canvas");
        
            rctx = recordCanvas.getContext("2d");


            // Start copying frames
            forceFrames(canvas);

            // Capture ONLY the fixed canvas
            var stream = recordCanvas.captureStream(60);

            recorder = new MediaRecorder(stream, {
                mimeType: "video/webm;codecs=vp9"
            });

            chunks = [];

            recorder.ondataavailable = function (e) {
                if (e.data && e.data.size > 0) {
                    chunks.push(e.data);
                }
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

                recordCanvas = null;
                rctx = null;
            };

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
