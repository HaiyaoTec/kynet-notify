"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import toast, {Toaster, useToasterStore} from "react-hot-toast";
import {useEffect} from "react";
import {TokenProvider} from "@/components/token-providers";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}
const TOAST_LIMIT = 3;
export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const { toasts } = useToasterStore();
  
  // Enforce Limit
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
        <TokenProvider>
          <Toaster position="top-right" reverseOrder={false}/>
          {children}
        </TokenProvider>
      </NextThemesProvider>
		</NextUIProvider>
	);
}
