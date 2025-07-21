# Aurora Vision

Aurora Vision is a web application built with Next.js that leverages the power of Generative AI to create stunning images from text descriptions and other images. This project uses Genkit for its AI capabilities and features a modern, responsive user interface built with React and Tailwind CSS.

## ✨ Features

*   **Text-to-Image Generation:** Create unique images from textual descriptions.
*   **Image-to-Image Transformation:** Modify existing images based on text prompts.
*   **Sleek User Interface:** A user-friendly interface built with Next.js, shadcn/ui, and Tailwind CSS.
*   **AI-Powered by Genkit:** Utilizes the Genkit framework for seamless integration with generative models.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v20 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/aurora-vision.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd aurora-vision
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the Next.js application on `http://localhost:9002`.

To start the Genkit development server, run:

```bash
npm run genkit:dev
```

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack. |
| `npm run genkit:dev` | Starts the Genkit development server. |
| `npm run genkit:watch` | Starts the Genkit development server in watch mode. |
| `npm run build` | Builds the application for production. |
| `npm run start` | Starts a production server. |
| `npm run lint` | Lints the codebase using Next.js's built-in ESLint configuration. |
| `npm run typecheck` | Runs TypeScript to check for type errors. |

## Folder Structure

```
.
├── src
│   ├── ai
│   │   ├── flows       # Genkit flows for text-to-image and image-to-image
│   │   └── ...
│   ├── app             # Next.js app directory
│   ├── components      # React components
│   └── ...
└── ...
```

## Built With

*   [Next.js](https://nextjs.org/) - The React Framework for the Web
*   [Genkit](https://firebase.google.com/docs/genkit) - The AI Framework
*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
*   [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.