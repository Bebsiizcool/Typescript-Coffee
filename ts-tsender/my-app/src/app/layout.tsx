import type { Metadata } from "next";
import {Providers} from "./providers"
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tsender",
};

export default function RootLayout(props: {children: ReactNode}){
 
  return (
    <html lang="en">
      <body>
        hi from layout
        <Providers> 
        {props.children}
        </Providers>
        </body>
    </html>
  );
}
