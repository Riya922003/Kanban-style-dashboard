# TaskFlow: Professional Kanban Board

A production-ready Kanban task management application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. 

This project demonstrates "Senior Intern" capabilities by implementing client-side database persistence (**IndexedDB**), advanced filtering, and a responsive design system inspired by SaaS platforms like Zeda.io.

##  Live Demo
**[Insert your Vercel Deployment Link Here]**

##  Key Features
* **Kanban Workflow:** Smooth drag-and-drop interface using `@dnd-kit` with collision detection and animations.
* **Smart Persistence:** Uses **IndexedDB** (via `idb-keyval`) to handle asynchronous data efficiently, ensuring data survives page refreshes.
* **Advanced Filtering:**
    * **Global Search:** Real-time filtering by task title.
    * **Priority Filter:** Dropdown to isolate High/Medium/Low priority tasks.
* **Dynamic Board Structure:**
    * **Column Management:** Add new columns via modal or delete existing ones to customize workflows.
    * **Flexible Task Creation:** Assign tasks to specific columns directly from the global "Add Task" modal.
* **Enterprise UI:**
    * **"Zeda-style" Aesthetics:** Clean typography, soft shadows, and status badges.
    * **Task Metadata:** Footer toolbar showing assignee, priority flags, and dates.
* **Mobile Responsive:** Features a collapsible sidebar drawer and touch-friendly layouts.

##  Tech Stack & Decisions

* **Framework:** `Next.js 15 (App Router)` - Chosen for Server Components and latest React features.
* **Language:** `TypeScript` - Enforced strict typing for `Tasks`, `Columns`, and `Sensors`.
* **Styling:** `Tailwind CSS` - Used for rapid, responsive design implementation.
* **State & Storage:** `React Context` + `IndexedDB`. I chose IndexedDB over `localStorage` to demonstrate handling asynchronous browser storage, which mimics real API calls better than synchronous storage.
* **Drag & Drop:** `@dnd-kit` - Selected for its accessibility features and modularity.

##  AI Tool Usage Statement
Per assignment guidelines, I utilized AI tools (GitHub Copilot & ChatGPT) to accelerate development while maintaining code ownership:
* **Boilerplate:** Generated initial Form layouts and Tailwind class strings.
* **Logic:** Assisted in implementing the complex "Multi-Filter" logic (combining Search + Priority).
* **Debugging:** Helped resolve hydration mismatches typical in SSR drag-and-drop implementations.

##  Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/kanban-board.git
    cd kanban-board
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open locally**
    Visit `http://localhost:3000` in your browser.
