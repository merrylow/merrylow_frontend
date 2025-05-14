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
     addOns: string;
}

interface CartItem extends Product {
     // order_status: string;
     quantity: number;
     selectedAddons: Record<string, boolean>;
     packageOption: string;
     orderNote: string;
}

type PaymentMethod = string | null

type OrderNoteProps = {
     orderNote: string;
     setOrderNote: (value: string) => void;
}

type CartStore = {
     loading: boolean;
     error: boolean;
     cart: CartItem[]
     cartCount: number
     // orderNote: string
     // deliveryNote: string
     // paymentMethod: PaymentMethod

     addToCart: (product: Product, quantity: number, selectedAddons: Record<string, boolean>, packageOption: string, orderNote: string) => void
     // removeFromCart: (productId: string) => void
     // clearCart: () => void
     // setOrderNote: (note: string) => void
     // setDeliveryNote: (note: string) => void
     // setPaymentMethod: (method: PaymentMethod) => void
}



// type ProductModalState = {
//      restaurantId: string | null
//      productId: string | null
//      open: boolean
//      setProductData: (restaurantId: string, productId: string) => void
//      closeModal: () => void
// }


interface ProductStore {
     products: Product[]
     restaurants: Restaurant[]
     loading: boolean
     error: string | null
     currentProduct: Product | null

     fetchProducts: () => Promise<void>
     fetchRestaurants: () => Promise<void>
     // fetchProduct: (id: string) => Promise<void>
     // fetchProduct: ;
     favouriteProducts: Product[] | undefined;
     favouriteRestaurants: Restaurant[] | undefined;
     isProductFavourited: (product: Product | undefined) => boolean
     isRestaurantFavourited: (product: Restaurant | undefined) => boolean
     toggleFavouriteProduct: (product: Product | undefined) => void
     toggleFavouriteRestaurant: (restaurant: Restaurant | undefined) => void

}


export type { CardDetails, Restaurant, Product, CartItem, PaymentMethod, CartStore, ProductStore, OrderNoteProps }