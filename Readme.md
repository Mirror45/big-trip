# ✈️ Big Trip — Travel Planner App

A feature-rich client-side travel planning application built with **Vanilla JavaScript (ES6)**, **MVP architecture**, and **REST API**. It allows users to plan trip routes, edit trip points, track expenses, and view travel statistics via charts.

## 🗺️ Features

### 📌 Core Functionality

- View a trip route as a list of travel events
- Add new trip points (with date, type, price, offers)
- Edit and delete existing trip points
- Filter by:
  - Everything
  - Future
  - Past
- Sort by:
  - Date
  - Duration
  - Price
- Interactive form with validation
- Automatic calculation of:
  - Route name (based on cities)
  - Trip dates (based on first and last points)
  - Total cost (including selected offers)
- Placeholder message if there are no trip points

### 📊 Statistics Screen

- **Money chart**: expenses by point type
- **Type chart**: count of each point type
- **Time-spend chart**: time spent on each type
- Charts built with `Chart.js` for rich visualization

### ☁️ API Integration

- Fetching data from server:
  - `/points` — trip points
  - `/destinations` — city list
  - `/offers` — available offers
- Full CRUD support:
  - Create, update, delete trip points
- Sync support with `/points/sync` for offline mode
- Authorization via: `Authorization: Basic <token>`

---

## 🛠 Tech Stack

### 🧩 Core Technologies

| Technology         | Purpose                                        |
|--------------------|------------------------------------------------|
| Vanilla JS (ES6+)  | Pure JavaScript application (no frameworks)   |
| MVP                | Architectural pattern (Model-View-Presenter)  |
| flatpickr          | Date picker UI component                      |
| Chart.js           | Data visualization via charts                 |
| Webpack            | Project bundler                               |

### 🧰 Dev Tools

| Tool                | Purpose                                         |
|---------------------|-------------------------------------------------|
| ESLint              | Code linting                                    |
| EditorConfig        | Code formatting                                 |
| Webpack             | Build system and bundling                       |
| Babel               | ES6+ to ES5 transpilation                       |
| Service Worker      | Offline support and static asset caching        |

---

## 🧱 Project Structure

src/

├── presenter/ # Presenters (business logic and UI binding)

├── model/ # Data models (points, filters, etc.)

├── view/ # UI components

├── utils/ # Utility functions

├── api/ # API communication logic

├── constants/ # Enums, constants

└── main.js # Application entry point


---

## 🔧 Getting Started

> ⚠️ **Node.js v16** is required.

```bash
# Clone the repository to your local machine
git clone git@github.com:Mirror45/big-trip.git

# Navigate into the cloned project directory
cd big-trip

# Install all dependencies
npm install

# Start the development server
npm start

# (Optional) Run linter to check code quality
npm run lint
```

## 💡 Implementation Notes

- Built using **MVP architecture** with clear separation of concerns
- Uses **ES6 modules**, classes, template literals, and strict data typing
- **Offline mode support**:
    - Forms are disabled when offline
    - Sync with server when connection is restored
- **Shake animation** used for error feedback in forms


## ⚙️ Configuration
- `Webpack` for build optimization, hashing, static copying, transpilation

- `Babel` to support older browsers

- `flatpickr` localized to `DD/MM/YYYY HH:mm` format

- `Chart.js` shows all statistics sorted by descending values
