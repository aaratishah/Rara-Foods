import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import { useState, createContext, useContext, useEffect } from 'react';
import { handleError } from 'services/util';
import { UserContext } from './userContext';

// Create Context Object
export const ShopContext = createContext();


// Create a provider for components to consume and subscribe to changes
export const ShopContextProvider = (props) => {
  const [spinning, setSpinning] = useState(false);

  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;

  const [cart, setCart] = useState(null);
  const [cartDetail, setCartDetail] = useState(null);
  const [cartRestaurant, setCartRestaurant] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    if (isAuth === undefined) {
    } else if (!isAuth) {
      setSpinning(true);
      resetItems();
      api.cartGuest
        .fetch()
        .then(({ data }) => {
          if (data.hasCart) {
            setCartDetail({
              totalPrice: data.totalPrice,
              status: data.status,
              createdDateTime: data.createdDateTime,
            });
            setCart(data.foods);
            setCartRestaurant(data.restaurant);
          } else {
            setCartDetail({
              totalPrice: 0,
              status: null,
              createdDateTime: null,
            });
            setCart([]);
            setCartRestaurant();
          }
        })
        .catch(handleError).finally(()=>setSpinning(false));
    } else if (isAuth) {
      setSpinning(true);
      resetItems();
      api.cart
        .fetch()
        .then(({ data }) => {
          if (data.hasCart) {
            setCartDetail({
              totalPrice: data.totalPrice,
              status: data.status,
              createdDateTime: data.createdDateTime,
            });
            setCart(data.foods);
            setCartRestaurant(data.restaurant);
          } else {
            setCartDetail({
              totalPrice: 0,
              status: null,
              createdDateTime: null,
            });
            setCart([]);
            setCartRestaurant();
          }
        })
        .catch(handleError).finally(()=>setSpinning(false));
    }
  }, [isAuth]);

  const fetchCart = () => {
    if (isAuth === undefined) {
      return;
    }
    setSpinning(true);
    api[isAuth ? 'cart' : 'cartGuest']
      .fetch()
      .then(({ data }) => {
        if (data.hasCart) {
          setCartDetail({
            totalPrice: data.totalPrice,
            status: data.status,
            createdDateTime: data.createdDateTime,
          });
          setCart(data.foods);
          setCartRestaurant(data.restaurant);
        } else {
          setCartDetail({
            totalPrice: 0,
            status: null,
            createdDateTime: null,
          });
          setCart([]);
          setCartRestaurant();
        }
      })
      .catch(handleError).finally(()=>setSpinning(false));
  };
  const resetItems = () => setCart([]);

  return (
    <ShopContext.Provider
      value={{
        cart: {
          cartDetail,
          cartRestaurant,
          items: cart,
          fetchCart,
          resetItems,
          cartVisible,
          setCartVisible,
        },
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
