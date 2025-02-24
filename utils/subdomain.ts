export const getValidSubdomain = async (host?: string | null, baseUrl?: string) => {
    if (!host && typeof window !== 'undefined') {
      host = window.location.host;
    }

    if (!host) return null;
    if (!baseUrl) throw new Error("baseUrl is required for getValidSubdomain");

    try {
      const apiUrl = `${baseUrl}/api/subdomain?host=${host}`;
      console.log("Fetching subdomain from:", apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.subdomain || null;
    } catch (error) {
      console.error('Error fetching subdomain:', error);
      return null;
    }
};