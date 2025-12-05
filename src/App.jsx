import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewsBoard from "./components/NewsBoard";
import Globe from "./components/Globe";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("in");
  const [darkMode, setDarkMode] = useState(false); // default: light mode

  // Add / remove "dark" class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <ParticleBackground  darkMode={darkMode} />
      <Navbar
        setCategory={setCategory}
        setCountry={setCountry}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-8">
        {/* 3D Hero */}
        <section className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Explore the World of News
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              A 3D globe to give your app some sci-fi vibes 🌍
            </p>
          </div>
          <Globe />
        </section>

        {/* News */}
        <section>
          <NewsBoard category={category} country={country} />
        </section>
      </main>
    </div>
  );
}

export default App;
