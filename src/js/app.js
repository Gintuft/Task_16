import "../css/style.css"
import { TodoFormCreate } from "./todoFormCreate"
import { ListElement } from "./listElement"


let data = []
const listElement = document.querySelector('#list')
const formCreateElement = document.querySelector('#formCreate')
new TodoFormCreate(formCreateElement, data)
new ListElement(listElement, data)