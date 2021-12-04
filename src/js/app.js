import "../css/style.css"
import { Storage } from './storage'
import { TodoFormCreate } from "./todoFormCreate"
import { ListElement } from "./listElement"




const formCreateElement = document.querySelector('#formCreate')
const listElement = document.querySelector('#list')

const storage = new Storage()
const data = storage.data

new TodoFormCreate(formCreateElement, data)
new ListElement(listElement, data)