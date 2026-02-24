/** API client for Apify Black Box. */

// API base URL - use environment variable or default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.gspr-hub.site/v1';

export class ApifyAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApifyAPIError';
  }
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage (set by Supabase Auth)
  const token = typeof window !== 'undefined' ? localStorage.getItem('sb-access-token') : null;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApifyAPIError(error.detail || `HTTP ${response.status}`, response.status);
  }
  
  return response.json();
}

export const api = {
  // Auth
  async getMe() {
    return fetchWithAuth('/auth/me');
  },
  
  // Licenses
  async getMyLicenses() {
    return fetchWithAuth('/licenses/my');
  },
  
  async getLicenseUsage(key: string) {
    return fetchWithAuth(`/licenses/${key}/usage`);
  },
  
  // Orders
  async createOrder(tier: string, screenshotUrl: string) {
    return fetchWithAuth('/orders/create', {
      method: 'POST',
      body: JSON.stringify({ tier, screenshot_url: screenshotUrl }),
    });
  },
  
  async getMyOrders() {
    return fetchWithAuth('/orders/my');
  },
  
  // Reviews (for Skill usage)
  async searchReviews(product: string, source: string, licenseKey: string, limit: number = 10) {
    return fetchWithAuth('/reviews/search', {
      method: 'POST',
      headers: {
        'X-License-Key': licenseKey,
      },
      body: JSON.stringify({ product, source, limit }),
    });
  },
};
