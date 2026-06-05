
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentState, INITIAL_CONTENT, Property, QA } from '../data/initialContent';
import { supabase } from '../utils/supabaseClient';

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
    saveContent: () => Promise<void>;
    loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [content, setContent] = useState<ContentState>(INITIAL_CONTENT);
    const [loading, setLoading] = useState(true);

    // Fetch Content from Supabase permanently
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_content')
                    .select('data')
                    .eq('id', '550e8400-e29b-41d4-a716-446655440000')
                    .single();

                if (error) {
                    // fallback to local storage if supabase fails or is empty
                    const saved = localStorage.getItem('dilar_horta_content');
                    if (saved) setContent(JSON.parse(saved));
                } else if (data && data.data && Object.keys(data.data).length > 0) {
                    setContent(data.data as ContentState);
                }
            } catch (err) {
                console.error("Erro ao carregar do Supabase", err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

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

    const saveContent = async () => {
        // Save to Supabase forever
        const { error } = await supabase
            .from('site_content')
            .update({ data: content })
            .eq('id', '550e8400-e29b-41d4-a716-446655440000');

        // Also save to localStorage as backup
        localStorage.setItem('dilar_horta_content', JSON.stringify(content));

        if (error) {
            console.error(error);
            alert('Aviso: Erro ao guardar na nuvem principal. As alterações foram salvas localmente.');
        } else {
            alert('Alterações guardadas permanentemente na nuvem com sucesso!');
        }
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
            saveContent,
            loading
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
