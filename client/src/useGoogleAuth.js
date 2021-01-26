import { useEffect, useState } from 'react';

const CLIENT_ID = "my-cool-apps-client-id";

const useGoogleAuth = () => {
  const [googleAuth, setGoogleAuth] = useState();

  const initGoogleApi = () => {
    window.gapi.load('auth2', () => {
      setGoogleAuth(
        window.gapi.auth2.init({
          client_id: CLIENT_ID,
          onInit() {
            console.log('Initialized Google client auth');
          },
        }),
      );
    });
  };

  useEffect(() => {
    initGoogleApi();
  }, []);

  return googleAuth;
};

export default useGoogleAuth;