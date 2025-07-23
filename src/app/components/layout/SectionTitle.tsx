interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <p className="font-head text-body16 text-black-custom font-semibold">
      {children}
    </p>
  );
}