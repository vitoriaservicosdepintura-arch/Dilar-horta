
import React, { createContext, useContext, useState } from 'react';
import { ContentState, INITIAL_CONTENT, Property, QA } from '../data/initialContent';

interface AdminContextType {
    isLoggedIn: boolean;
    login: (email: string, pass: string) => boolean;
    logout: () => void;
    content: ContentState;
    updateHero: (hero: ContentState['hero']) => void;
    updateOptions: (options: ContentState['options']) => void;
    updateLeadCapture: (lead: ContentState['leadCapture']) => void;
    updateServicesContent: (services: ContentState['servicesContent']) => void;
    updateValuesContent: (values: ContentState['valuesContent']) => void;
    updateProperties: (properties: Property[]) => void;
    updateKnowledgeBase: (kb: QA[]) => void;
    updateAssistantConfig: (config: ContentState['assistantConfig']) => void;
    saveContent: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [content, setContent] = useState<ContentState>(() => {
        const saved = localStorage.getItem('dilar_horta_content');
        return saved ? JSON.parse(saved) : INITIAL_CONTENT;
    });

    const login = (email: string, pass: string) => {
        if (email === 'vitoriaservicosdepintura@gmail.com' && pass === '@Yv25051183') {
            setIsLoggedIn(true);
            return true;
        }
        return false;
    };

    const logout = () => setIsLoggedIn(false);

    const updateHero = (hero: ContentState['hero']) => {
        setContent(prev => ({ ...prev, hero }));
    };

    const updateOptions = (options: ContentState['options']) => {
        setContent(prev => ({ ...prev, options }));
    };

    const updateLeadCapture = (leadCapture: ContentState['leadCapture']) => {
        setContent(prev => ({ ...prev, leadCapture }));
    };

    const updateServicesContent = (servicesContent: ContentState['servicesContent']) => {
        setContent(prev => ({ ...prev, servicesContent }));
    };

    const updateValuesContent = (valuesContent: ContentState['valuesContent']) => {
        setContent(prev => ({ ...prev, valuesContent }));
    };

    const updateProperties = (properties: Property[]) => {
        setContent(prev => ({ ...prev, properties }));
    };

    const updateKnowledgeBase = (knowledgeBase: QA[]) => {
        setContent(prev => ({ ...prev, knowledgeBase }));
    };

    const updateAssistantConfig = (assistantConfig: ContentState['assistantConfig']) => {
        setContent(prev => ({ ...prev, assistantConfig }));
    };

    const saveContent = () => {
        localStorage.setItem('dilar_horta_content', JSON.stringify(content));
        alert('Alterações guardadas com sucesso!');
    };

    return (
        <AdminContext.Provider value={{
            isLoggedIn,
            login,
            logout,
            content,
            updateHero,
            updateOptions,
            updateLeadCapture,
            updateServicesContent,
            updateValuesContent,
            updateProperties,
            updateKnowledgeBase,
            updateAssistantConfig,
            saveContent
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdmin must be used within an AdminProvider');
    return context;
};
