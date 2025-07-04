import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

const onSubmitAtom = atom<(() => void) | undefined>(undefined);

export function useFormOnSubmitProvider(onSubmit: () => void) {
  const setOnSubmit = useSetAtom(onSubmitAtom);

  useEffect(() => {
    setOnSubmit(() => onSubmit);
  }, [onSubmit]);
}

export function useFormOnSubmit() {
  const onSubmit = useAtomValue(onSubmitAtom);

  return { onSubmit };
}
