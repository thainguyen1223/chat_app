import { DocumentData, QueryDocumentSnapshot, Timestamp, collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IMessage } from "@/types/model";


export const generateQueryGetMessages = (conversationId?: string) =>
	query(
		collection(db, 'messages'),
		where('conversation_id', '==', conversationId),
		orderBy('sent_at' ,'asc'),
	)


export const transformMessage =(message: QueryDocumentSnapshot<DocumentData>) => ({
	id:message.id,
	...message.data(), // spread out conversation id , text
	sent_at :message.data().sent_at ? conversationFirestoreTimestampToString((message.data().sent_at as Timestamp)) :null
}) as IMessage

export const conversationFirestoreTimestampToString =(timestamp :Timestamp) => new Date(timestamp.toDate().getTime()).toLocaleString() 