import React, { useState } from 'react';
import useEventListener from '@/plugins/useEventListener';
import SearchModal from '@/components/dashboard/search/SearchModal';
import { Search } from 'lucide-react';

export default () => {
    const [visible, setVisible] = useState(false);

    useEventListener('keydown', (e: KeyboardEvent) => {
        if (['input', 'textarea'].indexOf(((e.target as HTMLElement).tagName || 'input').toLowerCase()) < 0) {
            if (!visible && e.metaKey && e.key.toLowerCase() === '/') {
                setVisible(true);
            }

            if (visible && e.key.toLowerCase() === 'escape') {
                setVisible(false);
            }

            if (e.key.toLowerCase() === 'k' && e.ctrlKey) {
                e.preventDefault();
                setVisible(true);
            }
        }
    });

    return (
        <>
            {visible && <SearchModal appear visible={visible} onDismissed={() => setVisible(false)} />}
            <div className={'navigation-link'} onClick={() => setVisible(true)}>
                <Search />
                <span>Search</span>
            </div>
        </>
    );
};
