import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from '../locales/translations';

type Page = 'home' | 'search' | 'map' | 'shelf' | 'gen';

interface AppState {
  language: Language;
  currentPage: Page;
  searchQuery: string;
  currentMapId: string | null;
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  navigate: (page: Page, params?: any) => void;
  t: (section: keyof typeof translations.en, key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    language: 'zh',
    currentPage: 'home',
    searchQuery: '',
    currentMapId: null,
  });

  const setLanguage = (language: Language) => {
    setState((prev) => ({ ...prev, language }));
  };

  const navigate = (page: Page, params?: any) => {
    setState((prev) => ({
      ...prev,
      currentPage: page,
      searchQuery: params?.query !== undefined ? params.query : prev.searchQuery,
      currentMapId: params?.mapId !== undefined ? params.mapId : prev.currentMapId,
    }));
    window.scrollTo(0, 0);
  };

  const t = (section: keyof typeof translations.en, key: string) => {
    const sectionData = translations[state.language][section] as Record<string, string>;
    return sectionData[key] || key;
  };

  return (
    <AppContext.Provider value={{ ...state, setLanguage, navigate, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
