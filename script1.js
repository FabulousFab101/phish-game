const emails = [
  // Tutorial emails
  {
    subject: "Hi John, it's Grandma!",
    sendername: "Grandma",
    sender: "grandmadoe@email.com",
    body: `I baked cookies :)`,
    phishing: false,
    attachment: "grandma.png",
    opened: false,
    tutorial: true
  },
  {
    subject: "URGENT: RECOVER YOUR FUNDS",
    sendername: "Global Secure",
    sender: "melissa.j@globalsecure.com",
    body: `Dear,

We have identified your account as eligible for recovery of $4,872.15 USD from a recent online fraud case (Case ID: #FR-9921).

To claim your funds, please verify your identity by providing:

* Full Name  
* Date of Birth  
* Mailing Address  
* Photo ID

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
  },
  {
    subject: "Google Internship $200,000 / YEAR",
    sendername: "Google",
    sender: "goggleinternship123@email.com",
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
    sendername: "Real Bank",
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
    sendername: "Barbara Bates",
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
    sendername: "Cousin",
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
    sendername: "PayBuddy",
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
    sendername: "De Anza Online Education",
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
    sendername: "Studio",
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
    sendername: "Handshake",
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
    subject: "Senator Escobar's 2025 Virtual Legislative Update Town Hall!",
    sendername: "Senator Escobar",
    sender: "senator.escobar@outreach.senate.ca.gov",
    body: `Join me for my Virtual 2025 Legislative Update Town Hall on Tuesday, December 14, 2025, from 6:00-7:30 PM! This town hall will give you the opportunity to hear updates on my 15 legislative proposals that made it to the Governor's desk, two of which have already been signed into law. I will also go over budget priorities, and you'll be able to engage with me on key issues facing our community.`,
    phishing: false,
  attachment: null,
  opened: false,
  tutorial: false
  },
  {
    subject: "ACTION REQUIRED: Please complete your mental health check-in before your appointment with your therapist",
    sendername: "Support Therapy",
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

current_emails = [emails[0], emails[1]]

score = 100;

function addEmail(emailIndex){
  document.querySelectorAll('tbody').forEach(element => {
    whatever = document.createElement('tr')
    fromtext = document.createElement('td')
    subjecttext = document.createElement('td')
    element.appendChild(whatever)
    whatever.appendChild(fromtext)
    whatever.appendChild(subjecttext)
    emailInfo = emails[emailIndex]
    current_emails.push(emailInfo)
    fromtext.innerHTML = emailInfo.sendername
    subjecttext.innerHTML = emailInfo.subject
  })
}

for (i = 0; i < emails.length; i++){
  addEmail(i)
}

function markButtonsaAbility(isEnabled){
  document.querySelectorAll('button.spam').forEach(element => {
      element.disabled = !isEnabled
    })
    document.querySelectorAll('button.read').forEach(element => {
      element.disabled = !isEnabled
    })
}
function deleteRow(isSpam){
  const highlightedClass = 'highlighted';
  const isRow = element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY';
  const rows = Array.from(document.querySelector('tbody').children).filter(isRow);
  const previouslySelectedRowIndex = rows.findIndex(element => element.classList.contains(highlightedClass));
  if (rows[previouslySelectedRowIndex]) {
    rows[previouslySelectedRowIndex].remove();
    score -= 10*(isSpam ^ current_emails[previouslySelectedRowIndex].phishing) * current_emails[previouslySelectedRowIndex].tutorial
    console.log(score)
    current_emails.splice(previouslySelectedRowIndex, 1)
  }
}
function clearEmailContents(){
  document.querySelectorAll("p.from").forEach(element => {
    element.innerHTML = ""
  })
  document.querySelectorAll("p.subject-line").forEach(element => {
    element.innerHTML = ""
  })
  document.querySelectorAll("div.body").forEach(element => {
    element.innerHTML = "";
    body = document.createElement('p')
    body.style.margin = "0%"
    element.appendChild(body)
    body.innerHTML = ""
  })
}
document.querySelectorAll('table.interactive').forEach(element => {
  element.addEventListener('click', (event) => {
    const highlightedClass = 'highlighted';
    const isRow = element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY';
    const newlySelectedRow = event.composedPath().find(isRow);
    const previouslySelectedRow = Array.from(newlySelectedRow.parentElement.children).filter(isRow).find(element => element.classList.contains(highlightedClass));
    if (previouslySelectedRow && newlySelectedRow) {
      previouslySelectedRow.classList.toggle(highlightedClass);
    }
    if (newlySelectedRow) {
      const newlySelectedRowIndex = Array.from(newlySelectedRow.parentElement.children).filter(isRow).findIndex((value, index, obj) => value == newlySelectedRow);
      newlySelectedRow.classList.toggle(highlightedClass);
      document.querySelectorAll("p.from").forEach(element => {
        element.innerHTML = current_emails[newlySelectedRowIndex]["sendername"] + " &lt" + current_emails[newlySelectedRowIndex]["sender"] + "&gt"
      })
      document.querySelectorAll("p.subject-line").forEach(element => {
        element.innerHTML = current_emails[newlySelectedRowIndex]["subject"]
      })
      document.querySelectorAll("div.body").forEach(element => {
        element.innerHTML = "";
        body = document.createElement('p')
        body.style.margin = "0%"
        element.appendChild(body)
        body.innerHTML = current_emails[newlySelectedRowIndex]["body"].replace(/\n/g, '<br>')
      })
    }
    markButtonsaAbility(true)
  })
});
document.querySelectorAll('button.spam').forEach(element => {
  element.addEventListener('click', (event) => {
    markButtonsaAbility(false)
    deleteRow(true)
    clearEmailContents()
  })
});
document.querySelectorAll('button.read').forEach(element => {
  element.addEventListener('click', (event) => {
    markButtonsaAbility(false)
    deleteRow(false)
    clearEmailContents()
  })
});
document.querySelectorAll('button.start-button').forEach(element => {
  element.addEventListener('click', (event) => {
    offscreen = document.querySelector('div.off-screen')
    
  })
});

function updateTime() {
  const el = document.getElementById("status-time");
  const now = new Date();

  el.textContent = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

// update once on load
updateTime();

// update every minute
setInterval(updateTime, 60 * 1000);