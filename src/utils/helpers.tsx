/**
 * Formats a text description by removing HTML tags, trimming to a specified length, and adding ellipsis if needed
 * @param description - The input string that may contain HTML tags
 * @param maxLength - Maximum length of the returned string (default: 300 characters)
 * @returns A cleaned and truncated string with ellipsis if truncated
 * 
 * Example:
 * Input: "<p>This is a long description with HTML tags</p>" (maxLength: 10)
 * Output: "This is a ..."
 */
export function formatDescription(description: string, maxLength: number = 250): string {
  const cleanText = description.replace(/<\/?[^>]+(>|$)/g, '');
  const trimmedText = cleanText.slice(0, maxLength).trim();
  const ellipsis = description.length > maxLength ? '...' : '';
  
  return trimmedText + ellipsis;
}

/**
 * Removes HTML tags from a text string
 * @param text - The input string that may contain HTML tags
 * @returns A cleaned string without HTML tags
 * 
 * Example:
 * Input: "<p>This is a description</p><ul><li>Item 1</li><li>Item 2</li></ul>"
 * Output: "This is a description Item 1 Item 2"
 */
export function stripHtmlTags(text: string): string {
  return text.replace(/<\/?[^>]+(>|$)/g, '');
}
