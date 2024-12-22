export const metadata = {
  title: 'My LDS Blog',
  description: 'Sharing inspirational gospel thoughts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 font-sans">
        <header className="bg-white shadow">
          <div className="max-w-5xl mx-auto py-4 px-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">
              My LDS Blog
            </h1>
          </div>
        </header>
        <main className="max-w-5xl mx-auto py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
