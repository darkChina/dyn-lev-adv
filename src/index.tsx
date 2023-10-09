import { createRoot } from 'react-dom/client';
import { App } from "./app.tsx"

const rootNode = document.getElementById("root");
const root = createRoot(rootNode as HTMLElement);
root.render(<App />);