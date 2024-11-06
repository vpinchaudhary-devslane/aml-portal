import { useEffect, useState } from 'react';

const useCookie = (cookieName: string) => {
  const [cookieExists, setCookieExists] = useState(false);

  useEffect(() => {
    const checkCookie = () => {
      const cookies = document.cookie?.split(';');
      const exists = cookies.some((cookie) =>
        cookie.trim().startsWith(`${cookieName}=`)
      );
      setCookieExists(exists);
    };

    checkCookie();
  }, [cookieName]);

  return cookieExists;
};

export default useCookie;
