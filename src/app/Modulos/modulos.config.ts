// src/app/modulos/modulos.config.ts
export interface ModuloConfig {
    lastPage: number;
    scratchPage: number;
    scratchFile: string;
    endLink: string;
}

export const MODULOS: Record<number, ModuloConfig> = {
    1: { lastPage: 8, scratchPage: 5, scratchFile: 'modulo1.sb3', endLink: '/principal' },
    2: { lastPage: 4, scratchPage: 3, scratchFile: 'modulo2.sb3', endLink: '/principal' },
    3: { lastPage: 5, scratchPage: 3, scratchFile: 'modulo3.sb3', endLink: '/principal' },
    4: { lastPage: 4, scratchPage: 3, scratchFile: 'modulo4.sb3', endLink: '/principal' },
    5: { lastPage: 7, scratchPage: 5, scratchFile: 'modulo5.sb3', endLink: '/principal' },
    6: { lastPage: 6, scratchPage: 5, scratchFile: 'modulo6.sb3', endLink: '/principal' },
};
