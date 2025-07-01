import { atom, useAtom } from "jotai";

export const Display = {
  Main: "main",
  AccountAddition: "account_addition",
} as const;
type Display = (typeof Display)[keyof typeof Display];

const displayAtom = atom<Display>(Display.Main);
export function useDisplay() {
  const [display, setDisplay] = useAtom(displayAtom);

  return { display, setDisplay };
}
