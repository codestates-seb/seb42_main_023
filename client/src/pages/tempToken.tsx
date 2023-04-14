import React from 'react';
import { useEffect } from 'react';
import { usePostTempTokenMutation } from '../api/tempTokenAPi';

const TempToken: React.FC = () => {
  const [postTempToken] = usePostTempTokenMutation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const tempAccessToken = url.searchParams.get('tempAccessToken');

    postTempToken({ tempAccessToken })
      .unwrap()
      .then((payload: any) => {
        const { name, picture, role } = payload;

        localStorage.setItem('name', name);
        localStorage.setItem('picture', picture);
        localStorage.setItem('role', role);

        window.location.href = '/';
      })
      .catch((err) => console.log('err in tempToken', err));
  }, []);

  return <div>Loading</div>;
};

export default TempToken;
