import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

const onSubmitAtom = atom<((data: Record<string, string>) => void) | undefined>(
  undefined
);
const formDataAtom = atom<Record<string, string>>({});

export function useFormOnSubmitProvider(
  onSubmit: (formData: Record<string, string>) => void
) {
  const setOnSubmit = useSetAtom(onSubmitAtom);

  useEffect(() => {
    setOnSubmit(() => onSubmit);
  }, [onSubmit]);
}

export function useFormOnSubmit() {
  const onSubmit = useAtomValue(onSubmitAtom);

  return { onSubmit };
}

export function useFormItem(name: string) {
  const [formData, setFormData] = useAtom(formDataAtom);

  const updateItem = useCallback(
    (value: string) => {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setFormData]
  );

  return {
    updateItem,
    item: formData[name],
  };
}

export function useFormData() {
  const [formData] = useAtom(formDataAtom);

  return { formData };
}
