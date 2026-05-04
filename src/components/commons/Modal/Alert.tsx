"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetStatus } from "@/models/movies/moviesSlice";
import { selectStatus } from "@/models/movies/selectors";
import { LoadingStatus } from "@/models/movies/types";

export default function Alert() {
  const { errorMessage, loadingStatus } = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingStatus !== LoadingStatus.Failed || !errorMessage) return;

    alert(errorMessage);
    dispatch(resetStatus());
  }, [errorMessage, loadingStatus, dispatch]);

  return <></>;
}
