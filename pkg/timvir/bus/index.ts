import { makeSubject, type Subject } from "wonka";
import type { Message } from "./messages";

export * from "./messages";

/**
 * The bus is a wonka Subject that represents a stream of Messages.
 */
export type Bus = Subject<Message>;

export const makeBus = () => makeSubject<Message>();

/**
 * Send a message to the bus.
 */
export function send<T>(bus: Bus, id: string, member: string, body: T) {
  bus.next({
    type: "INVOKE",
    path: `/dev/timvir/block/${id}`,
    interface: "dev.timvir.Props",
    member,
    body,
  });
}
