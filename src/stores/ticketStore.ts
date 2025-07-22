import { hookstate } from '@hookstate/core';

export const ticketStore = hookstate({
  //   Companies list
  tickets: [],
  AllTickets: [],
  ticketThreads: [],
  ticketCollaborators: []
});
