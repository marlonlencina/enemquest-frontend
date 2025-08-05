interface SectionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionDescription({ children, className }: SectionDescriptionProps) {
  return (
    <p className={`mt-2 font-body text-body16 font-normal text-gray-500-custom ${className}`}>
      {children}
    </p>
  );
}