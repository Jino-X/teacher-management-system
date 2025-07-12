/**
 * @fileoverview
 * Utility functions for interacting with sessionStorage and localStorage in a safe, robust, and consistent way.
 * Handles serialization, deserialization, and SSR safety.
 * Exports: sessionStorageUtils, localStorageUtils (object namespaces)
 */

/**
 * Safely checks if the code is running in a browser environment.
 * @returns {boolean}
 */
function isBrowser(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Serializes a value for storage.
 * @param {any} value - The value to serialize
 * @returns {string} The serialized value
 */
function serialize(value: any): string {
    try {
        if (typeof value === "string") return value;
        return JSON.stringify(value);
    } catch (error) {
        console.error("Error serializing value for storage:", error);
        return "";
    }
}

/**
 * Deserializes a value from storage.
 * @param {string|null|undefined} value - The value to deserialize
 * @returns {any} The deserialized value
 */
function deserialize(value: string | null | undefined): any {
    if (value === null || value === undefined) return null;
    try {
        // Try to parse JSON, fallback to string
        return JSON.parse(value);
    } catch {
        return value;
    }
}

interface StorageUtils {
    set(key: string, value: any): void;
    get<T = any>(key: string): T | null;
    remove(key: string): void;
    clear(): void;
}

// Session Storage Utilities
export const sessionStorageUtils: StorageUtils = {
    /**
     * Sets a value in sessionStorage.
     * @param {string} key - The key to set
     * @param {any} value - The value to store
     */
    set(key: string, value: any): void {
        if (!isBrowser()) return;
        try {
            sessionStorage.setItem(key, serialize(value));
        } catch (error) {
            console.error(`Error setting sessionStorage key "${key}":`, error);
        }
    },

    /**
     * Gets a value from sessionStorage.
     * @param {string} key - The key to retrieve
     * @returns {T|null} The retrieved value or null
     */
    get<T = any>(key: string): T | null {
        if (!isBrowser()) return null;
        try {
            const value = sessionStorage.getItem(key);
            return deserialize(value) as T;
        } catch (error) {
            console.error(`Error getting sessionStorage key "${key}":`, error);
            return null;
        }
    },

    /**
     * Removes a key from sessionStorage.
     * @param {string} key - The key to remove
     */
    remove(key: string): void {
        if (!isBrowser()) return;
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing sessionStorage key "${key}":`, error);
        }
    },

    /**
     * Clears all sessionStorage.
     */
    clear(): void {
        if (!isBrowser()) return;
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error("Error clearing sessionStorage:", error);
        }
    }
};

// Local Storage Utilities
export const localStorageUtils: StorageUtils = {
    /**
     * Sets a value in localStorage.
     * @param {string} key - The key to set
     * @param {any} value - The value to store
     */
    set(key: string, value: any): void {
        if (!isBrowser()) return;
        try {
            localStorage.setItem(key, serialize(value));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    },

    /**
     * Gets a value from localStorage.
     * @param {string} key - The key to retrieve
     * @returns {T|null} The retrieved value or null
     */
    get<T = any>(key: string): T | null {
        if (!isBrowser()) return null;
        try {
            const value = localStorage.getItem(key);
            return deserialize(value) as T;
        } catch (error) {
            console.error(`Error getting localStorage key "${key}":`, error);
            return null;
        }
    },

    /**
     * Removes a key from localStorage.
     * @param {string} key - The key to remove
     */
    remove(key: string): void {
        if (!isBrowser()) return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    },

    /**
     * Clears all localStorage.
     */
    clear(): void {
        if (!isBrowser()) return;
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }
};