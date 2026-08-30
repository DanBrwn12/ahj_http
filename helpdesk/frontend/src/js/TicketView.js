/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(ticket) {
    this.ticket = ticket;
  }

  create() {
    const ticketEl = document.createElement('div');
    ticketEl.classList.add('ticket');

    ticketEl.innerHTML = `
      <input type="checkbox" class="checkbox">
      <div class="ticket-name"></div>
      <div class="ticket-created"></div>
      <button class="edit-btn"></button>
      <button class="delete-btn"></button>
    `;

    const checkboxEl = ticketEl.querySelector('.checkbox');
    checkboxEl.checked = this.ticket.status;

    const ticketNameEl = ticketEl.querySelector('.ticket-name');
    ticketNameEl.textContent = this.ticket.name;

    const createdEl = ticketEl.querySelector('.ticket-created');
    createdEl.textContent = new Date(this.ticket.created).toLocaleString();

    const editBtnEl = ticketEl.querySelector('.edit-btn');
    editBtnEl.textContent = '✎';

    const deleteBtnEl = ticketEl.querySelector('.delete-btn');
    deleteBtnEl.textContent = 'X';


    return ticketEl;
  }

}
