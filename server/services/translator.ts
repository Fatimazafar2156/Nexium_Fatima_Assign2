export async function translateToUrdu(text: string): Promise<string> {
  if (!text) return '';

  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'ur',
        format: 'text'
      })
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return 'ترجمہ دستیاب نہیں ہے۔';
  }
}
