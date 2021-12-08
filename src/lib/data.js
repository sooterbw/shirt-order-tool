const fs = require('fs');

let appData = process.env.APPDATA + '/t-forms';
let dataFile = appData + '/forms.json'


let exampleForm = {
    "options": {
        "sizes": {
            "youth": [
                "small", "medium", "large"
            ],
            "adult": [
                "small", "medium", "large",
                "XL", "XXL", "XXXL"
            ]
        },
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
            "orders": [
                {
                    "name": "John Doe",
                    "order": {
                        "adult": {
                            "small": 1,
                            "medium": 2
                        }
                    }
                },
                {
                    "name": "Jill Johnson",
                    "order": {
                        "adult": {
                            "small": 1,
                            "medium": 2,
                            "XL": 1
                        }
                    }
                }
            ]
        }
    ]
}

export function checkData () {
    if (!fs.existsSync(appData)) {
        fs.mkdirSync(appData)
    }
    if (!fs.existsSync(dataFile)) {
        let data = JSON.stringify(exampleForm);
        fs.writeFile(dataFile, data, "utf-8", (error, data) => {
            if(error) {
                console.error("error: " + error)
            }
        })
    }
}

export function getFormData() {
    let data = {};
    if (fs.existsSync(dataFile)) {
        data = fs.readFileSync(dataFile, {encoding:'utf-8'});
    }
    return data;
}

export function updateFormData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data), "utf-8", (error) => {
        if(error) {
            console.error("error: " + error)
        }
    })
    console.log('updated')
}
