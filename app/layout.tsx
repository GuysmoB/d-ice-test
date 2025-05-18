import "./globals.css";
import { MuiContainer } from "./lib/provider/MuiContainer";

export default function RootLayout({  children,}: Readonly<{  children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body >
        <MuiContainer>

        {children}
        </MuiContainer>
      </body>
    </html>
  );
}
