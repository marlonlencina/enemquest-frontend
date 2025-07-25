interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <p className={`font-head text-body16 text-black-custom font-semibold ${className}`}>
      {children}
    </p>
  );
}