import Header from "@/components/Header";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default DashboardLayout;
