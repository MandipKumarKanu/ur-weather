import type { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-[100dvh] container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-gray-400 text-center">
          <p>
            Made with ❤️ by
            <a href="https://github.com/MandipKumarKanu" target="__blank">
              {" "}
              Mandy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
