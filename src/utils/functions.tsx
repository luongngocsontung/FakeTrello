export const getNewId = () => {
    return (
        Date.now().toString(36) + Math.random().toString(36).substring(2, 12)
    );
};

export const swap = (array: string[], a: any, b: any) => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
};
