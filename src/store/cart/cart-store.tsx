import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];

    getTotalItems: () => number;

    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        itemsInCart: number;
        total: number;
    };

    removeProduct: (product: CartProduct) => void;

    updateProductQuantity: (product: CartProduct, quantity: number) => void;

    addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(

        //'set' variable allows us change de state, and "get" variable allows to get data from the store
        (set, get) => ({
            cart: [],

            // Methods

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price + subTotal), 0);
                const tax = subTotal * 0.16;
                const itemsInCart = cart.reduce((subTotal, product) => (product.quantity + subTotal), 0);
                const total = subTotal + tax;

                return {
                    subTotal,
                    tax,
                    itemsInCart,
                    total,
                }
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // 1- Check if the selected product exists in the cart  
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                //2- I know the selected product exists in the cart with the same size... I have to increase it.
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: (item.quantity + product.quantity) }
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                //1- I know the selected product exists in the cart with the same size... I have to increase it.
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get();

                //1- I know the selected product exists in the cart with the same size... I have to increase it.
                const updatedCartProducts = cart.filter(item => !(item.id === product.id && item.size === product.size));

                set({ cart: updatedCartProducts });
            }
        })
        , {
            name: "shopping-cart"
        }
    )

)
