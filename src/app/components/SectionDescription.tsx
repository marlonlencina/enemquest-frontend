interface SectionDescriptionProps {
  children: React.ReactNode;
}

export default function SectionDescription({ children }: SectionDescriptionProps) {
  return (
    <p className="mt-2 font-body text-body16 font-normal text-gray-500-custom">
      {children}
    </p>
  );
}