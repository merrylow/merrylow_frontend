'use client'

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { useLoadingStore } from '@/stores/useLoadingStore'
import LoadingOverlay from '@/components/loadingOverlay'


const ClientLayoutShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const previousPath = useRef<string | null>(null);
    const setLoading = useLoadingStore(state => state.setLoading);

    useEffect(() => {
        // triggers loading when pathname changes
        if (previousPath.current !== null && previousPath.current !== pathname) {
            setLoading(true);
            // Short delay to simulate load & give time for spinner to render
            setTimeout(() => setLoading(false), 2000); // adjust duration if needed
        }

        previousPath.current = pathname;
    }, [pathname, setLoading])

    return (
        <>
            <LoadingOverlay />
            {children}
        </>
    )
}

export default ClientLayoutShell