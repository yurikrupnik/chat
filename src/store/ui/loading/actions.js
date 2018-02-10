export const LOADING = 'LOADING';

function toggleLoading(name) {
    return {type: `${LOADING}_${name}`};
}

function createLoading(name) {
    return {
        toggle: () => toggleLoading(name)
    }
}

export default createLoading;