export const getValidSubdomain = async (host?: string | null) => {
    if (!host && typeof window !== 'undefined') {
      host = window.location.host;
    }
  
    if (!host) return null;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subdomain?host=${host}`);
      const data = await res.json();
      return data.subdomain || null;
    } catch (error) {
      console.error('Error fetching subdomain:', error);
      return null;
    }
  };