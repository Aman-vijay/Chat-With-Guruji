
# Chat With Guruji

A modern, AI-powered chat web app built with Next.js, React, and TypeScript. Chat with virtual personas of top Indian educators, powered by LLMs and custom persona data in whatsapp style.

## Features

- **Chat with Guruji:** Interact with AI personas modeled after real educators (HITESH SIR & PIYUSH SIR).
- **Persona System:** Each persona has unique instructions, tone, and training examples.
- **Streaming Responses:** Real-time, streaming chat powered by OpenAI-compatible APIs.
- **Modern UI:** Responsive, accessible, and beautiful interface using Tailwind CSS.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

## Project Structure

```
├── app/
├──api/chat/route       #Api route
│   └── chat/[id]/      # Dynamic chat pages
├── components/         # Reusable React components
│   └── chat/           # Chat UI components
├── data/               # Persona and instructor data
├── hooks/              # Custom React hooks
├── lib/                # API and utility functions
├── types/              # TypeScript type definitions
├── public/             # Static assets
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## Getting Started

1. **Clone Repository**
   ```sh
   git clone https://github.com/Aman-vijay/Chat-With-Guruji.git
   cd Chat-With-guruji
   ```
2.  **Install dependencies:**
	```sh
	pnpm install
	# or
	npm install
	```

3. **Set up environment variables:**
	- Copy `.env.example` to `.env.local` and add your OpenAI-compatible API key:
	  ```env
	  GEMINI_API_KEY=your-api-key-here
	  ```

4. **Run the development server:**
	```sh
	pnpm dev
	# or
	npm run dev
	```
	Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding a New Persona

1. Edit `data/personas.ts` and add a new persona object.
2. Optionally, add a matching instructor in `data/instructors.ts`.
3. The persona will be available for chat instantly.

## Contributing

Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you would like to change.


