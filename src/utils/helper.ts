/**
 * Format the current date in a readable format
 * @returns Current date in format "Month Day, Year" (e.g., "July 12, 2025")
 */
export const getCurrentDate = (): string => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Formats a date string to a readable format
 * @param dateString Date string in format YYYY-MM-DD
 * @returns Formatted date in "Month Day, Year" format
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param text The text to truncate
 * @param maxLength Maximum allowed length
 * @returns Truncated text with ellipsis if truncated
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

/**
 * Generates initials from a full name
 * @param name Full name
 * @param limit Maximum number of characters (default: 2)
 * @returns Uppercase initials
 */
export const getInitials = (name: string, limit = 2): string => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, limit);
};

/**
 * Capitalize first letter of each word in a string
 * @param str String to capitalize
 * @returns Capitalized string
 */
export const capitalizeWords = (str: string): string => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

/**
 * Formats a phone number to a standardized format
 * @param phone Phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Check for different formats based on length
    if (cleaned.length === 10) {
        // Format as XXX-XXX-XXXX
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    // Return original if not in expected format
    return phone;
};