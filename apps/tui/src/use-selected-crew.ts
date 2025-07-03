import { atom, useAtom } from "jotai";

const selectedCrewIdAtom = atom<string | null>(null);

export function useSelectedCrew() {
  const [selectedCrewId, setSelectedCrewId] = useAtom(selectedCrewIdAtom);

  return {
    selectedCrewId,
    setSelectedCrewId,
  };
}
