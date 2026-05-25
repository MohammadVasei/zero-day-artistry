/* THIS FILE IS REQUIRED BY @payloadcms/next — do not move or rename */
import type { Metadata } from "next";
import config from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import { generatePageMetadata } from "@payloadcms/next/views";

import { importMap } from "./admin/importMap.js";

type Args = { children: React.ReactNode };

export const generateMetadata = ({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [k: string]: string | string[] }>;
}): Promise<Metadata> => generatePageMetadata({ config, params, searchParams });

const serverFunctionAction = async (...args: Parameters<typeof handleServerFunctions>) => {
  "use server";
  return handleServerFunctions(...args);
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunctionAction}>
    {children}
  </RootLayout>
);

export default Layout;
