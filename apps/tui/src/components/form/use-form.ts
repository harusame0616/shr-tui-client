import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

const onSubmitAtom = atom<((data: Record<string, string>) => void) | undefined>(
  undefined
);
const formDataAtom = atom<Record<string, string>>({});

export function useFormOnSubmitProvider(
  onSubmit: (formData: Record<string, string>) => void,
  initialValues: Record<string, string>
) {
  const setOnSubmit = useSetAtom(onSubmitAtom);
  const setFormData = useSetAtom(formDataAtom);

  useEffect(() => {
    setOnSubmit(() => onSubmit);
    setFormData(initialValues);
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
