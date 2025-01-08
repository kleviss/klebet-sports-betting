# KLEBET - Modern Sports Betting Platform

A sleek and modern sports betting platform built with React, TypeScript, and Material-UI. Features real-time odds updates, user authentication, and a seamless betting experience.

👀 [Live Demo](https://klebet-sports-betting.onrender.com)

## Features

- 🏆 Live sports betting with real-time odds
- 🔐 Secure user authentication
- 💼 Bet slip management
- 📊 Track your betting history
- 🎨 Modern, responsive UI with Material Design
- 🌙 Dark mode by default

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- Material-UI (MUI) for components and styling
- React Router for navigation
- Context API for state management

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/kleviss/betting-platform.git
cd betting-platform
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── hooks/         # Custom React hooks
├── pages/         # Main application pages
└── types/         # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment on Render

1. Create a new account on [Render](https://render.com) if you haven't already

2. Create a new Web Service:

   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Choose the repository with your KLEBET project

3. Configure the Web Service:

   ```
   Name: klebet
   Runtime: Node
   Region: Frankfurt (or your preferred region)
   Branch: main
   Build Command: npm install && npm run build
   Start Command: npm run preview
   ```

4. Environment Variables:

   - Add the following environment variables in the Render dashboard:
     ```
     NODE_VERSION=18.0.0
     ```

5. Additional Settings:

   - Health Check Path: /
   - Auto-Deploy: Enabled
   - Pull Request Previews: Enabled
   - Plan: Free

6. Deploy:
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Your app will be available at `https://klebet.onrender.com`

## Auto-Deploy Configuration

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: klebet
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm run preview
    envVars:
      - key: NODE_VERSION
        value: 18.0.0
    autoDeploy: true
    branch: main
    plan: free
    region: frankfurt
    healthCheckPath: /
    pullRequestPreviewsEnabled: true
```

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for your own purposes.
