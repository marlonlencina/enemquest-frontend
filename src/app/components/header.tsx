import Image from "next/image";
import logo from "../../assets/logo.svg";
export const Header = ({
  variant = "default",
}: {
  variant?: "colored" | "default";
}) => {
  return (
    
    <header className={`w-full border-b ${variant === "colored" ? "bg-transparent border-white-custom-10 " : "bg-white-custom border-gray-200-custom"}`}>
      <div className="container h-[72px]  flex items-center justify-between">
        <div>
          <Image height={32} alt="Logo" src={logo} />
        </div>
        {/* <div className="group rounded-[4px] px-4 h-[48px] max-w-[484px] w-full flex items-center gap-2 border border-white-custom-10  focus:outline-none focus:ring-2 focus:ring-white-custom  transition-all">
          <MagnifyingGlassIcon
            height={24}
            width={24}
            className="text-white-custom-10"
          />
          <input
            type="text"
            placeholder="Buscar questões..."
            className="text-white-custom placeholder:text-white-custom-10 w-full bg-transparent  outline-0"
          />
        </div> */}
       
        {/* <h1 className="font-head text-body18 font-semibold text-black-custom">
          {title}
        </h1> */}
      </div>
    </header>
  );
};
