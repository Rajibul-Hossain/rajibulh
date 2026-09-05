# Rajibul Hossain — Personal Portfolio

An interactive personal portfolio and productivity-focused web project built from scratch using **HTML, CSS, and JavaScript**.

The project combines a personal portfolio, custom browser homepage, interactive terminal, and web-to-hardware messaging system into a single environment.

## ✨ Features

### 👤 Interactive Portfolio

A personal portfolio interface containing information about me, my achievements, projects, and technical interests.

The interface includes interactive side panels that provide access to additional information without leaving the main page.

### 🖥️ Built-in Terminal

The portfolio includes a custom terminal-style interface with multiple commands.

Run:

```text
/help
```

to view the available commands.

The terminal is designed to behave like a lightweight command-line interface directly inside the website.

### 📡 Web → Hardware Messaging

One of the more experimental parts of the project is the `/msg` command.

```text
/msg <message>
```

Messages entered through the website can be sent to an **I²C display** connected to my physical study setup.

This creates a simple bridge between a web interface and external hardware.

### 🐐 Goat Mode

The portfolio also includes an interactive **Goat Mode**, adding an intentionally unconventional element to the otherwise developer-focused interface.

### 🌐 Custom Browser Homepage

The repository also contains a custom browser homepage that I built because I wanted something more useful than a standard search-engine homepage.

It provides quick access to frequently used websites and tools through a centralized interface.

Additional utilities include:

* 🔗 Custom bookmarks and shortcuts
* 🧮 Calculator
* ⚖️ Equation balancer
* 📱 Responsive layout
* ⚡ Quick-access productivity tools

## 🛠️ Tech Stack

* **HTML5** — Structure and markup
* **CSS3** — Styling, animations and responsive design
* **JavaScript** — Application logic and interactivity
* **C++** — Hardware-side functionality
* **I²C** — Display communication

## 📂 Project Structure

```text
.
├── c++_esp/        # C++ / ESP-related hardware code
├── css/             # Additional styles
├── cursor/          # Cursor-related assets
├── custom_home/     # Custom browser homepage
├── esp_msging/      # ESP messaging functionality
├── scripts/         # JavaScript and supporting scripts
├── index.html       # Main portfolio page
├── style.css        # Main stylesheet
├── others.css       # Additional styles
└── crickinfo.html   # Cricket information page
```

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/Rajibul-Hossain/rajibulh.git
```

Navigate into the project:

```bash
cd rajibulh
```

Open `index.html` in a browser, or use a local development server such as VS Code Live Server.

## 🔌 Hardware Integration

The hardware-related components of the project use an ESP-based setup and an I²C display.

The web interface provides the user-facing side of the messaging system, while the hardware-side code handles receiving and displaying messages.

This project was built as an experiment in connecting a **web application with physical hardware**.

## 🎯 Why I Built This

I wanted my portfolio to be more than a static page.

Instead of simply displaying a list of skills and projects, I experimented with:

* Interactive UI components
* Terminal-based interaction
* Web-to-hardware communication
* Custom browser tooling
* Responsive web design
* Small utilities for everyday use

The result is a personal environment that combines **portfolio, experimentation, and productivity tools**.

## 📌 Project Highlights

* Built with vanilla web technologies
* No frontend framework required
* Interactive command-line interface
* Web-to-I²C hardware communication
* Custom browser homepage
* Responsive UI
* Calculator and equation-balancing utilities
* ESP/C++ hardware integration
* Personal achievement and project showcase
* Firebase as backend

## 📜 License

This project is a personal portfolio and experimental project.

If you would like to reuse significant portions of the code or assets, please contact me first.
