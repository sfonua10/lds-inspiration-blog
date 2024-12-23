// src/app/layout.js
import '../app/globals.css';

export const metadata = {
  title: 'My LDS Blog',
  description: 'Sharing inspirational gospel thoughts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 font-sans">
        <header className="bg-white shadow">
          {/* We can keep the header centered if we want */}
          <div className="max-w-5xl mx-auto py-4 px-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Gospel Blog</h1>
          </div>
        </header>

        {/* Remove max-w-5xl here, so the hero can span full width */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
