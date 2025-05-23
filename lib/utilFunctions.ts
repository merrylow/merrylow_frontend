import { SelectedAddons, Addon } from '@/lib/typeDefs'

const formatCurrency = (priceString: string) => {
    const priceNumber = parseFloat(priceString)

    if (isNaN(priceNumber)) {
        return 'Invalid Price'
    }

    return priceNumber.toFixed(2)
}

type addonType = 'package' | 'compulsory' | 'optional'

// const transformAddonsForBackend = (
//     selectedAddons: SelectedAddons | null,
//     productAddons: Addon
// ): Array<{ name: string }> => {
//     if (!selectedAddons) return [];
//
//     const backendAddons: Array<{ name: string }> = [];
//
//     // Handle package selection
//     if (selectedAddons.package && selectedAddons.package in productAddons.package) {
//         backendAddons.push({
//             name: selectedAddons.package
//         });
//     }
//
//     // Handle compulsory addons
//     selectedAddons.compulsory.forEach(name => {
//         if (name in productAddons.compulsory) {
//             backendAddons.push({ name });
//         }
//     });
//
//     // Handle optional addons
//     selectedAddons.optional.forEach(name => {
//         if (name in productAddons.optional) {
//             backendAddons.push({ name });
//         }
//     });
//
//     return backendAddons;
// }




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