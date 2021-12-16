const fs = require('fs');

let appData = process.env.APPDATA + '/t-forms';
let dataFile = appData + '/forms.json'

let exampleForm = {
    "options": {
        "sizes": [
            "YS", "YM", "YL",
            "AS", "AM", "AL",
            "AXL", "AXXL", "AXXXL"
        ],
        "types": [
            {
                "name": "Long Sleeve",
                "price": 18
            },
            {
                "name": "Short Sleeve",
                "price": 14
            }
        ]
    },
    "forms": [
        {
            "name": "Example Form",
            "paid": false,
            "orders": [
                {
                    "name": "John Doe",
                    "subtotal": 54,
                    "order": [
                        {
                            "quantity": 1,
                            "type": "Long Sleeve",
                            "size": "AS"
                        },
                        {
                            "quantity": 2,
                            "type": "Long Sleeve",
                            "size": "AL"
                        }
                    ]
                },
                {
                    "name": "Jill Johnson",
                    "paid": false,
                    "subtotal": 72,
                    "order": [
                        {
                            "quantity": 1,
                            "type": "Long Sleeve",
                            "size": "YS"
                        },
                        {
                            "quantity": 2,
                            "type": "Short Sleeve",
                            "size": "AL"
                        },
                        {
                            "quantity": 1,
                            "type": "Long Sleeve",
                            "size": "AXL"
                        },
                    ]
                }
            ]
        }
    ]
}

export function getFormData () {
    let data = JSON.stringify(exampleForm);
    if (!fs.existsSync(appData)) {
        fs.mkdirSync(appData)
    }
    if (!fs.existsSync(dataFile)) {
        fs.writeFile(dataFile, data, "utf-8", (error, data) => {
            if(error) {
                console.error("error: " + error)
            }
        })
    } else {
        data = fs.readFileSync(dataFile, {encoding:'utf-8'});
    }
    return JSON.parse(data)
}

export function updateFormData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data), "utf-8", (error) => {
        if(error) {
            console.error("error: " + error)
        }
    })
}
