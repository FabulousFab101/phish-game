let score = 0;

const emails = [
  {
    subject: "Password reset required",
    content: "Your password expires today. Click this link to update it.",
    phishing: true
  },
  {
    subject: "Lunch meeting moved",
    content: "The meeting is now at 2 PM in Room 301.",
    phishing: false
  },
  {
    subject: "Verify bank account",
    content: "We need your account details right away.",
    phishing: true
  }
];

function drawSubjects() {
  const list = document.getElementById("subject-list");
  list.innerHTML = "";

  emails.forEach((mail, i) => {
    const div = document.createElement("div");
    div.className = "subject";
    div.textContent = mail.subject;

    div.addEventListener("click", () => openEmail(i));

    list.appendChild(div);
  });
}

function openEmail(i) {
  const mail = emails[i];

  const view = document.getElementById("content-view");
  view.textContent = mail.content;

  if (mail.phishing) {
    alert("You opened a phishing email. Game over.");
    location.reload();
  } else {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
  }
}

drawSubjects();