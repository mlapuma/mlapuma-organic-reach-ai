import type { ReactNode } from "react";
export const metadata = { title: "Organic Reach AI", description: "Painel de crescimento orgânico" };
export default function RootLayout({children}:{children:ReactNode}) {
 return <html lang="pt-BR"><body style={{margin:0,background:"#0b1220",color:"#f8fafc",fontFamily:"Arial,sans-serif"}}>{children}</body></html>;
}
