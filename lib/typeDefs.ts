interface User {
     id: string;
     name: string;
     email: string;
     imgUrl: string;
     // other properties
}

type UserState = {
     user: User | null;
     fetchUser: () => void;
     isAuthenticated: boolean;
     setAuthenticated: (isAuthenticated: boolean) => void;
     loading: boolean;
}

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
     imageUrl: string;
     price: string;
     alt: string;
     addOns: Addon;
}

type Addon = {
     package: PackageAddOns;
     optional: OptionalAddOns;
     compulsory: CompulsoryAddOns;
}

type PackageAddOns = {
     // pack: number;
     // rubber: number;
     name: number
};

// type OptionalAddOns = Record<string, number>;
// type CompulsoryAddOns = Record<string, number>;
type OptionalAddOns = {
     name: number;
}

type CompulsoryAddOns = {
     name: number;
}


// type PackageOption = {
//      id: string;
//      name: string;
//      price: string;
// }


type SelectedAddon = {
     package: PackageAddOns;
     optional: OptionalAddOns;
     compulsory: CompulsoryAddOns;
}



// type SelectedAddon = {
//      package: string
//      compulsory: string[]
//      optional: string[]
// }

// type SelectedAddons = SelectedAddon[]


type SelectedAddons = {
     package: string;
     compulsory: string[];
     optional: string[];
}

interface CartItem extends Product {
     // order_status: string;
     quantity: number;
     productId: string;
     // selectedAddons: Record<string, boolean> | null;
     selectedAddons: SelectedAddons | null;
     // packageOption: PackageOption | null;
     orderNote: string | null;
}

type CartStore = {
     loading: boolean;
     error: boolean;
     cart: CartItem[];
     cartCount: number;
     cartTotal: number;
     fetchCart: () => void;
     addToCart: (product: Product, quantity: number, selectedAddons: SelectedAddons | null, orderNote: string | null) => void
     // removeFromCart: (productId: string) => void
     // clearCart: () => void
     updateCartCount: () => void
     // calculateCartTotals: () => void
     paymentMethod: PaymentMethod
     setPaymentMethod: (method: PaymentMethod) => void
}

type PaymentMethod = string;

type ProductStore = {
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


export type { CardDetails, Restaurant, Product, CartItem, PaymentMethod, CartStore, ProductStore, SelectedAddons, User, UserState }