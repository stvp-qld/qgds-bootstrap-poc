import fs from "fs";
import mustache from "mustache";

// Master templates
const template = {
  layouts: {
    contentpage: fs.readFileSync("./src/contentpage.html", "utf8"),
    landingpage: fs.readFileSync("./src/landingpage.html", "utf8")
  },
  partials: {
    header: fs.readFileSync("./src/partials/header.html", "utf8"),
    breadcrumbs: fs.readFileSync("./src/partials/breadcrumbs.html", "utf8"),
    sidenav: fs.readFileSync("./src/partials/sidenav.html", "utf8"),
    inpagenav: fs.readFileSync("./src/partials/inpagenav.html", "utf8"),
    footer: fs.readFileSync("./src/partials/footer.html", "utf8")
  },
  build: function(options) {
    
    console.log(options);

    let compiledHTML = mustache.render(
        this.layouts[options.layout], 
        {
            header: options.header || this.partials.header,
            breadcrumbs: options.breadcrumbs || this.partials.breadcrumbs,
            sidenav: options.sidenav || this.partials.sidenav,
            inpagenav: options.inpagenav || this.partials.inpagenav,
            footer: options.footer || this.partials.footer,
            main: mustache.render(options.main, options.data || {}),
            ...options
      }
    );

    fs.writeFileSync(`./dist/${options.filename}`, compiledHTML);
  }
};

export default template;

// Default content
//const main = fs.readFileSync("./src/partials/main.html", "utf8");

// Function to build and export a HTML template file
// function buildTemplatePage(config) {
    
//     const main = fs.readFileSync(`./src/partials/${config.partial}.html`, "utf8");

// 	const compiledHTML = mustache.render(
//         layouts[config.layout], {
// 		    header,
// 		    breadcrumbs,
// 		    sidenav,
// 		    inpagenav,
// 		    footer,
// 		    main: mustache.render(main, config),
//             ...config
// 	});

// 	fs.writeFileSync(`./dist/${config.filename}`, compiledHTML);
// }

//const pages = [
    // {
    //     layout      : "contentpage",
	//     partial     : "main",
	//     filename    : "index.html",
	//     PageHeading : "Register your vehicle or motorcycle",
	//     PageLead    : "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
    //     theme       : "light"
    // },
    // {
    //     layout      : "contentpage",
	//     partial     : "main",
	//     filename    : "index-dark.html",
	//     PageHeading : "Register your vehicle or motorcycle",
	//     PageLead    : "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
    //     theme       : "dark"
    // },
//     {
//         layout      : "landingpage",
//         partial     : "cards",
//         cards       : [
//             {
//                 "title" : "An article title",
//                 "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
//                 "image": "https://picsum.photos/id/89/450/254"    
//             },
//             {
//                 "title" : "A longer article title that wraps over two lines",
//                 "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
//                 "image": "https://picsum.photos/id/120/450/254"
//             },
//             {
//                 "title" : "A topic headline",
//                 "description": "This is a supporting text below.",
//                 "image": "https://picsum.photos/id/46/450/254"
//             }
//         ],
// 	    filename    : "landing.html",
// 	    PageHeading : "Education and training",
// 	    PageLead    : "",
//         theme       : "light",
//     }
// ];

//pages.map( ( obj ) => buildTemplatePage(obj) );

// Write the final HTML to an output file
//fs.writeFileSync('./dist/index.html', finalHTML);

console.log("HTML build completed.");
