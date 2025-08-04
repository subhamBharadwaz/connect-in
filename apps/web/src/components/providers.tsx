"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";

import { MainErrorFallback } from "@/components/errors/main";
import { queryConfig } from "@/lib/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			}),
	);
	return (
		<ErrorBoundary FallbackComponent={MainErrorFallback}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<QueryClientProvider client={queryClient}>
					{process.env.DEV && <ReactQueryDevtools />}
					{children}
				</QueryClientProvider>

				<Toaster richColors />
			</ThemeProvider>
		</ErrorBoundary>
	);
}
