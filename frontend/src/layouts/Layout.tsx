import Footer from "@/components/app_components/Footer";
import Header from "@/components/app_components/Header";
import Hero from "@/components/app_components/Hero";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-60 w-full flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container px-6 sm:px-1 py-10 flex-1">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
