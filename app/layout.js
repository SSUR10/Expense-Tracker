import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark,neobrutalism } from '@clerk/themes';
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Expensify",
  description: "Created by SSUR10",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism]
      }}
    >
      <html lang='en'>
        <body className={outfit.className}>
          <SignedOut>
            {/* Content to show when the user is signed out */}
          </SignedOut>
          
          <SignedIn>
            {/* Content to show when the user is signed in */}

          </SignedIn>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
