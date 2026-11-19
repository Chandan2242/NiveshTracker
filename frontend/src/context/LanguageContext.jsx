
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

function clearGoogleTranslateCookie() {
  const hostname = window.location.hostname;

  // Remove host-only cookie
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  // Remove custom-domain cookie, if applicable
  if (hostname.endsWith(".lentislegalis.com") ||
      hostname === "lentislegalis.com") {
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.lentislegalis.com";
  }
}

function setGoogleTranslateCookie(language) {
  clearGoogleTranslateCookie();

  if (language === "HI") {
    const hostname = window.location.hostname;

    if (
      hostname === "lentislegalis.com" ||
      hostname.endsWith(".lentislegalis.com")
    ) {
      document.cookie =
        "googtrans=/en/hi; path=/; domain=.lentislegalis.com";
    } else {
      document.cookie = "googtrans=/en/hi; path=/";
    }
  }
}

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

    if (newLanguage === language) {
      return;
    }

    try {
      localStorage.setItem(LANGUAGE_KEY, newLanguage);
    } catch (error) {
      console.error("Unable to save language:", error);
    }

    setGoogleTranslateCookie(newLanguage);

    // Reload page so Google Translate starts with the selected language
    window.location.reload();
  }, [language]);

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

    // Remove any old Google Translate cookie when English is selected
    if (language === "EN") {
      clearGoogleTranslateCookie();
    }

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
