import { z } from 'zod'
import { SelectedAddons, Addon } from '@/lib/typeDefs'

const formatCurrency = (priceString: string) => {
    const priceNumber = parseFloat(priceString)

    if (isNaN(priceNumber)) {
        return 'Invalid Price'
    }

    return priceNumber.toFixed(2)
}

type addonType = 'package' | 'compulsory' | 'optional'

const transformAddonsForBackend = (
    selectedAddons: SelectedAddons | null,
    productAddons: Addon
): Array<{ name: string }> => {
    if (!selectedAddons) return []

    const backendAddons: Array<{ name: string }> = []

    if (selectedAddons.package) {
        backendAddons.push({ name: selectedAddons.package })
    }

    if (selectedAddons.compulsory) {
        backendAddons.push({ name: selectedAddons.compulsory })
    }

    selectedAddons.optional.forEach(name => {
        backendAddons.push({ name })
    });

    return backendAddons
}


export { formatCurrency, transformAddonsForBackend }