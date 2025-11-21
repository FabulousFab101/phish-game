let score = 0;

let emails = [
    { subject: "Your invoice is ready", phishing: true },
    { subject: "Meeting at 3 PM", phishing: false },
    { subject: "Update your password now", phishing: true },
    { subject: "Pizza order confirmed", phishing: false }
];

function drawEmails() {
    let list = document.getElementById("email-list");
    list.innerHTML = "";

    emails.forEach((mail, index) => {
        let div = document.createElement("div");
        div.className = "email";
        div.textContent = mail.subject;

        div.addEventListener("click", () => handleClick(index));

        list.appendChild(div);
    });
}

function handleClick(i) {
    let mail = emails[i];

    if (mail.phishing) {
        alert("You clicked a phishing email. You lose.");
        location.reload();
    } else {
        score++;
        document.getElementById("status").textContent = "Score: " + score;
        emails.splice(i, 1);
        drawEmails();
    }
}

drawEmails();