import { atom, useAtom } from "jotai";

const selectedUserIdAtom = atom<string | null>(null);

export function useSelectedUser(): {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
} {
  const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom);

  return {
    selectedUserId,
    setSelectedUserId,
  };
}
