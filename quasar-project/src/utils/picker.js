import {pickerController} from "@ionic/vue";

export async function optionPicker(options, initial) {
    return await pickerController.create({
        columns: [
            {
                name: 'languages',
                options,
            },
        ],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
            },
            {
                text: 'Confirm',
                handler: (value) => {
                    window.alert(`You selected: ${value.languages.value}`);
                },
            },
        ],
    });
}

export async function numberPicker(min, max, initial, options, onConfirm = () => {}) {
    let pickerOptions = []

    for (let i = min; i <= max; i++) {
        pickerOptions.push({
            text: i,
            value: i,
        })
    }

    return pickerController.create({
        columns: [
            {
                name: 'number',
                options: pickerOptions,
            },
        ],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
            },
            {
                text: 'Confirm',
                handler: (value) => {
                    onConfirm(value.number.value)
                },
            },
        ],
    });
}