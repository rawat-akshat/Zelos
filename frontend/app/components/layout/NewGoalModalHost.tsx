"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NewGoalModal from "../features/NewGoalModal";
import { useWorkspace } from "../../context/WorkspaceContext";

export default function NewGoalModalHost() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { newGoalModalOpen, openNewGoalModal, closeNewGoalModal, startNewGoal } =
    useWorkspace();
  const openedFromQuery = useRef(false);

  useEffect(() => {
    if (searchParams.get("newGoal") === "1") {
      if (!openedFromQuery.current) {
        openedFromQuery.current = true;
        openNewGoalModal();
      }
    } else {
      openedFromQuery.current = false;
    }
  }, [searchParams, openNewGoalModal]);

  const handleClose = () => {
    closeNewGoalModal();
    if (searchParams.get("newGoal") === "1") {
      router.replace(pathname);
    }
  };

  return (
    <NewGoalModal
      open={newGoalModalOpen}
      onClose={handleClose}
      onCreate={startNewGoal}
    />
  );
}
