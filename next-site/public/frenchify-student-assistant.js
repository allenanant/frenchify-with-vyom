(function () {
  "use strict";
  if (window.__frenchifyStudentAssistantLoaded) return;
  window.__frenchifyStudentAssistantLoaded = true;

  var currentScript = document.currentScript;
  if (!currentScript || !currentScript.src) return;
  var assistantOrigin = new URL(currentScript.src, window.location.href).origin;
  var root = document.createElement("div");
  root.id = "frenchify-student-assistant-root";
  var shadow = root.attachShadow ? root.attachShadow({ mode: "open" }) : root;
  var style = document.createElement("style");
  style.textContent = [
    ":host{all:initial}",
    ".fwv-wrap{position:fixed;right:18px;bottom:18px;z-index:2147483000;font-family:Arial,Helvetica,sans-serif}",
    ".fwv-launch{width:58px;height:58px;display:grid;place-items:center;border:0;border-radius:19px 19px 19px 6px;color:#fff;background:#122a46;box-shadow:0 15px 38px rgba(11,31,54,.3);cursor:pointer}",
    ".fwv-launch strong{font:700 21px Georgia,serif}",
    ".fwv-launch:focus-visible{outline:3px solid rgba(36,89,143,.35);outline-offset:3px}",
    ".fwv-dot{position:absolute;right:-2px;top:-3px;width:17px;height:17px;display:grid;place-items:center;border:2px solid #fff;border-radius:50%;color:#fff;background:#d45358;font-size:9px;font-weight:900}",
    ".fwv-greeting{position:absolute;right:68px;bottom:7px;width:205px;padding:11px 34px 11px 13px;border:1px solid #dfe5eb;border-radius:14px 14px 4px 14px;color:#18304b;background:#fff;box-shadow:0 14px 36px rgba(11,31,54,.18);font-size:11px;line-height:1.4}",
    ".fwv-greeting strong{display:block;margin-bottom:3px;color:#122a46;font-size:11px}",
    ".fwv-greeting-close{position:absolute;top:7px;right:7px;width:22px;height:22px;display:grid;place-items:center;padding:0;border:0;border-radius:50%;color:#51657a;background:transparent;font:700 17px/1 Arial,Helvetica,sans-serif;cursor:pointer}",
    ".fwv-greeting-close:hover{color:#122a46;background:#edf2f6}",
    ".fwv-greeting-close:focus-visible{outline:2px solid rgba(36,89,143,.42);outline-offset:1px}",
    ".fwv-panel{position:absolute;right:0;bottom:70px;width:min(405px,calc(100vw - 24px));height:min(680px,calc(100vh - 105px));overflow:hidden;border-radius:22px;box-shadow:0 28px 80px rgba(11,31,54,.26);opacity:0;visibility:hidden;transform:translateY(12px) scale(.98);transform-origin:bottom right;transition:opacity .18s ease,transform .18s ease,visibility .18s}",
    ".fwv-panel.open{opacity:1;visibility:visible;transform:translateY(0) scale(1)}",
    ".fwv-panel iframe{width:100%;height:100%;display:block;border:0;background:transparent}",
    "@media(max-width:520px){.fwv-wrap{right:12px;bottom:12px}.fwv-panel{position:fixed;inset:0;width:100vw;height:100dvh;border-radius:0}.fwv-greeting{right:66px;max-width:calc(100vw - 96px)}}"
  ].join("");

  var wrap = document.createElement("div");
  wrap.className = "fwv-wrap";
  var panel = document.createElement("div");
  panel.className = "fwv-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Frenchify student assistant");
  var frame = document.createElement("iframe");
  frame.title = "Frenchify student assistant";
  frame.src = assistantOrigin + "/student-assistant?embed=1";
  frame.loading = "eager";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allow = "clipboard-write";
  panel.appendChild(frame);

  var greeting = document.createElement("div");
  greeting.className = "fwv-greeting";
  greeting.innerHTML = "<button type=\"button\" class=\"fwv-greeting-close\" aria-label=\"Dismiss assistant greeting\">&times;</button><strong>Bonjour! 👋</strong>French question, course guidance, or technical issue? I’m here to help.";
  var greetingClose = greeting.querySelector(".fwv-greeting-close");
  var launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "fwv-launch";
  launcher.setAttribute("aria-label", "Open Frenchify student assistant");
  launcher.setAttribute("aria-expanded", "false");
  launcher.innerHTML = "<strong>V</strong><span class=\"fwv-dot\">1</span>";

  var greetingDismissed = false;
  try {
    greetingDismissed = window.localStorage.getItem("frenchify-assistant-greeting-dismissed") === "1";
  } catch {}

  function dismissGreeting() {
    greetingDismissed = true;
    greeting.hidden = true;
    try { window.localStorage.setItem("frenchify-assistant-greeting-dismissed", "1"); } catch {}
  }

  function setOpen(open) {
    panel.classList.toggle("open", open);
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "Close Frenchify student assistant" : "Open Frenchify student assistant");
    greeting.hidden = open || greetingDismissed;
    if (open) {
      try { window.sessionStorage.setItem("frenchify-assistant-seen", "1"); } catch {}
    }
  }
  greetingClose.addEventListener("click", function () { dismissGreeting(); });
  launcher.addEventListener("click", function () {
    var isOpen = panel.classList.contains("open");
    if (isOpen) dismissGreeting();
    setOpen(!isOpen);
  });
  window.addEventListener("message", function (event) {
    if (event.origin !== assistantOrigin) return;
    if (event.data && event.data.type === "frenchify-assistant:close") {
      dismissGreeting();
      setOpen(false);
    }
  });

  wrap.appendChild(panel);
  wrap.appendChild(greeting);
  wrap.appendChild(launcher);
  shadow.appendChild(style);
  shadow.appendChild(wrap);
  document.body.appendChild(root);

  try {
    if (greetingDismissed) {
      greeting.hidden = true;
    } else if (!window.sessionStorage.getItem("frenchify-assistant-seen")) {
      window.setTimeout(function () { setOpen(true); }, 1300);
    } else {
      window.setTimeout(function () { greeting.hidden = true; }, 5000);
    }
  } catch {
    window.setTimeout(function () { setOpen(true); }, 1300);
  }
})();
