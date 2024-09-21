# Yandex Map with Custom Search

## Overview

This project integrates Yandex Maps into a React application using Vite for development. It includes custom functionality for searching and displaying locations within Uzbekistan. The application leverages Tailwind CSS for styling and includes custom hooks to manage Yandex Maps interactions.

## Architecture

### Project Structure

- **`src/`**: Contains all source code files.

  - **`components/`**: Contains React components.
    - `MapControls.tsx`: Provides the UI for the search input and suggestions list.
  - **`hooks/`**: Contains custom React hooks.
    - `useYandexMap.ts`: Contains logic for initializing the Yandex map, handling search, and fetching suggestions.
  - **`styles/`**: Contains global CSS files.
    - `index.css`: Includes Tailwind CSS directives.
  - **`App.tsx`**: The main React component that renders the application.
  - **`main.tsx`**: The entry point of the application, which integrates React with the DOM.

- **`public/`**: Contains static files such as `index.html`.

- **`tailwind.config.js`**: Configuration file for Tailwind CSS.

## Setup

### 1. Install Dependencies

To get started, install the necessary dependencies for the project:

```bash
npm ci
```

### 2. In a root directory, create .env file

add this api-keys:

#### VITE_YANDEX_API_KEY=your_yandex_api_key

#### VITE_YANDEX_SUGGEST_KEY=your_yandex_suggest_api_key
