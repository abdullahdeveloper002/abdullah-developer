"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => "";

// Reading the clock during the prerender isn't allowed with Cache Components, and
// a baked-in year would go stale. The server snapshot stays empty; the browser
// fills in the current year right after hydration.
export default function CurrentYear() {
  return useSyncExternalStore(subscribe, getYear, getServerYear);
}
