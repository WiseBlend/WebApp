import { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export const Card = ({ title, children }: CardProps) => (
  <div className="bg-white my-4 rounded-lg">
    <h4 className="font-semibold text-2xl p-4 border-b border-b-gray-300">
      {title}
    </h4>
    <div className="p-4">{children}</div>
  </div>
);
