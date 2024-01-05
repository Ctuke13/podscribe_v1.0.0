import { atom } from "recoil";
import { userUidSelector } from "../selectors/UserSelector";

export const podcastNameState = atom({
  key: "podcastNameState",
  default: "", // Initialize with an empty string
});

export const userState = atom({
  key: "userState",
  default: {}, // Initialize with an empty object
  //
});
