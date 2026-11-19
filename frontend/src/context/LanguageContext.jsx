
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import translations from "./translations";

const LanguageContext = createContext(null);

const LANGUAGE_KEY = "nivesh-language";

function getSavedLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === "HI"
      ? "HI"
      : "EN";
  } catch {
    return "EN";
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getSavedLanguage);

  const setLanguage = useCallback((newLanguage) => {
    if (newLanguage !== "EN" && newLanguage !== "HI") {
      return;
    }

    try {
      localStorage.setItem(LANGUAGE_KEY, newLanguage);
    } catch (error) {
      console.error("Unable to save language:", error);
    }

    // Change language without reloading or navigating
    setLanguageState(newLanguage);
  }, []);

  const t = useCallback(
    (text) => {
      if (typeof text !== "string" || language === "EN") {
        return text;
      }

      return translations?.HI?.[text] ?? text;
    },
    [language]
  );

  useEffect(() => {
    document.documentElement.lang =
      language === "HI" ? "hi" : "en";

    document.documentElement.dataset.language = language;

    window.dispatchEvent(
      new CustomEvent("nivesh-language-change", {
        detail: { language },
      })
    );
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
