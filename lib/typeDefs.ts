type CardDetails = {
     imgSrc: string
     name: string
     // description: string
}

interface Restaurant {
     name: string;
     id: string;
     phone: string;
     location: string;
     startTime: string;
     endTime: string;
     available: boolean;
     products: [];
}

interface Product {
     name: string;
     id: string;
     // images: { src: string }[];
     restaurant: Restaurant;
     // description: string;
     imgSrc: string;
     price: string;
     alt: string;
     addons: string;
}

type Addon = {
     id: string;
     name: string;
     price: string;
}

type PackageOption = {
     id: string;
     name: string;
     price: string;
}

interface CartItem extends Product {
     // order_status: string;
     quantity: number;
     // selectedAddons: Record<string, boolean> | null;
     selectedAddons: Addon[] | null;
     packageOption: PackageOption | null;
     orderNote: string | null;
}

type CartStore = {
     loading: boolean;
     error: boolean;
     cart: CartItem[];
     cartCount: number;
     cartTotal: number;
     addToCart: (product: Product, quantity: number, selectedAddons: Addon[] | null, packageOption: PackageOption | null, orderNote: string | null) => void
     // removeFromCart: (productId: string) => void
     // clearCart: () => void
     updateCartCount: () => void
     // calculateCartTotals: () => void
     paymentMethod: PaymentMethod
     setPaymentMethod: (method: PaymentMethod) => void
}

type PaymentMethod = string;

interface ProductStore {
     products: Product[];
     restaurants: Restaurant[];
     loading: boolean;
     error: string | null;
     currentProduct: Product | null;

     fetchProducts: () => Promise<void>;
     fetchRestaurants: () => Promise<void>;
     // fetchProduct: (id: string) => Promise<void>
     // fetchProduct: ;
     favouriteProducts: Product[] | undefined;
     favouriteRestaurants: Restaurant[] | undefined;
     isProductFavourited: (product: Product | undefined) => boolean;
     isRestaurantFavourited: (product: Restaurant | undefined) => boolean;
     toggleFavouriteProduct: (product: Product | undefined) => void;
     toggleFavouriteRestaurant: (restaurant: Restaurant | undefined) => void;

}


export type { CardDetails, Restaurant, Product, CartItem, PaymentMethod, CartStore, ProductStore, Addon, PackageOption }