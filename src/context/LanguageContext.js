'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Hardcoded translations
const translationsData = {
    en: {
        DEAL_OF_THE_DAY: "Deal of the day",
        DEAL_OF_THE_MONTH : "Deal of the month",
        language: "en",
    },
    fr: {
        DEAL_OF_THE_DAY: "Offre du jour",
        DEAL_OF_THE_MONTH : "L'offre du mois",
        language: "fr",
    },
    de: {
        DEAL_OF_THE_DAY: "Deal des Tages",
        DEAL_OF_THE_MONTH :"Deal des Monats",
        language: "gr",
    },
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState(translationsData.en);

    useEffect(() => {
        // Update translations whenever the language changes
        const fetchTranslations = async () => {
            // Simulating fetching data by directly using hardcoded translations
            if (translationsData[language]) {
                console.log(`Switching translations to language: ${language}`);
                setTranslations(translationsData[language]);
            } else {
                console.error(`No translations available for language: ${language}`);
            }
        };
        fetchTranslations();
    }, [language]);

    const switchLanguage = (lang) => setLanguage(lang);

    return (
        <LanguageContext.Provider value={{ language, translations, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
