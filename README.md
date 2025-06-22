# 💬UOL Chat Clone

This project is an implementation of a fully functional chat client, inspired by the classic Brazilian Bate-Papo UOL. Developed with a focus on interactivity and real-time communication, this application simulates a dynamic chat environment where users can enter rooms, send public and private messages, and view active participants.

## 🚀 *Technologies Used*

-   *HTML5* – Semantic markup for content structure.
-   *CSS3* – Styling, responsive layout, and animations.
-   *Pure JavaScript* – Implementation of business logic, API interactions, and DOM manipulation.
-   *Axios* (or native `fetch`) – For HTTP requests (POST and GET) to the API. *(Note: Adjust this if you specifically used `fetch` or `XMLHttpRequest`.)*

## 🎯 *Requirements Met*

-   ✅ **Responsive Mobile Interface:** Layout adapts to different mobile screen dimensions, following the provided Figma design.
-   ✅ **User Authentication:** User's name is prompted upon entry, with uniqueness validation and error handling for names already in use.
-   ✅ **Continuous Connection:** Regular status updates sent to the server (every 5 seconds) to keep the user online.
-   ✅ **Message Loading and Display:**
    * Initial loading of messages from the server upon entering the room.
    * Automatic message refresh from the server every 3 seconds.
    * Distinct styling for status messages (gray background), private messages (red background), and normal messages (white background).
    * Automatic chat scroll to the bottom when new messages are added.
    * Filtering of private messages to display only those sent to or from the current user.
-   ✅ **Message Sending:**
    * Sending of public and private messages to the server.
    * Chat refresh upon successful message submission.
    * Page refresh (and return to login prompt) if server responds with an error (user no longer in the room).
-   ✅ **Active Participant and Private Message Selection:**
    * Side menu for participants, accessible via an icon, with a semi-transparent overlay.
    * Menu closes when clicking outside on the dark overlay.
    * Participant list updates every 10 seconds.
    * Visual checkmark on the selected option (recipient and message visibility type).
    * Update of the phrase below the message input to reflect the recipient and message type (`Public` or `Privately to [Name]`).
-   ✅ **Room UUID:** Use of a unique UUID code to identify the chat room in all API requests.

## 📌 *Project Structure*

```
📂 Projeto-Bate-Papo-UOL
├── 📄 index.html
├── 📄 reset.css
├── 📄 script.js
├── 📄 style.css
├── 📂 imagem
│   ├── 📂 icons
│   │   ├── 📄 checkmark-outline.svg
│   │   ├── 📄 lock-closed.svg
│   │   ├── 📄 lock-open.svg
│   │   ├── 📄 people.svg
│   │   └── 📄 person-circle.svg
│   └── 📄 chatuol.png
```

## 📝 *Code Language*

The source code is written in *Portuguese*, including comments, variable names, and function names, for clarity and adherence to project requirements.

## ✨ How to Run/View the Project

This project is a front-end chat application developed with HTML, CSS, and JavaScript, designed to interact with an API (assumed to be running or simulated). To set up and run the application in your browser, follow these steps:

1.  **Download and Run Locally:**
    * **Clone the repository:**
        ```bash
        git clone https://github.com/ClaraDev01/Projeto-Bate-Papo-UOL.git
        ```
    * **Navigate to the project directory:**
        ```bash
        cd Projeto-Bate-Papo-UOL
        ```
    * **Open the `index.html` file in your preferred web browser.** You can do this by dragging the file into your browser window or double-clicking it.
        * **Important Note:** For full functionality, especially API interactions, it is highly recommended to use a local server (see option 2 below). Direct file opening might have browser security limitations (CORS issues) that prevent the chat from working as expected.

2.  **Use a Local Server Extension (Recommended for Full Functionality):**
    * If you use **VS Code**, you can install the **Live Server** extension.
    * With the extension installed, open the project folder in VS Code. Right-click on the `index.html` file and select "Open with Live Server". This will start a local development server (e.g., at `http://127.0.0.1:5500/index.html`) and open the application in your browser, ensuring all JavaScript and API interactions work correctly, along with live reloading.

3.  **Host on Free Services (Like GitHub Pages):**
    * You can host this project for free using **GitHub Pages**. Configure GitHub Pages to serve content from the `main` (or `master`) branch of your repository. GitHub will then generate a public link for your application (e.g., `https://YourUsername.github.io/Projeto-Bate-Papo-UOL/`).
    * **Note:** If your chat relies on a *backend API that you also host*, ensure that API is publicly accessible and configured to accept requests from your GitHub Pages URL (CORS settings). If the API is local-only, the GitHub Pages version might not be fully functional unless you mock API responses.

## 📌 *Future Improvements*

-   🖼️ **Emoji and Media Support:** Implement the ability to send emojis or small media files within messages.
-   💬 **Load More Messages:** Add functionality to load older messages when scrolling up, providing a more extensive conversation history beyond real-time updates.
-   🔔 **Notifications:** Incorporate sound or visual notifications for new messages.

## 📜 *License*

This project is open-source, intended for educational and study purposes.

💻 *Developed by ClaraDev01*
