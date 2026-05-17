import { useEffect } from 'react';

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | HOTSPRING`;
  }, [title]);
}

export default usePageTitle;
