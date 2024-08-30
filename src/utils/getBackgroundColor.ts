export const getBackgroundColor = (name: string | undefined, selected: boolean) => {
    if (!selected) return '#3A3A3A;'; // Cor padrão para não selecionado

    switch (name) {
        case 'Rick Sanchez':
            return '#85F217';
        case 'Summer Smith':
            return '#FF00EE';
        case 'Morty Smith':
            return '#DFFF00';
        default:
            return '#17EAF2'; // Cor padrão para outros
    }
};