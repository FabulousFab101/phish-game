// score system
let score = 50;

function changeScore(amount) {
  score = Math.max(0, Math.min(100, score + amount));
}

// email data
const emails = [
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
Chief Director - Financial Recovery Team
    `,
    phishing: true,
    attachment: null
  },
  {
    subject: "Hi John, it’s Grandma!",
    sender: "grandmadoe@email.com",
    body: `
I baked cookies :)
    `,
    phishing: false,
    attachment: "grandma.png"
  }
];

let lastOpenedEmail = null;

// draw email list
function drawSubjects() {
  const list = document.getElementById("subject-list");
  list.innerHTML = "";

  emails.forEach((mail, index) => {
    const div = document.createElement("div");
    div.className = "subject";
    div.textContent = mail.subject;

    div.addEventListener("click", () => openEmail(index));
    list.appendChild(div);
  });
}

// open an email
function openEmail(index) {
  lastOpenedEmail = index;
  const email = emails[index];
  const view = document.getElementById("content-view");

  view.innerHTML = `
    <div id="email-content" style="height:100%; overflow-y:auto;">
      <div style="margin-bottom: 12px;">
        <strong>From:</strong> ${email.sender}<br>
        <strong>Subject:</strong> ${email.subject}
      </div>

      <p style="white-space:pre-wrap; margin-bottom:20px;">
        ${email.body}
      </p>

      ${email.attachment ? `
        <div class="attachment" style="display:flex; flex-direction:column; gap:6px; cursor:pointer;" onclick="openAttachment('${email.attachment}')">
          <img src="assets/file.png" style="width:16px; image-rendering:pixelated;">
          <span style="color:#0000EE;">${email.attachment}</span>
        </div>
      ` : ""}

      <div id="attachment-preview" style="margin-top:12px;"></div>

      <div style="margin-top:20px; display:flex; gap:10px;">
        <button onclick="markSpam(${index})">Mark as spam</button>
      </div>
    </div>
  `;
}

// open attachment
function openAttachment(filename) {
  const preview = document.getElementById("attachment-preview");

  preview.innerHTML = `
    <img src="assets/${filename}" style="
      max-width:250px;  /* keeps it small */
      max-height:250px; /* keeps it small */
      width:auto;
      height:auto;
      image-rendering:pixelated;
      border:none;
      display:block;
      margin-top:6px;
    ">
  `;
}

// mark an email as spam
function markSpam(index) {
  const mail = emails[index];

  if (mail.phishing) {
    changeScore(+10);
  } else {
    changeScore(-10);
  }

  emails.splice(index, 1);
  drawSubjects();
  document.getElementById("content-view").innerHTML = "";
}

// initialize inbox
drawSubjects();
