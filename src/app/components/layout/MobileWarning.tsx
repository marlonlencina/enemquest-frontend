import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Logo } from "./Logo";

export default function MobileWarning() {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-blue-primary-dark  z-[9999] flex items-center justify-center p-4 md:hidden">
      <div className="bg-white rounded-lg p-6 w-full">
        <div>
          <Logo height={40}/>
        </div>

        <div className="mb-4 mt-4">
          <h2 className="text-start text-head24 font-head text-black-custom">
            Aviso Importante
          </h2>
        </div>

        <p className="text-start text-black-custom text-body16 font-body mb-4">
          O <strong>ENEM Quest</strong> ainda não possui responsividade.
          Recomendamos que o use em <strong>notebooks e tablets</strong> para
          melhor experiência.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-primary-dark p-4">
          <p className="text-blue-primary-dark text-body14 font-body text-start">
            <Icon icon="lucide:info" className="inline mr-2" />
            Fique tranquilo, essa é uma prioridade e em breve estará disponível
            para todos dispositivos.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Link href="https://chat.whatsapp.com/Ijj7nbXUWJs3gVH5qxXGBS?mode=ac_t">
            <div className="grid place-content-center w-fit h-[56px] px-4 rounded-lg bg-blue-baby text-button16 text-white-custom font-button font-bold">
              Receber em primeira mão quando sair
            </div>
          </Link>
          <span className="text-start mt-2 text-sm12 text-black-custom font-normal">
            * Você será redirecionado para nossa comunidade ao clicar sobre o
            link.
          </span>
        </div>
      </div>
    </div>
  );
}
