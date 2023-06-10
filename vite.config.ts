import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tailwindcss('./tailwind.config.js'),
  ],

})
