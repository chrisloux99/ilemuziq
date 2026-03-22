import { AppThemeConfiguration } from '/@/shared/themes/app-theme-types';

export const ileMuziq: AppThemeConfiguration = {
    app: {
        'scrollbar-handle-background': 'rgba(16, 185, 129, 0.2)',
        'scrollbar-handle-hover-background': 'rgba(16, 185, 129, 0.4)',
    },
    colors: {
        background: '#09090b',
        'background-alternate': '#121214',
        primary: '#10b981', // Emerald 500
        surface: '#18181b',
        'surface-foreground': '#f4f4f5',
        foreground: '#f8fafc',
        'foreground-muted': '#94a3b8',
    },
    mantineOverride: {
        primaryColor: 'emerald',
        colors: {
            emerald: [
                '#ecfdf5',
                '#d1fae5',
                '#a7f3d0',
                '#6ee7b7',
                '#34d399',
                '#10b981',
                '#059669',
                '#047857',
                '#065f46',
                '#064e3b',
            ],
        },
    },
    mode: 'dark',
};
