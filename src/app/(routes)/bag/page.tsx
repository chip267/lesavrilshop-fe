import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import BagIcon from "@/components/ui/icons/BagIcon";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIncrement = () => {
    if (item.quantity < 10) {
      onUpdateQuantity(item.productId, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.productId);
    } finally {
      setIsRemoving(false);
    }
  };

  if (isRemoving) return null;

  return (
    <div className="flex gap-6 py-6 border-b border-gray-100">
      <div className="w-[120px] h-[150px] bg-gray-50">
        <img
          src={item.productImage}
          alt={item.productName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-normal">{item.productName}</h3>
          <div className="mt-2">
            <span className="text-lg">
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(item.price)}{" "}
              ₫
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-200 rounded-full">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}x</span>
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= 10}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="text-gray-400 hover:text-black transition-colors disabled:opacity-50"
            aria-label="Remove item"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyCart = ({ onClose }) => (
  <div className="p-2 mt-6 flex flex-col justify-center items-center">
    <div className="w-[150px] h-[150px]">
      <img
        src="/assets/images/img_banner_empty.png"
        alt="Empty basket"
        className="w-full h-full object-cover"
      />
    </div>
    <p className="mt-6 mb-3 text-[16px]">Empty basket</p>
    <p className="mb-6 text-center align-center font-light text-[12px]">
      Your basket is still empty, discover everything we've got for you
    </p>
    <Button onClick={onClose} className="bg-black text-white rounded-full px-8">
      DISCOVER
    </Button>
  </div>
);

const Cart = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const {
    cart,
    isLoading,
    error,
    fetchCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      clearCart(); // Clear cart when user is not authenticated
    }
  }, [isAuthenticated, fetchCart, clearCart]);

  useEffect(() => {
    if (!isAuthenticated && cart) {
      clearCart(); // Ensure cart is cleared when authentication state changes
    }
  }, [isAuthenticated, cart, clearCart]);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    try {
      await updateCartItem(productId, quantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      await removeFromCart(productId);
      await fetchCart(); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleSheetOpen = (open: boolean) => {
    setIsOpen(open);
    if (open && isAuthenticated) {
      fetchCart();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 p-0">
          {/* <Button
          className="bg-transparent shadow-none hover:bg-transparent h-6  rounded-full justify-center items-center"
          size="icon"
        > */}
          <BagIcon />
          {/* </Button> */}
          {cart?.totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-black text-[11px] font-medium text-white flex items-center justify-center">
              {cart.totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="sr-only">Basket</SheetTitle>
          <div className="items-center flex mt-6 mb-6 justify-between">
            <p className="font-medium text-[20px]">Basket</p>
            <Button
              onClick={() => router.push("/favorite")}
              className="border px-3 py-4 h-[36px] border-black rounded-full shadow-none text-black tracking-wide font-bold text-[12px] bg-transparent py-[10px] active:bg-black focus:text-white focus:font-bold"
            >
              Favourite
            </Button>
          </div>
        </SheetHeader>

        {!isAuthenticated ? (
          <div className="p-2 mt-6 flex flex-col justify-center items-center">
            <p className="text-center mb-4">Please log in to view your cart</p>
            <Button
              onClick={() => router.push("/login")}
              className="bg-black text-white rounded-full px-8"
            >
              Login
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : !cart?.items?.length ? (
          <EmptyCart onClose={() => setIsOpen(false)} />
        ) : (
          <div className="flex flex-col h-[calc(100vh-5rem)]">
            <div className="flex-1 overflow-auto">
              {cart.items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
            <div className="sticky bottom-0 bg-white pt-4">
              <div className="border-t border-gray-200">
                <div className="flex justify-between items-center py-4">
                  <span className="text-xl font-medium">Total</span>
                  <span className="text-xl font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "decimal",
                      maximumFractionDigits: 0,
                    }).format(cart.totalAmount)}{" "}
                    ₫
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4 px-1">
                  Remember that the import costs correspond to the fees,
                  tariffs, and taxes established by each local government and
                  may be subject to payments at the destination.
                </p>
              </div>
              <Button
                className="w-full h-11 bg-[#66BB6A] hover:bg-[#4CAF50] text-white font-medium text-base rounded-lg"
                onClick={() => router.push("/checkout")}
              >
                PROCESS ORDER
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
