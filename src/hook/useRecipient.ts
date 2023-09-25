import { AppUser, Conversation } from "@/types/model";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { getRecipientEmail } from "@/utils/getRecipientEmail";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const useRecipient = (conversationUsers: Conversation["users"]) => {
  const [loggedInUser, _loadding, _error] = useAuthState(auth);

  //getRecipientEmail
  const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser);

  //getRecipientAvatar

  const queryGetRecipient = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );

  const [recipientSnapshot, __loadding, __error] =
    useCollection(queryGetRecipient);

  const recipient =recipientSnapshot?.docs[0]?.data() as AppUser |undefined;
  return {
    recipientEmail,
    recipient
  };
};
