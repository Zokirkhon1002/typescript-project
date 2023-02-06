import FullList from "../models/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement;
    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = "";
    }

    render(fullList: FullList): void {
        this.clear();
        fullList.list.forEach((item) => {
            // CREATING LI TAG STARTED
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";
            // CREATING LI TAG ENDED

            // CREATING INPUT CHECKBOX TAG STARTED
            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.checked = item.checked;
            li.appendChild(check)

            check.addEventListener("change", () => {
                item.checked = !item.checked;
                fullList.save();
            })
            // CREATING INPUT CHECKBOX TAG ENDED

            // CREATING LABEL TAG STARTED
            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.appendChild(label)
            // CREATING LABEL TAG ENDED

            // CREATING BUTTON TAG STARTED
            const button = document.createElement("button") as HTMLButtonElement;
            button.className = "button";
            button.textContent = "X";
            li.append(button)

            button.addEventListener("click", () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            })
            // CREATING BUTTON TAG ENDED

            // appending li into UL
            this.ul.appendChild(li);
        })
    }
}