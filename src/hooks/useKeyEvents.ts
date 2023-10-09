import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyEvent = <T>() => {
  const navigate = useNavigate();

  const handleRedirect = (event: KeyboardEvent<T>, key: string, url: string) => {
    if (event.key === key) {
      event.preventDefault();
      navigate(url);
    }
  };

  return handleRedirect;
};
