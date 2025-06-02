export const getSubdomain = () => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if(parts.length > 1 && parts[0] != 'localhost') {
        return parts[0];
    }

    return null;
}

export const navigateToShop = (shopname) => {
    window.location.href = `https://${shopname}.localhost:5173`;
}

export const navigateToMain = () => {
    window.location.href = `https://localhost:5173`;
}