document.addEventListener("DOMContentLoaded", () => {
  const DISCORD_WEBHOOK_RDV   = "https://discordapp.com/api/webhooks/1438784418415251486/WNQ-CP1PVv6dLSAsQod4ZFIcUYHTACN47GPswGxWG4yufXLrRWKytTbTZcffyl9sti1U";
  const DISCORD_WEBHOOK_RECRUT = "https://discordapp.com/api/webhooks/1438784604784951299/G27KS5K6HlVeWEBHDefMi6J4c1QPafBJhIl5zR6g5LUpk4meyak3RrHC7ZU17lCRbx0F";
  const DISCORD_WEBHOOK_CONGE = "https://discordapp.com/api/webhooks/1439666625807646926/o-a7lN_bVl3mTLpYJcR6UIxx_xX4_xJme7lGe179-lbgFPe0_11UTCX5dj4_HYYVQj25";

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        nav.classList.remove("open");
      }
    });
  }

  async function sendToDiscord(webhookUrl, payload) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error("Erreur HTTP " + res.status);
    }
  }

  const rdvForm = document.getElementById("form-rdv");
  const rdvMsg  = document.getElementById("rdv-message");
  if (rdvForm && rdvMsg) {
    rdvForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      rdvMsg.textContent = "Envoi en cours…";
      rdvMsg.style.color = "#b7a8ff";

      const formData = new FormData(rdvForm);

      const nom       = formData.get("nom") || "—";
      const telephone = formData.get("telephone") || "—";
      const service   = formData.get("service") || "—";
      const date      = formData.get("date") || "—";
      const heure     = formData.get("heure") || "—";
      const details   = formData.get("details") || "—";

      const payload = {
        username: "Tuners - Rendez-vous",
        embeds: [
          {
            title: "Nouvelle demande de rendez-vous",
            color: 0x4b39c7,
            fields: [
              { name: "Nom RP", value: nom, inline: false },
              { name: "Numéro de téléphone", value: telephone, inline: false },
              { name: "Service demandé", value: service, inline: true },
              { name: "Jour souhaité", value: date, inline: true },
              { name: "Heure approximative", value: heure, inline: true },
              {
                name: "Détails",
                value: details.length > 0 ? details : "Aucun détail fourni.",
                inline: false
              }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      try {
        await sendToDiscord(DISCORD_WEBHOOK_RDV, payload);
        rdvMsg.textContent =
          "Demande envoyée sur Discord. Un membre de l'équipe vous contactera pour confirmer le rendez-vous.";
        rdvMsg.style.color = "#77dd88";
        rdvForm.reset();
      } catch (err) {
        console.error(err);
        rdvMsg.textContent =
          "Une erreur est survenue lors de l'envoi sur Discord. Veuillez réessayer plus tard.";
        rdvMsg.style.color = "#ff7b7b";
      }
    });
  }

  const recForm = document.getElementById("form-recrut");
  const recMsg  = document.getElementById("recrut-message");

  if (recForm && recMsg) {
    recForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      recMsg.textContent = "Envoi en cours…";
      recMsg.style.color = "#b7a8ff";

      const formData = new FormData(recForm);

      const discord = formData.get("discord") || "—";
      const age_hrp = formData.get("age_hrp") || "—";
      const dispo   = formData.get("dispo") || "—";
      const nom_rp  = formData.get("nom_rp") || "—";
      const age_rp  = formData.get("age_rp") || "—";
      const qualites = formData.get("qualites") || "—";
      const defauts  = formData.get("defauts") || "—";
      const motifs   = formData.get("motifs") || "—";
      const pqtoi    = formData.get("pqtoi") || "—";

      const payload = {
        username: "Tuners - Recrutement",
        embeds: [
          {
            title: "Nouvelle candidature Tuners",
            color: 0x4b39c7,
            fields: [
              { name: "Pseudo Discord", value: discord, inline: false },
              { name: "Âge HRP", value: String(age_hrp), inline: true },
              { name: "Disponibilités", value: dispo, inline: true },
              { name: "Nom & prénom RP", value: nom_rp, inline: false },
              { name: "Âge RP", value: String(age_rp), inline: true },
              { name: "Qualités", value: qualites, inline: false },
              { name: "Défauts", value: defauts, inline: false },
              { name: "Motivations", value: motifs, inline: false },
              { name: "Pourquoi toi ?", value: pqtoi, inline: false }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      try {
        await sendToDiscord(DISCORD_WEBHOOK_RECRUT, payload);
        recMsg.textContent =
          "Candidature envoyée sur Discord. L'équipe vous contactera directement sur Discord si vous êtes retenu(e).";
        recMsg.style.color = "#77dd88";
        recForm.reset();
      } catch (err) {
        console.error(err);
        recMsg.textContent =
          "Une erreur est survenue lors de l'envoi sur Discord. Veuillez réessayer plus tard.";
        recMsg.style.color = "#ff7b7b";
      }
    });
  }

  const EMPLOYEE_CODE = "TUNERS2025";

  const codeInput      = document.getElementById("employee-code");
  const loginBtn       = document.getElementById("employee-login-btn");
  const loginMsg       = document.getElementById("employee-login-msg");
  const loginCard      = document.getElementById("login-card");
  const employeeZone   = document.getElementById("employee-zone");

  if (codeInput && loginBtn && loginMsg && loginCard && employeeZone) {
    loginBtn.addEventListener("click", () => {
      const value = codeInput.value.trim();

      if (value === EMPLOYEE_CODE) {
        loginMsg.textContent = "Accès accordé.";
        loginMsg.style.color = "#77dd88";

        loginCard.style.display = "none";
        employeeZone.style.display = "block";
      } else {
        loginMsg.textContent = "Code incorrect.";
        loginMsg.style.color = "#ff7b7b";
      }
    });

    codeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        loginBtn.click();
      }
    });
  }

  const congeForm = document.getElementById("form-conge");
  const congeMsg  = document.getElementById("conge-message");

  if (congeForm && congeMsg) {
    congeForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      congeMsg.textContent = "Envoi en cours…";
      congeMsg.style.color = "#b7a8ff";

      const formData   = new FormData(congeForm);
      const nom_rp     = formData.get("nom_rp") || "—";
      const role       = formData.get("role") || "—";
      const dateDebut  = formData.get("date_debut") || "—";
      const dateFin    = formData.get("date_fin") || "—";
      const motif      = formData.get("motif") || "—";
      const details    = formData.get("details") || "—";

      const payload = {
        username: "Tuners - Demande de congé",
        embeds: [
          {
            title: "Nouvelle demande de congé",
            color: 0x4b39c7,
            fields: [
              { name: "Nom & prénom RP", value: nom_rp, inline: false },
              { name: "Poste / rôle", value: role, inline: false },
              { name: "Date de début", value: dateDebut, inline: true },
              { name: "Date de fin", value: dateFin, inline: true },
              { name: "Motif", value: motif, inline: false },
              {
                name: "Détails supplémentaires",
                value: details && details.trim().length > 0 ? details : "Aucun détail supplémentaire.",
                inline: false
              }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      try {
        await sendToDiscord(DISCORD_WEBHOOK_CONGE, payload);
        congeMsg.textContent =
          "Demande de congé envoyée sur Discord. La direction vous répondra directement.";
        congeMsg.style.color = "#77dd88";
        congeForm.reset();
      } catch (err) {
        console.error(err);
        congeMsg.textContent =
          "Une erreur est survenue lors de l'envoi sur Discord. Veuillez réessayer plus tard.";
        congeMsg.style.color = "#ff7b7b";
      }
    });
  }

  (function initFicheTuners() {
    const ficheRoot = document.getElementById("fiche-root");
    if (!ficheRoot) return;

    const GRADE_PCT = {
      "Apprenti": 0.15,
      "Expert": 0.25,
      "Chef d’équipe": 0.30,
      "Responsable": 0.40,
      "Propriétaire": 0.40
    };

    const EMP = [
      { id: "arthur", nom: "Arthur Blackwood", grade: "Propriétaire" },
      { id: "rico",   nom: "Rico Blackwood",   grade: "Responsable" },
      { id: "olsh",   nom: "Jack Blackwood",   grade: "Chef d’équipe" },
      { id: "tot",    nom: "Serge Blackwood",  grade: "Chef d’équipe" }
    ];

    const LS_KEY     = "fiche_paie_entries_v6";
    const LS_EMP_KEY = "fiche_paie_selected_employee_v1";

    const DISCORD_WEBHOOK_FICHE  =
      "https://discordapp.com/api/webhooks/1438918928951672882/3tufNFwGiXhDwFi4nDF8YmIGaz1I1ymGWIpLNoCA3Venv1uIOQkeuod6Zc4mdwBOqtaQ";
    const DISCORD_WEBHOOK_ENTREE =
      "https://discordapp.com/api/webhooks/1438915757898469386/dZ7HjeO-pU4O9y_NL_-KTb7eb8Jjt0ohG-aiZsfb2cCnKG0EruTKq4_buCvYp_3dFkRk";

    const ENABLE_DISCORD_LOG_ON_ADD = true;

    const $ = (sel) => document.querySelector(sel);

    const money = (n) => {
      const v = Number(n) || 0;
      return v.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
    };

    function isoToday() {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }

    function parseLocalISODate(iso) {
      const [y, m, d] = iso.split("-").map(Number);
      return new Date(y, m - 1, d);
    }

    function weekKey(iso) {
      const d = parseLocalISODate(iso);
      const target = new Date(d.valueOf());
      const dayNr = (d.getDay() + 6) % 7;
      target.setDate(target.getDate() - dayNr + 3); 

      const firstThu = new Date(target.getFullYear(), 0, 4);
      const week =
        1 +
        Math.round(
          ((target - firstThu) / 86400000 - 3 + ((firstThu.getDay() + 6) % 7)) / 7
        );
      return target.getFullYear() + "-S" + String(week).padStart(2, "0");
    }

    function weekRange(iso) {
      const d = parseLocalISODate(iso || isoToday());
      const day = (d.getDay() + 6) % 7; 
      const mon = new Date(d);
      mon.setDate(d.getDate() - day);   
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);   
      const f = (x) => x.toLocaleDateString("fr-CA");
      return { start: f(mon), end: f(sun) };
    }

    function save(arr) {
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
    }

    function load() {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY)) || [];
      } catch (e) {
        return [];
      }
    }

    let entries = load();
    let currentPage = 1;
    let pageSize = 20;
    const PRICE_PER_KM = 100;

    function formatServiceLabel(r) {
      if (r.type === "rep") return "Réparation";
      if (r.type === "cus") return "Customisation";
      if (r.type === "rep_dist") {
        return "Réparation à distance" + (r.km ? " (" + r.km + " km)" : "");
      }
      if (r.type === "net") return "Nettoyage";
      if (r.type === "other") return "Autre";
      return r.type || "—";
    }

    function initSelectors() {
      const empSel = $("#employeeSelect");
      if (!empSel) return;

      empSel.innerHTML = EMP.map((e) => `<option value="${e.id}">${e.nom}</option>`).join("");

      const savedEmpId = localStorage.getItem(LS_EMP_KEY);
      if (savedEmpId && EMP.some((e) => e.id === savedEmpId)) {
        empSel.value = savedEmpId;
      } else {
        empSel.selectedIndex = 0;
      }

      $("#dateInput").value = isoToday();
      updateGradeHint();
      updateServiceFields();
      render();
    }

    function updateGradeHint() {
      const sel = $("#employeeSelect").value;
      const e = EMP.find((x) => x.id === sel);
      const pct = e ? GRADE_PCT[e.grade] || 0 : 0;
      $("#employeeGradeText").textContent =
        "Grade: " + (e ? e.grade : "—") + " (" + Math.round(pct * 100) + "%)";
      computeAndShow();
    }

    function updateServiceFields() {
      const st = $("#serviceType").value;
      const row = $("#distanceRow");
      if (!row) return;
    
      const amountInput = $("#serviceAmount");
      if (st === "rep") {
        amountInput.value = 800;
      } else if (st === "net") {
        amountInput.value = 200;
      } else if (st === "cus") {
        amountInput.value = 0;
      } else if (st === "rep_dist") {
        amountInput.value = 800;
      } else if (st === "other") {
        amountInput.value = 0; 
      }
    
      if (st === "rep_dist") {
        row.style.display = "";
      } else {
        row.style.display = "none";
        const kmInput = $("#distanceKm");
        if (kmInput) kmInput.value = 0;
      }
      computeAndShow();
    }

    function currentCalc() {
      const e = EMP.find((x) => x.id === $("#employeeSelect").value);
      const pct = e ? GRADE_PCT[e.grade] || 0 : 0;
      const base = Number($("#serviceAmount").value || 0);

      const kmInput = $("#distanceKm");
      const km = kmInput ? Number(kmInput.value || 0) : 0;

      const distanceTotal = km * PRICE_PER_KM;
      const totalBeforePct = base + distanceTotal;
      const total = Math.round(totalBeforePct * pct);

      return {
        pct,
        base,
        km,
        distance: distanceTotal,
        gross: totalBeforePct,
        total,
        type: $("#serviceType").value,
        emp: e
      };
    }

    function computeAndShow() {
      $("#totalToPayInput").value = money(currentCalc().total);
    }

    function getFiltered(wk) {
      const q = ($("#searchInput")?.value || "").toLowerCase().trim();
      return entries.filter((r) => {
        if (weekKey(r.date) !== wk) return false;
        if (!q) return true;
        const hay = (r.empNom + " " + r.grade + " " + formatServiceLabel(r)).toLowerCase();
        return hay.indexOf(q) !== -1;
      });
    }

    function updateWeekPanel(wk, list) {
      const r = weekRange($("#dateInput").value || isoToday());
      $("#weekKeyText").textContent = wk;
      $("#weekRangeText").textContent = r.start + " → " + r.end;

      let total = 0,
        rep = 0,
        cus = 0;
      for (let i = 0; i < list.length; i++) {
        total += Number(list[i].total) || 0;
        if (list[i].type === "rep" || list[i].type === "rep_dist") rep++;
        if (list[i].type === "cus") cus++;
      }

      $("#weekTotalAmount").textContent = money(total);
      $("#weekActionsCount").textContent = String(list.length);
      $("#weekRepairsCount").textContent = String(rep);
      $("#weekCustomsCount").textContent = String(cus);

      const q = ($("#searchInput")?.value || "").trim();
      $("#weekFilterText").textContent = q ? 'Filtre : « ' + q + ' »' : "Aucun filtre";
    }

    function render() {
      const wk = weekKey($("#dateInput").value || isoToday());
      const all = getFiltered(wk);
      updateWeekPanel(wk, all);
    
      pageSize = Number($("#pageSizeSelect").value || 20);
      const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;
    
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
    
      let html = "";
      if (all.length === 0) {
        html = `<tr><td colspan="8" style="color:#9fb0c3">
                  Aucune entrée pour la semaine ${wk}.
                </td></tr>`;
      } else {
        for (let i = start; i < all.length && i < end; i++) {
          const r = all[i];
    
          const baseForDisplay =
            r.type === "rep_dist"
              ? (
                  typeof r.gross !== "undefined"
                    ? Number(r.gross)             
                    : (Number(r.base || 0) + Number(r.distance || 0))
                )
              : Number(r.base || 0);
    
          html +=
            "<tr>" +
            "<td>" + r.date + "</td>" +
            "<td>" + r.empNom + "</td>" +
            '<td><span class="pill">' + r.grade + "</span></td>" +
            "<td>" + formatServiceLabel(r) + "</td>" +
            "<td>" + money(baseForDisplay) + "</td>" +         
            "<td>" + Math.round(r.pct * 100) + "%</td>" +
            "<td><strong>" + money(r.total) + "</strong></td>" +
            '<td><button class="btn btn-ghost btn-del" data-id="' + r.id + '">Supprimer</button></td>' +
            "</tr>";
        }
      }
      $("#actionsTableBody").innerHTML = html;
    
      document.querySelectorAll(".btn-del").forEach((btn) => {
        btn.addEventListener("click", (ev) =>
          removeRow(ev.currentTarget.getAttribute("data-id"))
        );
      });
    
      $("#pageInfoText").textContent =
        "Page " + (all.length ? currentPage : 0) + "/" + totalPages;
    }

    function buildDiscordText(list, wk, name) {
      let totalBase = 0;
      let totalPay = 0;
      let rep = 0,
        cus = 0;

      for (let i = 0; i < list.length; i++) {
        const r = list[i];
        const distance = Number(r.distance) || 0;
        const base = Number(r.base) || 0;
        const gross =
          typeof r.gross !== "undefined" ? Number(r.gross) : base + distance;

        totalBase += gross;
        totalPay += Number(r.total) || 0;

        if (r.type === "rep" || r.type === "rep_dist") rep++;
        if (r.type === "cus") cus++;
      }

      const lines = list
        .map((r) => {
          const distance = Number(r.distance) || 0;
          const base = Number(r.base) || 0;
          const gross =
            typeof r.gross !== "undefined" ? Number(r.gross) : base + distance;

          return (
            `${r.date} | ${r.empNom} | ${r.grade} | ${formatServiceLabel(r)}` +
            ` | base ${money(base)}` +
            (r.type === "rep_dist"
              ? ` | dist ${money(distance)} | km:${r.km}`
              : "") +
            ` | brut ${money(gross)}` +
            ` | ${Math.round(r.pct * 100)}%` +
            ` => ${money(r.total)}`
          );
        })
        .join("\n");

      return (
        `**FICHE DE PAIE (${name}) — Semaine ${wk}**\n` +
        `Montant à payer: ${money(totalPay)} | Chiffre d'affaire: ${money(totalBase)} | Réparations: ${rep} | Customisations: ${cus}\n` +
        "```" + "\n" +
        (lines || "Aucune entrée") +
        "\n```"
      );
    }

    function sendDiscord(text, target) {
      let url = null;
      if (target === "fiche") url = DISCORD_WEBHOOK_FICHE;
      if (target === "entree") url = DISCORD_WEBHOOK_ENTREE;

      if (!url) {
        console.warn("Webhook missing for", target);
        return Promise.resolve();
      }

      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text })
      });
    }

    function exportCurrentWeekToDiscord() {
      const wk = weekKey($("#dateInput").value || isoToday());
      const list = getFiltered(wk);
      const selId = $("#employeeSelect").value;
      const emp = EMP.find((e) => e.id === selId);
      const name = emp ? emp.nom : "Tous les employés";
      const text = buildDiscordText(list, wk, name);

      sendDiscord(text, "fiche")
        .then(() => alert("Export envoyé sur Discord."))
        .catch(() => alert("Erreur d'envoi Discord."));
    }

    function add() {
      const c = currentCalc();
      if (!c.emp) {
        alert("Sélectionne un employé.");
        return;
      }

      const rec = {
        id: String(Date.now()) + Math.floor(Math.random() * 10000),
        date: $("#dateInput").value || isoToday(),
        empId: c.emp.id,
        empNom: c.emp.nom,
        grade: c.emp.grade,
        type: c.type,
        km: c.km,
        base: c.base,
        distance: c.distance,
        gross: c.gross,
        pct: c.pct,
        total: c.total
      };
      entries.push(rec);
      save(entries);
      currentPage = 99999;
      render();

      if (ENABLE_DISCORD_LOG_ON_ADD) {
        const wk = weekKey(rec.date);
        const t =
          "**NOUVELLE ENTRÉE (" + rec.empNom + ") — Semaine " + wk + "**\n" +
          "```\n" +
          rec.date + " | " + rec.empNom + " | " + rec.grade + " | " +
          formatServiceLabel(rec) +
          " | base " + money(rec.base) +
          (rec.type === "rep_dist"
            ? " | dist " + money(rec.distance) + " | km:" + rec.km
            : "") +
          " | brut " + money(rec.gross) +
          " | " + Math.round(rec.pct * 100) + "%" +
          " => " + money(rec.total) +
          "\n```";

        sendDiscord(t, "entree");
      }
    }

    function removeRow(id) {
      entries = entries.filter((r) => r.id !== id);
      save(entries);
      render();
    }

    function resetWeek() {
      const wk = weekKey($("#dateInput").value || isoToday());
      if (!confirm("Confirmer la suppression de toutes les entrées de la semaine " + wk + " ?")) {
        return;
      }

      const list = getFiltered(wk);
      if (list.length === 0) {
        alert("Aucune entrée à supprimer.");
        return;
      }

      const ids = {};
      list.forEach((r) => (ids[r.id] = true));
      entries = entries.filter((r) => !ids[r.id]);
      save(entries);
      render();
      alert("Semaine vidée.");
    }

    const employeeSelectEl   = $("#employeeSelect");
    const dateInputEl        = $("#dateInput");
    const serviceTypeEl      = $("#serviceType");
    const serviceAmountEl    = $("#serviceAmount");
    const distanceKmEl       = $("#distanceKm");
    const searchInputEl      = $("#searchInput");
    const addToWeekBtn       = $("#addToWeekButton");
    const clearWeekBtn       = $("#clearWeekButton");
    const prevPageBtn        = $("#prevPageBtn");
    const nextPageBtn        = $("#nextPageBtn");
    const pageSizeSelectEl   = $("#pageSizeSelect");
    const exportDiscordBtn   = $("#exportDiscordButton");

    if (!employeeSelectEl) return;

    employeeSelectEl.addEventListener("change", () => {
      localStorage.setItem(LS_EMP_KEY, employeeSelectEl.value);
      updateGradeHint();
    });

    dateInputEl.addEventListener("change", () => {
      currentPage = 1;
      render();
    });

    serviceTypeEl.addEventListener("change", updateServiceFields);
    serviceAmountEl.addEventListener("input", computeAndShow);
    if (distanceKmEl) {
      distanceKmEl.addEventListener("input", computeAndShow);
    }

    searchInputEl.addEventListener("input", () => {
      currentPage = 1;
      render();
    });

    addToWeekBtn.addEventListener("click", add);
    clearWeekBtn.addEventListener("click", resetWeek);
    prevPageBtn.addEventListener("click", () => {
      currentPage--;
      render();
    });
    nextPageBtn.addEventListener("click", () => {
      currentPage++;
      render();
    });
    pageSizeSelectEl.addEventListener("change", () => {
      currentPage = 1;
      render();
    });
    exportDiscordBtn.addEventListener("click", exportCurrentWeekToDiscord);

    initSelectors();
  })();
});
