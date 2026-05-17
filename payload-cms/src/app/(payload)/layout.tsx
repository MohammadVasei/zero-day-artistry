/* THIS FILE IS REQUIRED BY @payloadcms/next — do not move or rename */
import type { Metadata } from "next";
import config from "@payload-config";
import "@payloadcms/next/css";
import {
  RootLayout,
  generatePageMetadata,
} from "@payloadcms/next/layouts";

import { importMap } from "./admin/importMap";

type Args = { children: React.ReactNode };

export const generateMetadata = ({ params, searchParams }: any): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap}>{children}</RootLayout>
);

export default Layout;
