import Sidebar from "@/components/Sidebar";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { auth, db } from "../../../config/firebase";
import { Conversation, IMessage } from "@/types/model";
import { getRecipientEmail } from "@/utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  generateQueryGetMessages,
  transformMessage,
} from "@/utils/getMesssagesInConversation";
import ConversationScreen from "@/components/ConversationScreen";

const StyledContainer = styled.div`
  display: flex;
`;

const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  -webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

interface Props {
  conversation: Conversation;
  messages: IMessage[];
}

const Conversation = ({ conversation, messages }: Props) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  return (
    <StyledContainer>
      <Head>
        <title>
          Conversation with{" "}
          {getRecipientEmail(conversation.users, loggedInUser)}
        </title>
      </Head>

      <Sidebar />
      <StyledConversationContainer>
        <ConversationScreen conversation ={conversation} messages ={messages}></ConversationScreen>
      </StyledConversationContainer>
    </StyledContainer>
  );
};

export default Conversation;

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (connext) => {
  const conversationId = connext.params?.id;

  const conversationRef = doc(db, "conversations", conversationId as string);
  const conversationSnapshot = await getDoc(conversationRef);

  // get all messages between logged in user and recipient in this conversation
  const queryMessages = generateQueryGetMessages(conversationId);

  const messagesSnapshot = await getDocs(queryMessages);
  const messages = messagesSnapshot.docs.map((messageDoc) =>
    transformMessage(messageDoc)
  );
  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messages,
    },
  };
};
