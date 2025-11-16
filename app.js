const DISCORD_WEBHOOK_RDV   = "https://discordapp.com/api/webhooks/1438784418415251486/WNQ-CP1PVv6dLSAsQod4ZFIcUYHTACN47GPswGxWG4yufXLrRWKytTbTZcffyl9sti1U";
const DISCORD_WEBHOOK_RECRUT = "https://discordapp.com/api/webhooks/1438784604784951299/G27KS5K6HlVeWEBHDefMi6J4c1QPafBJhIl5zR6g5LUpk4meyak3RrHC7ZU17lCRbx0F";
const DISCORD_WEBHOOK_CONGE = "https://discordapp.com/api/webhooks/1439666625807646926/o-a7lN_bVl3mTLpYJcR6UIxx_xX4_xJme7lGe179-lbgFPe0_11UTCX5dj4_HYYVQj25";

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      nav.classList.remove('open');
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

const rdvForm = document.getElementById('form-rdv');
const rdvMsg  = document.getElementById('rdv-message');

if (rdvForm && rdvMsg) {
  rdvForm.addEventListener('submit', async (e) => {
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
          color: 0x7250ff,
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

const recForm = document.getElementById('form-recrut');
const recMsg  = document.getElementById('recrut-message');

if (recForm && recMsg) {
  recForm.addEventListener('submit', async (e) => {
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
          title: "Nouvelle demande de recrutement",
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
          color: 0xffc857,
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

