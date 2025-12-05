import React, { useState } from "react";

const categories = [
  "general",
  "technology",
  "business",
  "health",
  "sports",
  "entertainment",
];

const countries = [
  { code: "in", name: "India" },
  { code: "us", name: "USA" },
  { code: "au", name: "Australia" },
  { code: "gb", name: "England" },
  { code: "ru", name: "Russia" },
];

const Navbar = ({ setCategory, setCountry, darkMode, setDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [country, setCountryState] = useState("in");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setCategory(cat);
    setMenuOpen(false);
  };

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setCountryState(selected);
    setCountry(selected);
  };

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 shadow">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            News-Mag
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:space-x-6 text-gray-900 dark:text-white">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`py-2 px-3 rounded-md font-medium ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white"
                  : "hover:text-blue-700 dark:hover:text-blue-400"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}

          <select
            onChange={handleCountryChange}
            value={country}
            className="py-2 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {countries.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          {/* Dark / Light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="py-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
            <span className="text-sm hidden sm:inline">
              {darkMode ? "Light" : "Dark"}
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-800 p-4 space-y-3 shadow">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`w-full text-left py-2 px-3 rounded-md font-medium ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}

          <select
            onChange={handleCountryChange}
            value={country}
            className="w-full py-2 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {countries.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center gap-2"
          >
            <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
            <span className="text-sm">
              {darkMode ? "Light mode" : "Dark mode"}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
