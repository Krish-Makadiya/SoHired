# SoHired 🚀
> *Team Coommited* | TechSprint Open Innovation Hackathon

*SoHired* bridges the gap between modern "Swipe Culture" and legacy hiring platforms. It is an intelligent job application ecosystem that turns the tedious 20-minute application process into a 2-second gesture.

---

## 🧐 The Problem: Application Fatigue
* *The Drop-off:* 60% of candidates abandon job applications when redirected to external ATS sites.
* *The Volume Reality:* In the current market, students often need to apply to 50+ roles just to secure one interview.
* *The Bottleneck:* Users waste hours manually re-typing the same Name, Education, and Experience data for every single job link.

## 💡 The Solution: "ThirdEye" Architecture
SoHired replaces the "Search & Type" method with a "Swipe & Solve" workflow.

1.  *Gamified Swipe UI:* A React-based web app where users swipe *Right* to queue an application and *Left* to discard. This cures "Choice Paralysis".
2.  *Visual "Power Cards":* We parse complex JDs into clean UI cards, highlighting Salary, Tech Stack, and Remote status for <3 second decision making.
3.  *The "Ghost" Extension:* A Chrome Extension that acts as a bridge. When you swipe right, the extension takes over, opens the target ATS (e.g., Greenhouse), and manages the data injection.
4.  *Master Profile Injection:* "Write Once, Apply Everywhere." The DOM-injection engine maps your single profile to thousands of different external form fields.

---

## ⚙️ Tech Stack & Google Integration

We utilized the *Google Developer Ecosystem* to build this end-to-end solution:

| Component | Technology Used | Purpose |
| :--- | :--- | :--- |
| *Frontend* | React + Google AntiGravity | The "Tinder-style" swipe interface. |
| *Backend* | Node.js + Firebase | Serverless backend to host the app and handle sync. |
| *Auth* | Firebase Authentication | Google-native secure login system. |
| *Database* | Firestore & Realtime DB | Instantly syncs "Swipes" between the web app and the Chrome Extension. |
| *AI / ML* | *Google Gemini Pro* | The "Intelligent Analyst" used to summarize JDs and structure unstructured data. |
| *Dev Tools* | Google AI Studio | Prompt engineering and optimization. |
| *Automation* | n8n Scraper Engine | Fetches and populates job data into our primary database. |

---

## 🏗️ Architecture

The system operates on a dual-host model:

1.  *Web Platform (React):* Serves Job Cards and handles user decisions.
2.  *Chrome Extension Host:* Listens for "Right Swipes" via secure messaging. It triggers a background script to inject cached user data into the DOM of the target job application page.

```mermaid
graph LR
    A[User Swipes Right] -->|Secure Msg| B(Chrome Extension)
    B -->|Fetch Profile| C{Local Storage}
    B -->|Open URL| D[Target ATS / Greenhouse]
    C -->|Inject Data| D
    D -->|Auto-Fill| E[Ready to Submit]