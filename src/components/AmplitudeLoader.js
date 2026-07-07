"use client";
import dynamic from "next/dynamic";

const Amplitude = dynamic(() => import("@/amplitude").then(m => ({ default: m.Amplitude })), { ssr: false });

export default function AmplitudeLoader() {
  return <Amplitude />;
}
