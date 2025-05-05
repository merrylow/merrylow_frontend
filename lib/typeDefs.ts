type CardDetails = {
     imgSrc: string
     mealName: string
     mealDescription: string
}

interface Restaurant {
     name: string;
     id: number;
     slug: string;
     products: [];
}

interface Product {
     name: string;
     id: number;
     images: { src: string }[];
     store: { shop_name: string };
     price: string;
     currency: string;
     alt: string;
     stock_status: string;
}

interface CartItem extends Product {
     order_status: string;
     quantity: number;
}

type PaymentMethod = string | null

type OrderState = {
     loading: boolean;
     error: boolean;
     // cart: CartItem[]
     // cartCount: number
     // favouriteProducts: Product[]
     // favouriteRestaurants: Restaurant[]
     orderNote: string
     deliveryNote: string
     paymentMethod: PaymentMethod

     // addToCart: (meal: Product) => void
     // removeFromCart: (mealId: string) => void
     // clearCart: () => void
     setOrderNote: (note: string) => void
     setDeliveryNote: (note: string) => void
     setPaymentMethod: (method: PaymentMethod) => void


     // isMealFavourited: (mealId: number) => boolean
     // toggleFavouriteProduct: (mealId: number) => void
     // toggleFavouriteRestaurant: (restaurant: Restaurant) => void
}



export type { CardDetails, Restaurant, Product, CartItem, PaymentMethod, OrderState }