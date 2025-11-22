// ------------------ BSOD ------------------
function triggerBSOD() {
  const bsod = document.getElementById("bsod");
  const shutdown = document.getElementById("shutdown-sfx");
  if (!bsod) return;

  // show screen as flex for centering
  bsod.style.display = "flex";

  // block the whole page
  document.getElementById("click-blocker").style.display = "block";

  // play shutdown sound
  if (shutdown) {
    shutdown.pause();
    shutdown.currentTime = 0;
    shutdown.play().catch(() => {});
  }

  // stop ALL interaction with the page
  document.body.style.pointerEvents = "none";
  bsod.style.pointerEvents = "auto";

  // press-any-key → reload
  const reload = () => location.reload();
  document.addEventListener("keydown", reload, { once: true });
}

// ------------------ SCORE SYSTEM ------------------
let score = 50;
function changeScore(amount) {
  score = Math.max(0, Math.min(100, score + amount));
}

// ------------------ AUDIO ------------------
function playNotifySound() {
  const notify = document.getElementById("notify-sound");
  if (!notify) return;
  notify.pause();
  notify.currentTime = 0;
  notify.play().catch(err => console.log("Audio blocked:", err));
}

// ------------------ POPUP SYSTEM ------------------
function showPopup(title, message, buttonLabel = "OK", callback) {
  const popup = document.createElement("div");
  popup.className = "window popup-open";
  popup.style = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    z-index: 10000;
    font-size: 14px;
    background: #c0c0c0;
    height: auto;
  `;
  popup.innerHTML = `
    <div class="title-bar">
      <div class="title-bar-text">${title}</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body" style="padding:4px 6px;">
      <p style="margin:0; margin-bottom:12px;">${message}</p>
      <div style="text-align:center; width:100%;">
        <button>${buttonLabel}</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  document.getElementById("click-blocker").style.display = "block";

  const closePopup = () => {
    popup.remove();
    if (callback) callback();
    document.getElementById("click-blocker").style.display = "none";
  };
  popup.querySelectorAll("button").forEach(btn => btn.onclick = closePopup);
  playNotifySound();
}

// ------------------ CHECK END GAME ------------------
function checkCompletePopup() {
  // Only consider real emails
  const realEmails = emails.filter(email => !email.tutorial);
  const allOpened = realEmails.every(email => email.opened);

  if (allOpened) {
    showPopup(
      "Complete",
      `Score: ${score}%`,
      "Retry",
      () => location.reload()
    );
  }
}

// ------------------ TUTORIAL STATE ------------------
let tutorialActive = true;
let tutorialShown = { grandma: false, phishing: false, finished: false };

function triggerGrandmaPopup() {
  if (!tutorialActive || tutorialShown.grandma) return;
  tutorialShown.grandma = true;
  setTimeout(() => showPopup("Aw, how sweet", "You can save this email."), 500);
}

function triggerPhishingPopup() {
  if (!tutorialActive || tutorialShown.phishing) return;
  tutorialShown.phishing = true;
  setTimeout(() => showPopup(
    "Uh oh",
    "This looks like a phishing email. Watch for urgency, threats, requests for sensitive info, generic greetings, odd sender names, or strange links/files. Mark it as spam."
  ), 500);
}

function triggerFinalPopup() {
  if (!tutorialActive || tutorialShown.finished) return;
  tutorialShown.finished = true;
  showPopup(
    "Good job",
    "You’re on your own from here. Let’s clean this inbox.",
    "OK",
    () => {
      tutorialActive = false;
      revealAllEmails();
    }
  );
}

// ------------------ EMAIL DATA ------------------
const emails = [
  // Tutorial emails
  {
    subject: "Hi John, it’s Grandma!",
    sender: "grandmadoe@email.com",
    body: `I baked cookies :)`,
    phishing: false,
    attachment: "grandma.png",
    opened: false,
    tutorial: true
  },
  {
    subject: "URGENT: RECOVER YOUR FUNDS",
    sender: "melissa.j@globalsecure.com",
    body: `
Dear,

We have identified your account as eligible for recovery of $4,872.15 USD from a recent online fraud case (Case ID: #FR-9921).

To claim your funds, please verify your identity by providing:

• Full Name  
• Date of Birth  
• Mailing Address  
• Photo ID

Send this information within 48 hours to avoid losing your claim.

For confidentiality, do not share this with anyone.  
Questions? Reply to support.globalsecure@mail.com.

Sincerely,  
Melissa Johnson  
Chief Director - Financial Recovery Team`,
    phishing: true,
    attachment: null,
    opened: false,
    tutorial: true
  }
];

let lastOpenedEmail = null;

// ------------------ EMAIL UTILS ------------------
function formatLinks(text, emailIndex) {
  return text.replace(/\*(.*?)\*/g, (match, p1) =>
    `<span style="text-decoration:underline; color:#0000EE; cursor:pointer;" onclick="handleLinkClick('${p1}', ${emailIndex})">${p1}</span>`
  );
}

function handleLinkClick(url, emailIndex) {
  const email = emails[emailIndex];
  if (!email) return;

  if (email.phishing) {
    triggerBSOD();
    return;
  }

  window.open(url, "_blank");
}

// ------------------ DRAW EMAIL SUBJECTS ------------------
function drawSubjects() {
  const list = document.getElementById("subject-list");
  list.innerHTML = "";

  emails.forEach((mail, index) => {
    const div = document.createElement("div");
    div.className = "subject";
    div.innerHTML = formatLinks(mail.subject, index); // clickable *text*
    div.addEventListener("click", () => openEmail(index));
    list.appendChild(div);
  });
}

// ------------------ OPEN EMAIL ------------------

function formatLinks(text, emailIndex) {
  return text.replace(/\*(.*?)\*/g, (match, p1) => {
    return `<span style="text-decoration:underline; color:#0000EE; cursor:pointer;" onclick="handleLinkClick('${p1}', ${emailIndex})">${p1}</span>`;
  });
}

function openEmail(index) {
  const email = emails[index];
  if (!email) return;

  email.opened = true; // mark this email as opened
  lastOpenedEmail = index;
  const view = document.getElementById("content-view");

  // determine attachment HTML
  let attachmentHTML = "";
  if (email.subject.includes("Sussy Amongus")) {
    // fake .exe attachment that triggers BSOD
    attachmentHTML = `
      <div class="attachment" style="display:flex; flex-direction:column; gap:6px;">
        <img src="assets/file.png" style="width:16px; image-rendering:pixelated;">
        <span style="text-decoration:underline; color:#0000EE; cursor:pointer;" onclick="triggerBSOD()">AccountSafety_Report.exe</span>
      </div>
    `;
  } else if (email.attachment) {
    // normal attachment
    attachmentHTML = `
      <div class="attachment" style="display:flex; flex-direction:column; gap:6px; cursor:pointer;" onclick="openAttachment('${email.attachment}', ${index})">
        <img src="assets/file.png" style="width:16px; image-rendering:pixelated;">
        <span style="text-decoration:underline; color:#0000EE; cursor:pointer;">${email.attachment}</span>
      </div>
    `;
  }

  view.innerHTML = `
    <div id="email-content" style="height:100%; overflow-y:auto;">
      <div style="margin-bottom: 12px;">
        <strong>From:</strong> ${email.sender}<br>
        <strong>Subject:</strong> ${formatLinks(email.subject, index)}
      </div>
      <p style="white-space:pre-wrap; margin-bottom:20px;">${formatLinks(email.body, index)}</p>
      ${attachmentHTML}
      <div id="attachment-preview" style="margin-top:12px;"></div>
      <div style="margin-top:20px; display:flex; gap:10px;">
        <button onclick="markSpam(${index})">Mark as spam</button>
      </div>
    </div>
  `;

  // tutorial phishing popups
  if (tutorialActive && email.phishing) triggerPhishingPopup();
  
  // check end-screen only for non-tutorial emails
  if (!tutorialActive || index >= 2) checkCompletePopup();
}

// ------------------ OPEN ATTACHMENT ------------------
function openAttachment(filename, emailIndex) {
  const email = emails[emailIndex];
  if (!email) return;

  // phishing trigger – only yeowch.png is safe
  if (email.phishing && filename !== "yeowch.png") {
    triggerBSOD();
    return;
  }

  // otherwise open image safely
  const preview = document.getElementById("attachment-preview");
  preview.innerHTML = `
    <img src="assets/${filename}" style="
      max-width:250px;
      max-height:250px;
      image-rendering:pixelated;
      display:block;
      margin-top:6px;
    ">
  `;
  if (tutorialActive && filename === "grandma.png") triggerGrandmaPopup();
}

// ------------------ MARK SPAM ------------------
function markSpam(index) {
  const mail = emails[index];
  if (mail.attachment === "grandma.png") {
    showPopup("You monster", "How could you", "Retry", () => location.reload());
  } else if (mail.phishing) {
    if (tutorialActive) triggerFinalPopup();
    else changeScore(+10);
  } else {
    changeScore(-10);
  }

  emails.splice(index, 1);
  drawSubjects();
  document.getElementById("content-view").innerHTML = "";
}

// ------------------ REVEAL ADDITIONAL EMAILS ------------------
function revealAllEmails() {
  const additionalEmails = [
    {
      subject: "Google Internship $200,000 / YEAR",
      sender: "googleinternship123@email.com",
      body: `Congratulations! You have been pre-selected for a Google Paid Internship worth $200,000 yearly + bonuses. Spots are VERY limited, so act fast.

Minimum qualifications:

Currently studying something in tech (PhD not required but looks good).

Knows at least ONE coding language (Java, C, Python, Go, etc. all fine).

Comfortable using Windows, Linux, or any computer really.

Must be ready to start IMMEDIATELY.

To claim this internship, reply with your full name, school ID, resume, and personal phone number so we can fast track your application.

This offer will CLOSE in 24 HOURS.

Apply now to not miss this once-in-a-lifetime chance!!!`,
phishing: true,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "Sussy Amongus Activity on your Bank Account",
      sender: "realbank-noreply@yunsjioe129dj.edu",
      body: `Dear Customer,

We detected SUSSY activity on your bank account. Your account may be IMPOSTERED and needs immediate verifycation.

Please open the attached file AccountSafety_Report.exe to confirm your identity and stop your card from being locked.

If you do NOT open this file in the next 30 minutes, your account will be permanently cancelled.

Thank you,
Real Bank Security Team`,
phishing: true,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "URGENT Pay $150 TODAY",
      sender: "barbarabatesog3085@outleak.fr",
      body: `FasTrak Final Notice:
You still owe $150 for unpaid toll fees. Your account is now in delinquent status.

If you do not pay by tomorrow, you may face extra charges and legal action.

*PAY NOW*

(Do not ignore this message.)`,
phishing: true,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "I need money my car got obliterated",
      sender: "unknowncousinhelp@fastmail.co",
      body: `Hello. I am your cousin. 
      

My car was totally destroyed today. I need 100$ fast. It is an emergeancy please. 

No cash. Transfer only.

Send me Bitcoin here: *link*

Do not tell anyone.`,
phishing: true,
      attachment: "yeowch.png",
      opened: false,
      tutorial: false
    },
    {
      subject: "Security Alert: Your Password Will Expire in 1 Day(s)",
      sender: "customer_supp_ort67@email.com",
      body: `Dear user,

Our system shows your PayBuddy password will expire in the next 24 hours. If you do not update it, your account may close and you may lose access to your balance.

To keep your account active, use the secure link below:

*Update Password*

Failure to act may result in restricted service.

Thank you,
PayBuddy Security Team`,
phishing: true,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "Course Invitation",
      sender: "notifications@instructure.com",
      body: `You've been invited to participate in the course, De Anza College Promise Winter 2025. Course role: Student

Name: John Doe
Email: johndoe@email.com
Username: 12345678

*Get Started*`,
phishing: false,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "Order B212769 Confirmed",
      sender: "support@studio.com",
      body: `Thank you for your purchase!

We're getting your order ready for shipment. We will notify you when it has been sent.

*View your order*`,
phishing: false,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "New roles from Infrrd, Inc, ADP, Inc hiring now",
      sender: "handshake@g.joinhandshake.com",
      body: `Recommended jobs for you

Matched to your goals, skills & vibe

*View these jobs*`,
phishing: false,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "Senator Escobar’s 2025 Virtual Legislative Update Town Hall!",
      sender: "senator.escobar@outreach.senate.ca.gov",
      body: `Join me for my Virtual 2025 Legislative Update Town Hall on Tuesday, December 14, 2025, from 6:00-7:30 PM! This town hall will give you the opportunity to hear updates on my 15 legislative proposals that made it to the Governor's desk, two of which have already been signed into law. I will also go over budget priorities, and you'll be able to engage with me on key issues facing our community.`,
      phishing: false,
    attachment: null,
    opened: false,
    tutorial: false
    },
    {
      subject: "ACTION REQUIRED: Please complete your mental health check-in before your appointment with your therapist",
      sender: "support@therapy.com",
      body: `Hi,

As part of your mental health care, we request that you complete this mental health check-in to help your therapist track your progress and deliver the best care.

*Complete check-in*

Best,
Support Therapy`,
phishing: false,
    attachment: null,
    opened: false,
    tutorial: false
    }
  ];

   emails.push(...additionalEmails);
  shuffleEmails();
  drawSubjects();
}

// ------------------ SHUFFLE UTILS ------------------
function shuffleEmails() {
  for (let i = emails.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emails[i], emails[j]] = [emails[j], emails[i]];
  }
}

// ------------------ INITIALIZE ------------------
drawSubjects();