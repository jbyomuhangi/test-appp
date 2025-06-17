"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";

export const QueryProvider = ({ children }) => {
  const client = useMemo(() => {
    return new QueryClient();
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
