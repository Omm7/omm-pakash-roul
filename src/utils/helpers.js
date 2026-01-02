// Terminal Command Handler
export function setupTerminal() {
  // Typewriter effect for initial messages
  const typewriters = document.querySelectorAll(".typewriter");
  typewriters.forEach((el, i) => {
    const text = el.textContent;
    el.textContent = "";
    setTimeout(() => {
      let j = 0;
      const typing = setInterval(() => {
        if (j < text.length) {
          el.textContent += text[j];
          j++;
        } else {
          clearInterval(typing);
        }
      }, 30);
    }, i * 1500);
  });

  // Terminal command handler
  function handleTerminalCommand(command) {
    const history = document.getElementById("terminal-history");
    const output = document.createElement("div");
    output.className = "mb-2";

    // Add command to history
    const commandLine = document.createElement("div");
    commandLine.className = "text-green-400";
    commandLine.innerHTML =
      '➜ <span class="text-blue-400">portfolio</span> git:(<span class="text-yellow-400">main</span>)<br>$ <span class="text-white">' +
      command +
      "</span>";
    history.appendChild(commandLine);

    // Process command
    if (command === "help") {
      output.innerHTML = [
        '<div class="text-white">Available commands:</div>',
        '<div class="ml-4">- help: Show this help</div>',
        '<div class="ml-4">- clear: Clear terminal</div>',
        '<div class="ml-4">- cd [section]: Navigate to section</div>',
        '<div class="ml-4">- ls: List available sections</div>',
        '<div class="ml-4">- whoami: Show basic info</div>',
      ].join("");
    } else if (command === "clear") {
      history.innerHTML = "";
      return;
    } else if (command === "ls") {
      output.innerHTML = [
        '<div class="text-white">Available sections:</div>',
        '<div class="ml-4 text-blue-400">about</div>',
        '<div class="ml-4 text-blue-400">projects</div>',
        '<div class="ml-4 text-blue-400">skills</div>',
        '<div class="ml-4 text-blue-400">contact</div>',
      ].join("");
    } else if (command === "whoami") {
      output.innerHTML = [
        '<div class="text-white">Omm Prakash Roul</div>',
        '<div class="text-white">Software & Web Developer</div>',
        '<div class="text-white">Location: India</div>',
        '<div class="text-white">GitHub: Omm7</div>',
      ].join("");
    } else if (command.startsWith("cd ")) {
      const section = command.substring(3).trim();
      const validSections = ["about", "projects", "skills", "contact"];

      if (validSections.includes(section)) {
        output.innerHTML =
          '<div class="text-white">Navigating to ' + section + " section...</div>";
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        output.innerHTML =
          '<div class="text-red-400">zsh: no such file or directory: ' +
          section +
          "</div>";
      }
    } else if (
      command === "about" ||
      command === "projects" ||
      command === "skills" ||
      command === "contact"
    ) {
      output.innerHTML =
        '<div class="text-white">Navigating to ' + command + " section...</div>";
      setTimeout(() => {
        document.getElementById(command)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else if (command) {
      output.innerHTML =
        '<div class="text-red-400">zsh: command not found: ' + command + "</div>";
    }

    history.appendChild(output);
    history.scrollTop = history.scrollHeight;
  }

  // Blinking cursor effect
  setInterval(() => {
    const cursor = document.querySelector(".terminal-cursor");
    if (cursor) {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }
  }, 500);

  // Focus input on terminal click
  const terminalBody = document.querySelector(".terminal-body");
  if (terminalBody) {
    terminalBody.addEventListener("click", () => {
      const input = document.getElementById("terminal-input");
      if (input) input.focus();
    });
  }

  // Handle terminal input
  const terminalInput = document.getElementById("terminal-input");
  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = e.target.value.trim();
        e.target.value = "";
        handleTerminalCommand(command);
      }
    });
  }
}

// Show toast notification
export function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// Copy email to clipboard
export function copyEmail() {
  const email = "roulommprakash5@gmail.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showToast("Email copied to clipboard!");
    })
    .catch((err) => {
      showToast("Failed to copy email");
      console.error("Failed to copy email: ", err);
    });
}
