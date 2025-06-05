

export class SkipHireAPI {

    private static async executeFetch(
      fullUrl: string,
      options: RequestInit = {}
    ): Promise<unknown> { 
      const url = fullUrl; 
      const config: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          ...options.headers,
        },
        ...options,
      };
  
      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          console.error(' HTTP Error:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error: unknown) { 
        throw error; // Re-throw the error so it can be caught by the caller
      }
    }
  
    
    static async fetchDataFromEnv(): Promise<unknown> {
      
      const targetUrl = "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";
  
      if (!targetUrl) {
        const errorMessage = 'Environment variable REACT_APP_WASTE_API_FULL_URL is not set. Please configure it.';
        console.error(errorMessage);
        throw new Error('API target URL is not configured in environment variables.');
      }
      return this.executeFetch(targetUrl);
    }
  }