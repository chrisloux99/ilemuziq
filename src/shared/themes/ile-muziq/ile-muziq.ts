import { AppThemeConfiguration } from '/@/shared/themes/app-theme-types';

export const ileMuziq: AppThemeConfiguration = {
    app: {
        'scrollbar-handle-background': 'rgba(249, 115, 22, 0.3)',
        'scrollbar-handle-hover-background': 'rgba(249, 115, 22, 0.5)',
        'scrollbar-track-background': 'rgba(6, 6, 6, 0.8)',
        'scrollbar-track-hover-background': 'rgba(22, 163, 74, 0.2)',
    },
    colors: {
        background: '#050505',
        'background-alternate': '#0a0a0a',
        primary: '#f97316', // Vibrant Orange (African Sun)
        surface: '#111111',
        'surface-foreground': '#fafafa',
        foreground: '#f5f5f5',
        'foreground-muted': '#a3a3a3',
        'state-success': '#16a34a', // Rich African Green
        'state-info': '#22c55e', // Bright Green
        'state-warning': '#f97316', // Orange
        'state-error': '#dc2626',
    },
    mantineOverride: {
        primaryColor: 'african',
        colors: {
            african: [
                '#fff7ed', // Orange 50
                '#ffedd5', // Orange 100
                '#fed7aa', // Orange 200
                '#fdba74', // Orange 300
                '#fb923c', // Orange 400
                '#f97316', // Orange 500 (Primary)
                '#ea580c', // Orange 600
                '#c2410c', // Orange 700
                '#9a3412', // Orange 800
                '#7c2d12', // Orange 900
            ],
            green: [
                '#f0fdf4',
                '#dcfce7',
                '#bbf7d0',
                '#86efac',
                '#4ade80',
                '#22c55e',
                '#16a34a',
                '#15803d',
                '#166534',
                '#14532d',
            ],
        },
        components: {
            Button: {
                defaultProps: {
                    radius: 'md',
                },
                styles: {
                    root: {
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                        },
                    },
                },
            },
        },
    },
    mode: 'dark',
};
