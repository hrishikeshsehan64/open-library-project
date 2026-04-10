# Open Library Explorer (Digital Library)

A modern, simple, and beautifully designed Digital Library application built with **React** and **Vite**. This application connects to the [Open Library API](https://openlibrary.org/developers/api) to fetch top books and provides users with powerful client-side tools to organize and find their next reading adventure.

## ✨ Features
* **Immediate Data Load**: Automatically fetches a rich list of programming and technology bestsellers on load.
* **Instant Searching**: Search across book titles and authors efficiently.
* **Dynamic Filtering**: Easily filter books that have cover images, see modern releases (post-2010), or filter for classics (pre-1950).
* **Smart Sorting**: Reorder your library logically by publish year—either newest or oldest first.
* **Reading Goals**: Track the books you've read directly in your browser. (Data is stored locally to persist between sessions).
* **Dark / Light Mode**: Beautiful UI with full smooth dark mode support, using intelligent glassmorphism aesthetics.

## 🛠️ Technology Highlights
* **Core:** React, Vite
* **Design:** Vanilla CSS with custom CSS variables, theming, and responsive grids
* **Data Handling:** To keep the interaction lightning fast, all Searching, Filtering, and Sorting are fully handled client-side utilizing Array Higher-Order Functions (`.map()`, `.filter()`, `.some()`, and `.sort()`).

## 🚀 Getting Started

To run this project locally:

1. Clone or download the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

Enjoy your next read!
