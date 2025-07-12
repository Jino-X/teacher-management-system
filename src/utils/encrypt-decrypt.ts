import crypto from 'crypto';

// Constants as per specification
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // bytes
const TAG_LENGTH = 16; // bytes
const KEY_LENGTH = 32; // bytes (256 bits)
const BASE_KEY = 'TMS-011235#~#'; // Updated base encryption key for your Teacher Management System

/**
 * Generate the encryption key for the current date
 * @returns {Buffer} 32-byte encryption key
 */
function generateEncryptionKey(): Buffer {
    // Get current date in yyyyMMdd format
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;

    // Combine base key with date
    const fullKey = BASE_KEY + dateStr;

    // Generate SHA-256 hash and take first 32 bytes
    return crypto.createHash('sha256')
        .update(fullKey)
        .digest()
        .slice(0, KEY_LENGTH);
}

/**
 * Encrypt data using AES-GCM
 * @param {string | object} data - The data to encrypt (string or object that will be stringified)
 * @returns {string} BASE64_ENCODED_IV<space>BASE64_ENCODED_CIPHER_TEXT
 */
export function encrypt(data: string | object): string {
    try {
        // Convert object to string if needed
        const plaintext = typeof data === 'object' ? JSON.stringify(data) : data;

        // Generate a random IV
        const iv = crypto.randomBytes(IV_LENGTH);

        // Generate encryption key
        const key = generateEncryptionKey();

        // Create cipher
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        // Encrypt the data
        let encryptedData = cipher.update(plaintext, 'utf8', 'base64');
        encryptedData += cipher.final('base64');

        // Get the auth tag
        const authTag = cipher.getAuthTag();

        // Combine cipher text and auth tag
        const cipherTextWithTag = Buffer.concat([
            Buffer.from(encryptedData, 'base64'),
            authTag
        ]);

        // Return IV and cipher text in specified format
        return `${iv.toString('base64')} ${cipherTextWithTag.toString('base64')}`;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
}

/**
 * Decrypt data using AES-GCM
 * @param {string} encryptedData - The data to decrypt (format: BASE64_ENCODED_IV<space>BASE64_ENCODED_CIPHER_TEXT)
 * @param {boolean} parseJson - Whether to parse the result as JSON
 * @returns {string | object} Decrypted data
 */
export function decrypt(encryptedData: string, parseJson: boolean = false): string | object {
    try {
        // Split the encrypted data into IV and cipher text
        const [ivBase64, cipherTextBase64] = encryptedData.split(' ');

        // Decode the IV and cipher text
        const iv = Buffer.from(ivBase64, 'base64');
        const cipherTextWithTag = Buffer.from(cipherTextBase64, 'base64');

        // Extract cipher text and auth tag
        const cipherText = cipherTextWithTag.slice(0, -TAG_LENGTH);
        const authTag = cipherTextWithTag.slice(-TAG_LENGTH);

        // Generate decryption key
        const key = generateEncryptionKey();

        // Create decipher
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        // Decrypt the data
        let decrypted: string;
        if (typeof cipherText === 'string') {
            decrypted = decipher.update(cipherText, 'binary', 'utf8');
            decrypted += decipher.final('utf8');
        } else {
            // When cipherText is Buffer
            const decryptedBuffer = decipher.update(cipherText);
            const finalBuffer = decipher.final();
            decrypted = Buffer.concat([decryptedBuffer, finalBuffer]).toString('utf8');
        }

        // Parse as JSON if requested
        if (parseJson) {
            try {
                return JSON.parse(decrypted);
            } catch (e) {
                console.error('Failed to parse decrypted data as JSON', e);
                return decrypted;
            }
        }

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed');
    }
}

/**
 * Validate the encrypted data format
 * @param {string} encryptedData - The encrypted data to validate
 * @returns {boolean} True if format is valid
 */
export function isValidEncryptedFormat(encryptedData: string): boolean {
    if (typeof encryptedData !== 'string') return false;

    const parts = encryptedData.split(' ');
    if (parts.length !== 2) return false;

    try {
        const [ivBase64, cipherTextBase64] = parts;

        // Validate IV length
        const iv = Buffer.from(ivBase64, 'base64');
        if (iv.length !== IV_LENGTH) return false;

        // Validate cipher text + tag length
        const cipherTextWithTag = Buffer.from(cipherTextBase64, 'base64');
        if (cipherTextWithTag.length <= TAG_LENGTH) return false;

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Helper function to encrypt API payload
 * @param {object} payload - The API payload to encrypt
 * @returns {object} Object with encrypted payload
 */
export function encryptApiPayload(payload: object): { encryptedData: string } {
    return {
        encryptedData: encrypt(payload)
    };
}

/**
 * Helper function to decrypt API response
 * @param {object} response - The API response with encrypted data
 * @returns {object} Decrypted response data
 */
export function decryptApiResponse(response: { encryptedData: string }): object {
    if (!response || !response.encryptedData) {
        throw new Error('Invalid encrypted response format');
    }
    return decrypt(response.encryptedData, true) as object;
}