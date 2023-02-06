import './styles/style.css';
import FullList from './models/FullList';
import ListItem from './models/ListItem';
import ListTemplate from './templates/ListTemplate';


const initApp = (): void => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault();

        const input = document.getElementById("newItem") as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        if (!newEntryText.length) {
            alert("input can be empty!")
            return;
        }

        const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id)+1 : 1;
        const newItem: ListItem = new ListItem(itemId.toString(), newEntryText);
        
        input.value = "";

        fullList.addItem(newItem);
        template.render(fullList);
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;

    clearItems.addEventListener("click", (): void => {
        fullList.clearList();
        template.clear();
    })

    fullList.load();
    template.render(fullList);
}

document.addEventListener("DOMContentLoaded", initApp)