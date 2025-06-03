export const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  // If we have a subdomain (e.g., shop.localhost)
  if (parts.length > 1 && parts[0] !== "localhost") {
    return parts[0];
  }

  return null;
};

export const navigateToShop = (shopName) => {
  window.location.href = `http://${shopName}.localhost:5173`;
};

export const navigateToMain = () => {
  window.location.href = "http://localhost:5173";
};
