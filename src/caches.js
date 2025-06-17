/* Initialize global cache if it doesn't exist */
if (!global.__cache) {
  global.__cache = {
    secureWord: new Map(),
    mfa: new Map(),
  };
}

/* Get secure word from cache */
export const getSecureWord = (username) => {
  return global.__cache.secureWord.get(username);
};

/* Set secure word in cache */
export const setSecureWord = (username, data) => {
  global.__cache.secureWord.set(username, data);
};

/* Delete secure word from cache */
export const deleteSecureWord = (username) => {
  global.__cache.secureWord.delete(username);
};

/* Get MFA from cache */
export const getMfa = (username) => {
  return global.__cache.mfa.get(username);
};

/* Set MFA in cache */
export const setMfa = (username, data) => {
  global.__cache.mfa.set(username, data);
};

/* Delete MFA from cache */
export const deleteMfa = (username) => {
  global.__cache.mfa.delete(username);
};
