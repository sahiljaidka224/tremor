import { Icon as IconComponent } from "components/icon-elements";
import React from "react";
import { tremorTwMerge } from "lib";

interface NavButtonProps {
  onClick: () => void;
  icon: React.ElementType;
}

export const NavButton = ({ onClick, icon }: NavButtonProps) => {
  const Icon = icon;
  return (
    <IconComponent
      className={tremorTwMerge(
        "flex items-center justify-center p-1 h-7 w-7 outline-none focus:ring-2 transition duration-100 border border-tremor-border dark:border-dark-tremor-border hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted rounded-tremor-small focus:border-tremor-brand-subtle select-none cursor-pointer dark:focus:border-dark-tremor-brand-subtle focus:ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted text-tremor-content-subtle dark:text-dark-tremor-content-subtle hover:text-tremor-content dark:hover:text-dark-tremor-content",
      )}
      onClick={onClick}
      icon={Icon}
      variant="shadow"
      size="xs"
    />
  );
};