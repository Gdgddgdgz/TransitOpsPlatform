"use client";

import { useState, useEffect } from "react";
import { listeners } from "./mock-db";

export function useMockState() {
  const [, setVersion] = useState(0);
  useEffect(() => {
    const handler = () => setVersion((v) => v + 1);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);
}
