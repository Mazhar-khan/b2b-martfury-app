'use client';
import React from 'react';
import { useLanguage } from '~/context/LanguageContext';
// import React from 'react';
import { notification } from 'antd';

const LanguageSwitcher = () => {
    const { switchLanguage, language  } = useLanguage();

    const handleFeatureWillUpdate = (e) => {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    };

    const languageOptions = {
        en: { label: "English", flag: "/static/img/flag/en.png" },
        de: { label: "Germany", flag: "/static/img/flag/germany.png" },
        fr: { label: "France", flag: "/static/img/flag/fr.png" },
    };

    return (
        <div className="ps-dropdown language">
        <a href="#" onClick={(e) => e.preventDefault()}>
            <img src={languageOptions[language].flag} alt="martfury" />
            {languageOptions[language].label}
        </a>
        <ul className="ps-dropdown-menu">
            {Object.keys(languageOptions).map((langCode) => (
                <li key={langCode}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            switchLanguage(langCode);
                        }}
                    >
                        <img
                            src={languageOptions[langCode].flag}
                            alt={languageOptions[langCode].label}
                        />
                        {languageOptions[langCode].label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);
};
export default LanguageSwitcher;

// const LanguageSwitcher = () => {
//     const { switchLanguage } = useLanguage();

//     return (
//         <div className="language-switcher">
//             <button onClick={() => switchLanguage('en')}>English</button>
//             <button onClick={() => switchLanguage('de')}>Deutsch</button>
//             <button onClick={() => switchLanguage('fr')}>Français</button>
//         </div>
//     );
// };

// export default LanguageSwitcher;
