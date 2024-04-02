import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen px-4">
            <TopMenu />
            <Sidebar />
            {children}
            <Footer />
        </main>
    );
}