export class ListElement {
  isEdit = false
  currentEditedToDo = {}

  constructor(listElement, data) {
    this.listElement = listElement
    this.data = data
    this.init()
  }
  init() {
    this.handleChange = this.handleChange.bind(this)
    this.handleClickRemoveButton = this.handleClickRemoveButton.bind(this)
    this.handleClickEditButton = this.handleClickEditButton.bind(this)
    this.handleClickCancelEditButton = this.handleClickCancelEditButton.bind(this)
    this.handleRenderNeed = this.handleRenderNeed.bind(this)
    this.handleFormEditSubmit = this.handleFormEditSubmit.bind(this)

    window.addEventListener('render:need', this.handleRenderNeed)
    this.listElement.addEventListener('change', this.handleChange)
    this.listElement.addEventListener('click', this.handleClickRemoveButton)
    this.listElement.addEventListener('click', this.handleClickEditButton)
    this.listElement.addEventListener('click', this.handleClickCancelEditButton)
    this.listElement.addEventListener('submit', this.handleFormEditSubmit)
    
    const event = new Event('list:ready')
    window.dispatchEvent(event)
  }

  handleChange(event) {
    const { target } = event
    const { id, checked, type } = target

    if (type !== 'checkbox') return

    console.log(target.dataset)

    this.data.forEach((item) => {
      if (item.id == id) {
        item.isChecked = checked
      }
    })

    this.render()
  }


  handleChange(event) {
    const { target } = event
    const { id, checked, type } = target

    if (type !== 'checkbox') return

    console.log(target.dataset)

    this.data.forEach((item) => {
      if (item.id == id) {
        item.isChecked = checked
      }
    })

    this.render()
  }

  handleClickRemoveButton(event) {

    const role = event.target.getAttribute('data-role')
    const id = event.target.getAttribute('data-id')

    if (role == 'remove') {
      this.data = this.data.filter((item) => {

        return item.id != id
      })

      this.render()
    }
  }

  handleClickEditButton(event) {
    const { target } = event
    const { role, id } = target.dataset

    if (role == 'edit') {
      if (this.isEdit == true) {
        alert('?????? ??????????????????????????')
        return
      }

      this.data.forEach((item) => {
        if (item.id == id) {
          this.currentEditedToDo = item
          const { parentElement } = target
          const formEditElement = this.formEditTemplate(item)

          parentElement.outerHTML = formEditElement
          this.isEdit = true
        }
      })
    }
  }

  handleClickCancelEditButton(event) {
    const { role } = event.target.dataset

    if (role == 'cancelEdit') {
      this.render()
      this.isEdit = false
    }
  }

  handleFormEditSubmit(event) {
    event.preventDefault()
    const { target } = event
    const { role, id } = target.dataset

    if (role == 'editForm') {
      const content = target.querySelector('[name="content"]').value
      console.log(content)
      this.currentEditedToDo.content = content
      console.log(this.currentEditedToDo)

      this.render()
      this.isEdit = false
    }
  }

  handleRenderNeed() {
    this.render()
  }
  createToDoTemlate({ id, content, isChecked }) {
    const checkedAttr = isChecked ? 'checked' : ''

    const template = `
      <div class="island_item d-flex ${checkedAttr}">
          <div class="form-check form-check-lg">
            <input class="form-check-input" ${checkedAttr} type="checkbox" id="${id}" >
            <label class="form-check-label " for="${id}">${content}</label>
          </div>
  
            <button type="button" data-role = "edit" data-id = "${id}" class="btn btn-sm btn-primary ms-auto"> 
            <svg class="pe-none" width="16" height="16"><use href="#pencil"/></svg> 
            </button>
            <button type="button" data-role = "remove" data-id = "${id}" class="btn btn-sm btn-danger ms-3"> 
            <svg class="pe-none" width="16" height="16"><use href="#trash"/></svg> 
            </button>
          
          </div>
          `
    return template
  }


  formEditTemplate({ content }) {

    const template = `
        <div class="island_item" id="formEditContainer">
          <form class="d-flex" data-role="editForm">
            <div class="flex-grow-1">
              <input type="text" class="form-control form-control-sm" name="content" placeholder="?????????????? ????????????" required value=${content}>
            </div>
            <div class="ms-3">
              <button type="submit" class="btn btn-sm btn-success">
                <svg class="pe-none" width="16" height="16"><use href="#save"/></svg>
              </button>
              <button type="button" data-role="cancelEdit" class="btn btn-sm btn-warning ms-3 ">
                <svg class="pe-none" width="16" height="16"><use href="#cancel"/></svg>
              </button>
            </div>
          </form>
        </div>
        `
    return template
  }


  createToDoElements() {
    let result = ''
    this.data.forEach((toDo) => {
      result = result + this.createToDoTemlate(toDo)
    })
    return result
  }

  render() {
    const toDoElements = this.createToDoElements()
    this.listElement.innerHTML = toDoElements
  }

}
