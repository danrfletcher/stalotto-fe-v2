import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} | Stalotto`;
        } else {
            document.title =
                'Stalotto | Competitions by your favourite creators & brnads';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
