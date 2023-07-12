export const getNewId = () => {
    return (
        new Date().toString().replaceAll(" ", "") +
        Math.random().toString(36).substring(2, 12)
    );
};
