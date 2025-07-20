"use client";

import { useState } from "react";
import Button from "./Button";

interface GabaritoSectionProps {
  gabarito: string;
}

export default function GabaritoSection({ gabarito }: GabaritoSectionProps) {
  const [showGabarito, setShowGabarito] = useState(false);

  const handleToggleGabarito = () => {
    setShowGabarito(!showGabarito);
  };

  return (
    <div className="p-6 border-t border-gray-200-custom">
      <h5 className="font-head text-body16 font-semibold text-black-custom mt-4">
        Alternativas
      </h5>
      <div className="w-full flex items-center justify-around gap-6 mt-6">
        {["A", "B", "C", "D", "E"].map((option) => (
          <div
            key={option}
            className={`cursor-pointer h-12 w-12 rounded-full grid place-content-center ${
              showGabarito && option === gabarito
                ? "bg-green-500 text-white"
                : "bg-gray-200-custom"
            }`}
          >
            <span>{option}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant={showGabarito ? "secondary" : "primary"}
          onClick={handleToggleGabarito}
        >
          {showGabarito ? "Ocultar gabarito" : "Ver gabarito"}
        </Button>
      </div>
    </div>
  );
}
