import type { Metadata } from "next";
import {Providers} from "./providers"
import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Tsender",
};

export default function RootLayout(props: {children: ReactNode}){
 
  return (
    <html lang="en">
      <body>
        
        <Providers> 
          <Header/>
        {props.children}
        </Providers>
        </body>
    </html>
  );
}
