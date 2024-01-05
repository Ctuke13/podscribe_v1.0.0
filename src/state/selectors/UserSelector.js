import { selector } from "recoil";
import { useAuth } from "../../contexts/AuthContext";
// import { podcastNameState } from "./";

export const userUidSelector = selector({
  key: "userUidSelector",
  get: async ({ get }) => {
    const { currentUser } = get(useAuth);
    return currentUser ? currentUser.uid : null; // Return the uid or null if not authenticated
  },
});
