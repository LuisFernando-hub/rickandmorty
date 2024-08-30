
export const getColor = (name: string, selected: boolean) => {
    if (!selected) return '#fff;';

    switch (name) {
        case 'Summer Smith':
            return '#fff';
    }

    return '#000';
}