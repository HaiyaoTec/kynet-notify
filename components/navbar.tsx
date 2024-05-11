import {
	Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import {ReactNode} from "react";


export const Navbar = ({children}: { children: ReactNode }) => {
	return (
		<NextUINavbar maxWidth="full" position="sticky">
      {children}
		</NextUINavbar>
	);
};
