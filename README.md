# 💬 UOL Chat Clone

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
📂 Bate-PapoUOL-Driven
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

*(Note: I've named the root folder `Bate-PapoUOL-Driven` based on your terminal path. If the actual repository name is `Projeto-Bate-Papo-UOL` or something else, you can adjust the root folder name in the diagram.)*

## 📝 *Code Language*

The source code is written in *Portuguese*, including comments, variable names, and function names, for clarity and adherence to project requirements.

## 📌 *Future Improvements*

-   🖼️ **Emoji and Media Support:** Implement the ability to send emojis or small media files within messages.
-   💬 **Load More Messages:** Add functionality to load older messages when scrolling up, providing a more extensive conversation history beyond real-time updates.
-   🔔 **Notifications:** Incorporate sound or visual notifications for new messages.

## 📜 *License*

This project is open-source, intended for educational and study purposes.

💻 *Developed by ClaraDev01*
