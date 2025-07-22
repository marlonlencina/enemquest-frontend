export const Container = ({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return <div className={`container ${className}`}>{children}</div>;
};
