"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // name is LCP, CLS, INP, FCP, TTFB
    console.log(`[WebVitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
  });
  return null;
}