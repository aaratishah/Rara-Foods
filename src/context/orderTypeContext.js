import { createContext, useState } from "react";

const OrderTypeContext = createContext({});

const OrderTypeProvider = (props) => {
  const [activeOrderType, setActiveOrderType] = useState({
    isDinning: false,
    hasOwnDelivery: true,
    userPickup: false,
  });
  return (
    <OrderTypeContext.Provider value={{ activeOrderType, setActiveOrderType }}>
      {props.children}
    </OrderTypeContext.Provider>
  );
};

const OrderTypeConsumer = OrderTypeContext.Consumer;
export { OrderTypeContext, OrderTypeProvider, OrderTypeConsumer };
