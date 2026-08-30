import TicketForm from "./TicketForm";
import TicketView from "./TicketView";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  async init() {
    console.info('init');
    await this.renderTickets();
  }
  
  async renderTickets() {
    const ticketList = await this.ticketService.list();
    this.container.innerHTML = '';

    for (const ticket of ticketList) {
      const ticketView = new TicketView(ticket);
      const ticketEl = ticketView.create();
      this.addTicketListeners(ticketEl, ticket);

      this.container.append(ticketEl);      
    }

    this.renderAddButton();
  }

  addTicketListeners(ticketEl, ticket) {
    const editBtn = ticketEl.querySelector('.edit-btn');
    const deleteBtn = ticketEl.querySelector('.delete-btn');
    const checkbox = ticketEl.querySelector('.checkbox');

    editBtn.addEventListener('click', () => {
      this.openForm('edit', ticket);
    });

    deleteBtn.addEventListener('click', async () => {
      const form = new TicketForm();
      const confirmEl = form.showDeleteConfirm(ticket);

      this.container.append(confirmEl);
      
      confirmEl.querySelector('.cancel-btn').addEventListener('click', () => {
        confirmEl.remove();
      });
      
      confirmEl.querySelector('.ok-btn').addEventListener('click', async () => {
        await this.ticketService.delete(ticket.id);
        confirmEl.remove();
        await this.renderTickets();
      
      });

    });

    checkbox.addEventListener('change', async (event) => {
      const status = event.target.checked;
      await this.ticketService.update(ticket.id, { status });
      await this.renderTickets();
    });

    ticketEl.addEventListener('click', async (event) => {
      const isButton = event.target.closest('.edit-btn, .delete-btn, .checkbox');
      if (isButton) return;

      const fullTicket = await this.ticketService.get(ticket.id);
      
      const existingDesc = ticketEl.querySelector('.ticket-description');
      if (existingDesc) {
        existingDesc.remove();
        return;
      }

      const descEl = document.createElement('div');
      descEl.classList.add('ticket-description');
      descEl.textContent = fullTicket.description || 'Нет описания';

      ticketEl.append(descEl);
    });
  }
  
  renderAddButton() {
    const addTicketBtn = document.createElement('button');
    addTicketBtn.textContent = 'Добавить тикет';
    addTicketBtn.classList.add('add-ticket');

    addTicketBtn.addEventListener('click', () => {
      this.openForm();
    })
    
    this.container.prepend(addTicketBtn);
  }

  openForm(mode = 'create', ticket = null) {
    const form = new TicketForm();
    const formEl = form.showform(mode, ticket);

    this.container.append(formEl);

    const cancelBtn = formEl.querySelector('.cancel-btn');
    const okBtn = formEl.querySelector('.ok-btn');
    const shortInput = formEl.querySelector('.short-input');
    const fullInput = formEl.querySelector('.full-input');

    cancelBtn.addEventListener('click', () => {
      formEl.remove();
    });

    okBtn.addEventListener('click', async () => {
      const name = shortInput.value.trim();
      const description = fullInput.value.trim();

      if (!name) return;

      if (mode === 'create') {
        await this.ticketService.create({name, description});
      } else if (mode === 'edit' && ticket) {
        await this.ticketService.update(ticket.id, { name, description});
      }

      formEl.remove();
      await this.renderTickets();

    })
  }

}
