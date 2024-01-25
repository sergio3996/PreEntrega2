import MessageService from "../services/message.service.js";

export const getMessages = async () => {
  const messages = await MessageService.get();
  return messages;
};

export const newMessage = async (data) => {
  return await MessageService.newMessage(data);
};
