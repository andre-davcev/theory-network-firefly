import { style, animate, keyframes, animation, query} from '@angular/animations';

export const pulse = animation
([
    query('.cpt-body',
        animate('{{ duration }} linear infinite',
            keyframes
            ([
                style({ offset: 0.00, fill: 'var(--cpt-color-primary)' }),
                style({ offset: 0.25, fill: 'var(--cpt-color-primary-lighter)' }),
                style({ offset: 0.50, fill: 'var(--cpt-color-primary)' }),
                style({ offset: 0.75, opacity: '0.5' }),
                style({ offset: 1.00, opacity: '1.0' })
            ])
        ),

        { params: { duration: '1500ms' }}
    ),

    query('.cpt-tentacles.cpt-inside > .cpt-tentacle',
        animate('{{ duration }} linear infinite',
            keyframes
            ([
                style({ offset: 0.00, fill: 'var(--cpt-color-primary)',         stroke: 'var(--cpt-color-primary)' }),
                style({ offset: 0.25, fill: 'var(--cpt-color-primary-lighter)', stroke: 'var(--cpt-color-primary-lighter)' }),
                style({ offset: 0.50, fill: 'var(--cpt-color-primary)',         stroke: 'var(--cpt-color-primary-lighter)' }),
                style({ offset: 0.75, opacity: '0.5' }),
                style({ offset: 1.00, opacity: '1.0' })
            ])
        ),

        { params: { duration: '1500ms' }}
    )
]);

