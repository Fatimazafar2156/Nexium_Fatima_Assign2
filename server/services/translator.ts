// Translation API configuration
const TRANSLATION_API_URL = 'https://api.mymemory.translated.net/get';

// Function to translate text using MyMemory Translation API (free tier)
export const translateToUrdu = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return '';
  }

  try {
    // Build the URL with proper encoding
    const url = `${TRANSLATION_API_URL}?q=${encodeURIComponent(text)}&langpair=en|ur`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Translation API request failed');
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    } else {
      throw new Error(data.responseDetails || 'Translation not available');
    }
  } catch (error: any) {
    console.error('Translation error:', error?.message || error);
    return `ترجمہ ناکام ہوگیا: ${text}`;
  }
};
