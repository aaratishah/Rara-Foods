import { useState, createContext } from "react";

// Create Context Object
export const UserLoginContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const UserLoginContextProvider = (props) => {
	const [isVisible, setVisible] = useState(false);
	const [tab, setTab] = useState("1");
	const [syncCart, setSyncCart] = useState(false);

	return (
		<UserLoginContext.Provider value={[isVisible, setVisible, tab, setTab, setSyncCart, syncCart]}>
			{props.children}
		</UserLoginContext.Provider>
	);
};
