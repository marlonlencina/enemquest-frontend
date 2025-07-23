"use client";

import { IconifyIcon } from "@iconify/react/dist/iconify.js";
import IconButton from "./IconButton";
import TextButton from "./TextButton";

interface IconButtonConfig {
  type: "icon";
  iconName: string | IconifyIcon;
  onClick: () => void;
}

interface TextButtonConfig {
  type: "text";
  text: string;
  onClick: () => void;
  color?: string;
}

type ButtonConfig = IconButtonConfig | TextButtonConfig;

interface ListActionsProps {
  iconButtons?: IconButtonConfig[];
  textButtons?: TextButtonConfig[];
}

export default function ListActions({ iconButtons = [], textButtons = [] }: ListActionsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {iconButtons.map((button, index) => (
          <IconButton 
            key={index}
            onClick={button.onClick} 
            iconName={button.iconName} 
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {textButtons.map((button, index) => (
          <TextButton 
            key={index}
            onClick={button.onClick} 
            text={button.text}
            color={button.color}
          />
        ))}
      </div>
    </div>
  );
}