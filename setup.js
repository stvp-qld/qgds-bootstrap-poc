import fs from 'fs';

const components = [
    "accordion",
    "alert",
    "banner",
    "blockquote",
    "breadcrumbs",
    "button",
    "callout",
    "card",
    "carousel",
    "checkbox",
    "forms",
    "icons",
    "inpage-nav",
    "nav",
    "navbar",
    "pagination",
    "radio",
    "table",
    "typography"
];


prepFiles();


function prepFiles() {

    const prefix = "dxp";
    const targetDir = './src/components';

    components.forEach(async component => {
    
        //let filenameHTML = `${targetDir}/${component}/${component}.bs5.html`;
        let filenameJSON = `${targetDir}/${component}/data.json`;

        //let targetname = `${targetDir}/${component}/${component}.data.json`;
        //let contentstring = `<!-- QGDS Partial: ${component} -->`;

        try {
            await fs.promises.unlink(filenameJSON);
            console.log(`Deleted ${filenameJSON}`);
        } catch (err) {
            console.error(`Error copying file: ${err}`);
        }
    });
}
