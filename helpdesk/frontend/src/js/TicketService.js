/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import createRequest from "./api/createRequest";

const BASE_URL = 'https://ahj-http-nt0a.onrender.com';

export default class TicketService {
  list() {
    return createRequest({
      url: `${BASE_URL}?method=allTickets`,
    });
  }

  get(id) {
    return createRequest({
      url: `${BASE_URL}?method=ticketById&id=${id}`,
    });
  }

  create(data) {
    return createRequest({
      url: `${BASE_URL}?method=createTicket&id`,
      method: 'POST',
      data,
    });
  }

  update(id, data) {
    return createRequest({
      url: `${BASE_URL}?method=updateById&id=${id}`,
      method: 'POST',
      data,
    });
  }

  delete(id) {
    return createRequest({
      url: `${BASE_URL}?method=deleteById&id=${id}`,

    });
  }
}
