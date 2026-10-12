/* ==========================================================================
   script.js - behaviour and rendering. Content lives in config.js.
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var isHttp = location.protocol === "http:" || location.protocol === "https:";

  /* ---------- tiny helpers ---------- */
  function el(tag, opts, children) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.className) node.className = opts.className;
    if (opts.text) node.textContent = opts.text;
    if (opts.attrs) Object.keys(opts.attrs).forEach(function (k) { node.setAttribute(k, opts.attrs[k]); });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function icon(cls) { return el("i", { className: cls, attrs: { "aria-hidden": "true" } }); }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var toastTimer;
  function toast(message, isError) {
    var t = qs("#toast");
    t.textContent = message;
    t.className = "toast show" + (isError ? " error" : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = "toast"; }, 3500);
  }

  /* Checks a local file exists. Only possible over http(s); when opened from
     disk (file://) browsers block the check, so we assume it exists. */
  function fileExists(path) {
    if (!path) return Promise.resolve(false);
    if (!isHttp) return Promise.resolve(true);
    return fetch(path, { method: "HEAD" })
      .then(function (r) { return r.ok; })
      .catch(function () { return false; });
  }

  /* ---------- profile links ---------- */
  function bindLinks() {
    var L = CONFIG.links;
    var map = {
      github: L.github,
      linkedin: L.linkedin,
      email: L.email ? "mailto:" + L.email : "",
      phone: L.phone ? "tel:" + L.phone : ""
    };
    qsa("[data-link]").forEach(function (a) {
      var url = map[a.getAttribute("data-link")];
      if (url) {
        a.setAttribute("href", url);
      } else {
        a.setAttribute("aria-disabled", "true");
        a.removeAttribute("target");
      }
    });
    var emailText = qs("#email-text"); if (emailText) emailText.textContent = L.email;
    var phoneText = qs("#phone-text"); if (phoneText) phoneText.textContent = L.phoneDisplay || L.phone;

    ["#stat-cgpa", "#edu-cgpa"].forEach(function (s) { var n = qs(s); if (n) n.textContent = CONFIG.cgpa; });

    var av = qs("#availability");
    if (av && CONFIG.availabilityLabel) { av.textContent = CONFIG.availabilityLabel; av.hidden = false; }

    qs("#year").textContent = new Date().getFullYear();
  }

  /* ---------- résumé ---------- */
  function bindResume() {
    var links = qsa("[data-resume]");
    links.forEach(function (a) {
      a.setAttribute("href", CONFIG.resume.file);
      a.setAttribute("download", CONFIG.resume.downloadName);
    });
    fileExists(CONFIG.resume.file).then(function (ok) {
      if (ok) return;
      links.forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          toast("Résumé not found. Upload your PDF as " + CONFIG.resume.file + " to enable this button.", true);
        });
      });
    });
  }

  /* ---------- skills ---------- */
  function renderSkills() {
    var grid = qs("#skills-grid");
    skillGroups.forEach(function (group) {
      var list = el("ul", { className: "skill-list" });
      group.items.forEach(function (s) {
        var ico = s.text ? el("span", { className: "skill-ico", text: s.text, attrs: { "aria-hidden": "true" } })
                         : el("span", { className: "skill-ico" }, [icon(s.icon)]);
        var label = el("span", {}, [el("strong", { text: s.name }), s.desc ? el("span", { className: "desc", text: s.desc }) : null]);
        list.appendChild(el("li", { className: "skill" }, [ico, label]));
      });
      grid.appendChild(el("article", { className: "card skill-card reveal" }, [
        el("h3", {}, [icon(group.icon), document.createTextNode(group.title)]),
        list
      ]));
    });
  }

  /* ---------- projects ---------- */
  function tagList(items, label) {
    var ul = el("ul", { className: "tags", attrs: { "aria-label": label } });
    items.forEach(function (t) { ul.appendChild(el("li", { text: t })); });
    return ul;
  }
  function bulletList(items) {
    var ul = el("ul", { className: "bullets" });
    items.forEach(function (t) { ul.appendChild(el("li", { text: t })); });
    return ul;
  }
  function isUrl(u) { return typeof u === "string" && /^https?:\/\//i.test(u); }

  function projectActions(p, withDetailsButton, detailsTrigger) {
    var wrap = el("div", { className: "card-actions" });
    if (isUrl(p.repoUrl)) {
      wrap.appendChild(el("a", {
        className: "btn btn-secondary btn-sm",
        attrs: { href: p.repoUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": "View source code for " + p.title + " (opens in a new tab)" }
      }, [icon("fa-brands fa-github"), document.createTextNode("View Source Code")]));
    } else {
      wrap.appendChild(el("p", { className: "note-muted", text: "Source code available on request" }));
    }
    if (isUrl(p.liveUrl)) {
      wrap.appendChild(el("a", {
        className: "btn btn-secondary btn-sm",
        attrs: { href: p.liveUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": "Live demo of " + p.title + " (opens in a new tab)" }
      }, [icon("fa-solid fa-arrow-up-right-from-square"), document.createTextNode("Live Demo")]));
    }
    if (withDetailsButton) {
      var b = el("button", {
        className: "btn btn-primary btn-sm",
        attrs: { type: "button", "aria-haspopup": "dialog", "aria-label": "Project details: " + p.title }
      }, [document.createTextNode("Project Details")]);
      b.addEventListener("click", function () { detailsTrigger(p, b); });
      wrap.appendChild(b);
    }
    return wrap;
  }

  var modal, lastTrigger;
  function openModal(p, trigger) {
    lastTrigger = trigger;
    var body = qs("#modal-body");
    body.textContent = "";
    body.appendChild(el("h3", { text: p.title, attrs: { id: "modal-title" } }));
    body.appendChild(el("p", { text: p.overview }));
    body.appendChild(el("h4", { text: "Technologies" }));
    body.appendChild(tagList(p.tech, "Technologies used"));
    body.appendChild(el("h4", { text: "Key contributions" }));
    body.appendChild(bulletList(p.contributions));
    if (p.metricsConfirmed && p.metrics && p.metrics.length) {
      body.appendChild(el("h4", { text: "Reported results" }));
      body.appendChild(bulletList(p.metrics));
    }
    body.appendChild(projectActions(p, false));

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    document.body.classList.add("modal-open");
    qs("#modal-close").focus();
  }
  function closeModal() {
    if (typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
  }

  function renderProjects() {
    var grid = qs("#projects-grid");
    projects.forEach(function (p) {
      var card = el("article", { className: "card project-card reveal" }, [
        el("div", { className: "proj-ico" }, [icon(p.icon)]),
        el("h3", { text: p.title }),
        el("p", { className: "summary", text: p.summary }),
        tagList(p.tech, "Technologies used"),
        bulletList(p.contributions.slice(0, 2)),
        projectActions(p, true, openModal)
      ]);
      grid.appendChild(card);
    });

    modal = qs("#project-modal");
    qs("#modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    modal.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- certificates ---------- */
  var IMG_RE = /\.(png|jpe?g|webp|gif|svg)$/i;

  function renderCertificates() {
    var grid = qs("#cert-grid");
    certificates.forEach(function (c) {
      var preview = el("div", { className: "cert-preview" });
      if (c.file && IMG_RE.test(c.file)) {
        preview.appendChild(el("img", { attrs: { src: c.file, alt: "Certificate: " + c.title, loading: "lazy", width: "112", height: "112" } }));
        preview.firstChild.addEventListener("error", function () {
          preview.textContent = ""; preview.appendChild(icon(c.icon || "fa-solid fa-certificate"));
        });
      } else {
        preview.setAttribute("role", "img");
        preview.setAttribute("aria-label", "Certificate icon for " + c.title);
        preview.appendChild(icon(c.icon || "fa-solid fa-certificate"));
      }

      var meta = el("div", { className: "cert-meta" });
      if (c.issueDate) meta.appendChild(el("span", { text: "Issued: " + c.issueDate }));
      if (c.expiryDate) meta.appendChild(el("span", { text: "Expires: " + c.expiryDate }));
      if (c.credentialId) meta.appendChild(el("span", { text: "Credential ID: " + c.credentialId }));

      var actions = el("div", { className: "cert-actions" });
      var info = el("div", {}, [
        el("h3", { text: c.title }),
        c.issuer ? el("p", { className: "cert-issuer", text: c.issuer }) : null,
        meta.childNodes.length ? meta : null,
        actions
      ]);

      var card = el("article", { className: "card cert-card reveal" }, [preview, info]);
      grid.appendChild(card);

      /* "View Certificate": decided once we know whether the file exists */
      fileExists(c.file).then(function (ok) {
        if (ok) {
          actions.insertBefore(el("a", {
            className: "btn btn-primary btn-sm",
            attrs: { href: c.file, target: "_blank", rel: "noopener noreferrer", "aria-label": "View certificate: " + c.title + " (opens in a new tab)" }
          }, [icon("fa-regular fa-file-lines"), document.createTextNode("View Certificate")]), actions.firstChild);
        } else {
          actions.insertBefore(el("p", { className: "note-muted", text: "Certificate file not uploaded yet" }), actions.firstChild);
        }
      });

      /* "Verify Credential": only with a real URL; never a fake badge */
      if (isUrl(c.verificationUrl)) {
        actions.appendChild(el("a", {
          className: "btn btn-secondary btn-sm",
          attrs: { href: c.verificationUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": "Verify credential: " + c.title + " (opens in a new tab)" }
        }, [icon("fa-solid fa-arrow-up-right-from-square"), document.createTextNode("Verify Credential")]));
      }
    });
  }

  /* ---------- theme ---------- */
  function initTheme() {
    var btn = qs("#theme-toggle");
    var root = document.documentElement;
    function sync() {
      var dark = root.getAttribute("data-theme") !== "light";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.firstChild.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      var meta = qs('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#0b1020" : "#f6f7fc");
    }
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      sync();
    });
    sync();
  }

  /* ---------- mobile nav ---------- */
  function initNav() {
    var toggle = qs("#nav-toggle");
    var links = qs("#nav-links");
    function set(open) {
      links.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.firstChild.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
    toggle.addEventListener("click", function () { set(!links.classList.contains("open")); });
    qsa("a", links).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) { set(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (links.classList.contains("open") && !links.contains(e.target) && !toggle.contains(e.target)) set(false);
    });

    /* active section highlighting */
    var navAnchors = qsa('.nav-links a[href^="#"]:not(.btn)');
    var byId = {};
    navAnchors.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          navAnchors.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
          var a = byId[en.target.id];
          if (a) { a.classList.add("active"); a.setAttribute("aria-current", "true"); }
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---------- copy email ---------- */
  function initCopyEmail() {
    qs("#copy-email").addEventListener("click", function () {
      var email = CONFIG.links.email;
      function ok() { toast("Email address copied: " + email); }
      function fail() { toast("Copy failed. Please copy it manually: " + email, true); }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(ok, fail);
      } else {
        var ta = el("textarea", { attrs: { "aria-hidden": "true", readonly: "" } });
        ta.value = email;
        ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
        document.body.appendChild(ta);
        ta.select();
        var done = false;
        try { done = document.execCommand("copy"); } catch (e) { done = false; }
        document.body.removeChild(ta);
        done ? ok() : fail();
      }
    });
  }

  /* ---------- scroll-to-top + reveal ---------- */
  function initScroll() {
    var btn = qs("#to-top");
    function onScroll() { btn.hidden = window.scrollY < 600; }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", function () { window.scrollTo({ top: 0 }); });

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = qsa(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------- start ---------- */
  function init() {
    bindLinks();
    bindResume();
    renderSkills();
    renderProjects();
    renderCertificates();
    initTheme();
    initNav();
    initCopyEmail();
    qsa(".exp-card, .edu-card, .stat, .lang, .contact-card, .hero-card").forEach(function (n) { n.classList.add("reveal"); });
    initScroll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
