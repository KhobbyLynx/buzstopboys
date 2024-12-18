// custom.d.ts
import { CardProps as OriginalCardProps } from "@material-tailwind/react";

declare module "@material-tailwind/react" {
  export interface CardProps extends Omit<OriginalCardProps, 'requiredProp1' | 'requiredProp2'> {
    requiredProp1?: string;
    requiredProp2?: string;
  }
}
