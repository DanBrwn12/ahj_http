/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  showform(mode, ticket) {
    const title = mode === 'edit' ? 'Изменить тикет' : 'Добавить тикет';
    
    const formEl = document.createElement('div');
    formEl.classList.add('ticket-form');

    formEl.innerHTML = `
    <h1>${title}</h1>
    <label>Краткое описание</label>
    <input type="text" class="short-input">
    <label>Подробное описание</label>
    <textarea class="full-input"></textarea>
    <div class="form-buttons">
      <button class="cancel-btn">Отмена</button>
      <button class="ok-btn">ОК</button>
    </div>`;

    const shortInput = formEl.querySelector('.short-input');
    const fullInput = formEl.querySelector('.full-input');

    if (mode === 'edit' && ticket) {
      shortInput.value = ticket.name;
      fullInput.value = ticket.description || '';
    }

    return formEl;
  }

  showDeleteConfirm(ticket) {
    const formEl = document.createElement('div');
    formEl.classList.add('ticket-form', 'delete-confirm');

    formEl.innerHTML = `
      <h1>Удалить тикет</h1>
      <p class="delete-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
      <div class="form-buttons">
        <button class="cancel-btn">Отмена</button>
        <button class="ok-btn">ОК</button>
      </div>
    `;

    return formEl;
  }
}
