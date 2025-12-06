document.addEventListener("DOMContentLoaded", () => {

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
      rdvMsg.style.color = "#9B1C1C";

      const formData = new FormData(rdvForm);

      const nom       = formData.get("nom") || "—";
      const telephone = formData.get("telephone") || "—";
      const service   = formData.get("service") || "—";
      const date      = formData.get("date") || "—";
      const heure     = formData.get("heure") || "—";
      const details   = formData.get("details") || "—";

      const payload = {
        username: "Benny's - Rendez-vous",
        embeds: [
          {
            title: "Nouvelle demande de rendez-vous",
            color: 0x9B1C1C,
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
      recMsg.style.color = "#9B1C1C";

      const formData = new FormData(recForm);

      const discord  = formData.get("discord") || "—";
      const age_hrp  = formData.get("age_hrp") || "—";
      const dispo    = formData.get("dispo") || "—";
      const nom_rp   = formData.get("nom_rp") || "—";
      const age_rp   = formData.get("age_rp") || "—";
      const qualites = formData.get("qualites") || "—";
      const defauts  = formData.get("defauts") || "—";
      const motifs   = formData.get("motifs") || "—";
      const pqtoi    = formData.get("pqtoi") || "—";

      const payload = {
        username: "Benny's - Recrutement",
        embeds: [
          {
            title: "Nouvelle candidature Benny's",
            color: 0x9B1C1C,
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

  const EMPLOYEE_CODE = "BENNYS2025";

  const codeInput    = document.getElementById("employee-code");
  const loginBtn     = document.getElementById("employee-login-btn");
  const loginMsg     = document.getElementById("employee-login-msg");
  const loginCard    = document.getElementById("login-card");
  const employeeZone = document.getElementById("employee-zone");

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
      congeMsg.style.color = "#9B1C1C";

      const formData   = new FormData(congeForm);
      const nom_rp     = formData.get("nom_rp") || "—";
      const role       = formData.get("role") || "—";
      const dateDebut  = formData.get("date_debut") || "—";
      const dateFin    = formData.get("date_fin") || "—";
      const motif      = formData.get("motif") || "—";
      const details    = formData.get("details") || "—";

      const payload = {
        username: "Benny's Garage - Demande de congé",
        embeds: [
          {
            title: "Nouvelle demande de congé",
            color: 0x9B1C1C,
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

  (function initFicheBennys() {
    const GRADE_PCT = {
      "Apprenti":      0.15,
      "Expert":        0.25,
      "Chef d’équipe": 0.30,
      "Responsable":   0.40,
      "Propriétaire":  0.40
    };

    const EMP = [
      { id: "arthur", nom: "Arthur Blackwood",  grade: "Propriétaire" },
      { id: "rico",   nom: "Rico Blackwood",    grade: "Responsable" },
      { id: "olsh",   nom: "Jack Blackwood",    grade: "Chef d’équipe" },
      { id: "tot",    nom: "Serge Blackwood",   grade: "Chef d’équipe" },
      { id: "mich",   nom: "Michel Blackwood",  grade: "Apprenti" }
    ];

    const LS_KEY     = "fiche_paie_entries_v6";
    const LS_EMP_KEY = "fiche_paie_selected_employee_v1";

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

    let entries     = load();
    let currentPage = 1;
    let pageSize    = 20;

    const PRICE_PER_KM = 100;
    const KIT_PRICE    = 500; 

    function formatServiceLabel(r) {
      if (r.type === "rep")      return "Réparation";
      if (r.type === "cus")      return "Customisation";
      if (r.type === "rep_dist") {
        return "Réparation à distance";
      }
      if (r.type === "net")      return "Nettoyage";
      if (r.type === "kit")      return "Vente kit de réparation"; 
      if (r.type === "other")    return "Autre";
      return r.type || "—";
    }

    function initSelectors() {
      const empSel = $("#employeeSelect");
      if (!empSel) return;

      empSel.innerHTML = EMP
        .map((e) => `<option value="${e.id}">${e.nom}</option>`)
        .join("");

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
      const e   = EMP.find((x) => x.id === sel);
      const pct = e ? GRADE_PCT[e.grade] || 0 : 0;

      $("#employeeGradeText").textContent =
        "Grade: " + (e ? e.grade : "—") + " (" + Math.round(pct * 100) + "%)";

      computeAndShow();
    }

    function isHalfPriceEnabled() {
      const el = $("#halfPriceCheckbox");
      return !!(el && el.checked);
    }

    function updateDistanceAndAmount() {
      const st          = $("#serviceType").value;
      const kmInput     = $("#distanceKm");
      const amountInput = $("#serviceAmount");

      if (!kmInput || !amountInput || st !== "rep_dist") {
        computeAndShow();
        return;
      }

      const km     = Number(kmInput.value || 0);
      const isHalf = isHalfPriceEnabled();

      const baseRepair    = isHalf ? 400 : 800;
      const distanceTotal = km * PRICE_PER_KM;

      amountInput.value = baseRepair + distanceTotal;

      computeAndShow();
    }

    function updateKitAmount() {
      const st          = $("#serviceType").value;
      const kitsInput   = $("#kitsCount");
      const amountInput = $("#serviceAmount");

      if (!kitsInput || !amountInput || st !== "kit") {
        computeAndShow();
        return;
      }

      const qty = Number(kitsInput.value || 0);
      const total = qty * KIT_PRICE;

      amountInput.value = total;

      computeAndShow();
    }

    function updateServiceFields() {
      const st          = $("#serviceType").value;
      const row         = $("#distanceRow");
      const kitsRow     = $("#kitsRow");    
      const amountInput = $("#serviceAmount");
      const kmInput     = $("#distanceKm");
      const kitsInput   = $("#kitsCount");    

      if (!amountInput) return;

      const showDiscount = st === "rep" || st === "net" || st === "rep_dist";

      if (discountColEl && halfPriceCheckboxEl && discountToggleEl) {
        discountColEl.style.display = showDiscount ? "" : "none";

        if (!showDiscount) {
          halfPriceCheckboxEl.checked = false;
          discountToggleEl.classList.remove("active");
        }
      }

      if (discountRowInlineEl) {
        if (showDiscount) {
          discountRowInlineEl.classList.remove("no-discount");
        } else {
          discountRowInlineEl.classList.add("no-discount");
        }
      }

      const isHalf = isHalfPriceEnabled();

      amountInput.readOnly = false;

      if (st === "rep") {
        amountInput.value    = isHalf ? 400 : 800;
        amountInput.readOnly = true;
      } else if (st === "net") {
        amountInput.value    = isHalf ? 100 : 200;
        amountInput.readOnly = true;
      } else if (st === "rep_dist") {
        amountInput.readOnly = true;
      } else if (st === "kit") { 
        amountInput.readOnly = true;
        const qty = kitsInput ? Number(kitsInput.value || 0) : 0;
        amountInput.value = qty * KIT_PRICE;
      } else if (st === "cus") {
        amountInput.value = 0;
      } else if (st === "other") {
        amountInput.value = 0;
      }

      if (row) {
        if (st === "rep_dist") {
          row.style.display = "";
        } else {
          row.style.display = "none";
          if (kmInput) kmInput.value = 0;
        }
      }

      if (kitsRow) {
        if (st === "kit") {
          kitsRow.style.display = "";
        } else {
          kitsRow.style.display = "none";
          if (kitsInput) kitsInput.value = 0;
        }
      }

      if (st === "rep_dist") {
        updateDistanceAndAmount();
      } else if (st === "kit") {
        updateKitAmount();
      } else {
        computeAndShow();
      }
    }

    function currentCalc() {
      const e   = EMP.find((x) => x.id === $("#employeeSelect").value);
      const pct = e ? GRADE_PCT[e.grade] || 0 : 0;
      const st  = $("#serviceType").value;

      const kmInput   = $("#distanceKm");
      const km        = kmInput ? Number(kmInput.value || 0) : 0;
      const kitsInput = $("#kitsCount");                     
      const kits      = kitsInput ? Number(kitsInput.value || 0) : 0; 

      const isHalf = isHalfPriceEnabled();

      let base          = 0;
      let distanceTotal = 0;

      if (st === "rep") {
        base = isHalf ? 400 : 800;
      } else if (st === "net") {
        base = isHalf ? 100 : 200;
      } else if (st === "rep_dist") {
        base          = isHalf ? 400 : 800;
        distanceTotal = km * PRICE_PER_KM;
      } else if (st === "kit") { 
        base = kits * KIT_PRICE;
      } else {
        base = Number($("#serviceAmount").value || 0);
      }

      const totalBeforePct = base + distanceTotal;
      const total          = Math.round(totalBeforePct * pct);

      return {
        pct,
        base,
        km,
        kits,             
        distance: distanceTotal,
        gross: totalBeforePct,
        total,
        type: st,
        emp: e,
        half: isHalf
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
      $("#weekKeyText").textContent   = wk;
      $("#weekRangeText").textContent = r.start + " → " + r.end;

      let total = 0;
      let rep   = 0;
      let cus   = 0;

      for (let i = 0; i < list.length; i++) {
        total += Number(list[i].total) || 0;
        if (list[i].type === "rep" || list[i].type === "rep_dist") rep++;
        if (list[i].type === "cus") cus++;
      }

      $("#weekTotalAmount").textContent  = money(total);
      $("#weekActionsCount").textContent = String(list.length);
      $("#weekRepairsCount").textContent = String(rep);
      $("#weekCustomsCount").textContent = String(cus);

      const q = ($("#searchInput")?.value || "").trim();
      $("#weekFilterText").textContent = q ? 'Filtre : « ' + q + ' »' : "Aucun filtre";
    }

    function render() {
      const wk  = weekKey($("#dateInput").value || isoToday());
      const all = getFiltered(wk);

      updateWeekPanel(wk, all);

      pageSize = Number($("#pageSizeSelect").value || 20);

      const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1)          currentPage = 1;

      const start = (currentPage - 1) * pageSize;
      const end   = start + pageSize;

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

          const halfTag = r.half
            ? ' <span class="half-pill">[50%]</span>'
            : "";

          html +=
            "<tr>" +
            "<td>" + r.date + "</td>" +
            "<td>" + r.empNom + "</td>" +
            '<td><span class="pill">' + r.grade + "</span></td>" +
            "<td>" + formatServiceLabel(r) + "</td>" +
            "<td>" + money(baseForDisplay) + halfTag + "</td>" +
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
      let totalPay  = 0;
      let rep       = 0;
      let cus       = 0;
      let net       = 0;
      let kit       = 0; 

      for (let i = 0; i < list.length; i++) {
        const r        = list[i];
        const distance = Number(r.distance) || 0;
        const base     = Number(r.base) || 0;
        const gross    =
          typeof r.gross !== "undefined" ? Number(r.gross) : base + distance;

        totalBase += gross;
        totalPay  += Number(r.total) || 0;

        if (r.type === "rep" || r.type === "rep_dist") rep++;
        if (r.type === "cus") cus++;
        if (r.type === "net") net++;
        if (r.type === "kit") kit++;
      }

      const lines = list
        .map((r) => {
          const distance = Number(r.distance) || 0;
          const base     = Number(r.base) || 0;
          const gross    =
            typeof r.gross !== "undefined" ? Number(r.gross) : base + distance;
          const halfTag  = r.half ? " [50%]" : "";

          let extra = "";
          if (r.type === "rep_dist") {
            extra =
              ` | Prix distance: ${money(distance)} | Distance: ${r.km} km`;
          } else if (r.type === "kit") {
            const qty = typeof r.kits !== "undefined" ? r.kits : 0;
            extra = ` | Quantité: ${qty}`;
          }

          return (
            `${r.date} | ${r.empNom} | ${r.grade} | ${formatServiceLabel(r)}` +
            ` | Valeur: ${money(gross)}${halfTag}` +
            extra +
            ` | Revenu: ${money(r.total)}`
          );
        })
        .join("\n");

      return (
        `**FICHE DE PAIE (${name}) — Semaine ${wk}**\n` +
        `Montant à payer: ${money(totalPay)} | Chiffre d'affaire: ${money(totalBase)} | Réparations: ${rep} | Customisations: ${cus} | Nettoyages: ${net} | Kits: ${kit}\n` +
        "```" + "\n" +
        (lines || "Aucune entrée") +
        "\n```"
      );
    }

    function sendDiscord(text, target) {
      let url = null;
      if (target === "fiche")  url = DISCORD_WEBHOOK_FICHE;
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
      const wk   = weekKey($("#dateInput").value || isoToday());
      const list = getFiltered(wk);
      const selId = $("#employeeSelect").value;
      const emp   = EMP.find((e) => e.id === selId);
      const name  = emp ? emp.nom : "Tous les employés";
      const text  = buildDiscordText(list, wk, name);

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
        kits: c.kits,         
        base: c.base,
        distance: c.distance,
        gross: c.gross,
        pct: c.pct,
        total: c.total,
        half: c.half
      };

      entries.push(rec);
      save(entries);
      currentPage = 99999;
      render();

      if (ENABLE_DISCORD_LOG_ON_ADD) {
        const wk = weekKey(rec.date);
        const halfTag = rec.half ? " [50%]" : "";

        const distance = Number(rec.distance) || 0;
        const base     = Number(rec.base) || 0;
        const gross    =
          typeof rec.gross !== "undefined" ? Number(rec.gross) : base + distance;

        let extra = "";
        if (rec.type === "rep_dist") {
          extra =
            " | Prix distance: " + money(distance) + " | Distance: " + rec.km + " km";
        } else if (rec.type === "kit") { 
          const qty = typeof rec.kits !== "undefined" ? rec.kits : 0;
          extra = " | Quantité: " + qty;
        }

        const t  =
          "**NOUVELLE ENTRÉE (" + rec.empNom + ") — Semaine " + wk + "**\n" +
          "```\n" +
          rec.date + " | " + rec.empNom + " | " + rec.grade + " | " +
          formatServiceLabel(rec) +
          " | Valeur: " + money(gross) + halfTag +
          extra +
          " | Revenu: " + money(rec.total) +
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

    const employeeSelectEl     = $("#employeeSelect");
    const dateInputEl          = $("#dateInput");
    const serviceTypeEl        = $("#serviceType");
    const serviceAmountEl      = $("#serviceAmount");
    const distanceKmEl         = $("#distanceKm");
    const kitsCountEl          = document.getElementById("kitsCount"); 
    const searchInputEl        = $("#searchInput");
    const addToWeekBtn         = $("#addToWeekButton");
    const clearWeekBtn         = $("#clearWeekButton");
    const prevPageBtn          = $("#prevPageBtn");
    const nextPageBtn          = $("#nextPageBtn");
    const pageSizeSelectEl     = $("#pageSizeSelect");
    const exportDiscordBtn     = $("#exportDiscordButton");
    const halfPriceCheckboxEl  = $("#halfPriceCheckbox");
    const discountColEl        = document.getElementById("discountCol");
    const discountToggleEl     = document.querySelector("#fiche-root .discount-toggle");
    const discountRowInlineEl  = document.getElementById("discountRowInline");

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
      distanceKmEl.addEventListener("input", updateDistanceAndAmount);
    }

    if (kitsCountEl) { 
      kitsCountEl.addEventListener("input", updateKitAmount);
    }

    if (halfPriceCheckboxEl) {
      const syncDiscountToggleVisual = () => {
        if (!discountToggleEl) return;
        if (halfPriceCheckboxEl.checked) {
          discountToggleEl.classList.add("active");
        } else {
          discountToggleEl.classList.remove("active");
        }
      };

      halfPriceCheckboxEl.addEventListener("change", () => {
        syncDiscountToggleVisual();
        updateServiceFields();
      });

      syncDiscountToggleVisual();
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

  const DISCORD_WEBHOOK_RDV = "https://discord.com/api/webhooks/1446227799026434189/aYgn03dW4ePEbmH1UPFuiyYNRDpSNswHcoshRhBpu_HcVaX9SLrCibfBQvt8_KvvJPPV";
  const DISCORD_WEBHOOK_RECRUT = "https://discord.com/api/webhooks/1446228002311634988/BdbtB6rRd0o0e9cOfQhU0pvzyimZtZM0NcpagdNbFnSwaJUVTq7abyPklu_zCKBT_SNQ";
  const DISCORD_WEBHOOK_CONGE = "https://discord.com/api/webhooks/1446228113691246714/tPl_7iVOypvaU2pZ1QjFVRTsvZu4KfRvMmuh_jSK9WlKpdSOm-C1uVkflvrR8-7NyMVU";
  const DISCORD_WEBHOOK_FICHE = "https://discord.com/api/webhooks/1446228363730751601/XkIW5givj_HP0Ch-zaPBkha0MDrq35YUtKM6vS4wN0FEBi5fKvVBw8az58bInNaxT0G6";
  const DISCORD_WEBHOOK_ENTREE ="https://discord.com/api/webhooks/1446228205999751341/P4oQBT7hFwIv0S79Ln0k3O_WKZmpx5bOfOo85myYCe4MvjOO5EgvhO16zPEQTfchbOyH";
});
