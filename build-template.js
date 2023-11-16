/// DEV NOTE 
/// This build file is used for the demo/POC template rendering only
/// Full templating system to be planned and implemented in the future

import fs from "fs";
import mustache from "mustache";

// Will build from all HTML templates using {component}.{framework}.html filename convention
// For example /src/components/alert.${framework}.html
const framework = "bs5";

// Master templates
const ds = {
  
  layouts: {
    contentpage: fs.readFileSync("./src/layout/template/contentpage.html", "utf8"),
    landingpage: fs.readFileSync("./src/layout/template/landingpage.html", "utf8")
  },

  sections: {
    header: fs.readFileSync("./src/layout/header/header.html", "utf8"),
    footer: fs.readFileSync("./src/layout/footer/footer.html", "utf8"),
    inpagenav: '',
    breadcrumbs: '',
    sidenav: fs.readFileSync("./src/components/nav/sidenav-example.html", "utf8"),
  },

  makeComponent: (componentPath, customDataJSON = {}) => { 
    
    //Get HTML template at path
    let component = fs.readFileSync(`./src/components/${componentPath}.${framework}.html`, "UTF-8");
    
    // Merge the data.json object with the custom data object passed into the function.
    // Any user defined data in the custom data object will override the data.json object.
    let fileDataJSON = fs.readFileSync(`./src/components/${componentPath}.data.json`, "UTF-8");
    let parsedJSON = JSON.parse(fileDataJSON) || {};

    let data = { ...parsedJSON, ...customDataJSON };

    //Render the template, passing in a data object to populate any {{placeholders}}
    return mustache.render(component, data);
    //console.log(`Rendered ${component}, Data: ${fileDataJSON}`);
  },


  makeTemplate: function(options) {
  
    let content = fs.readFileSync(`./src/layout/content/${options.content}.html`, "UTF-8");

    let compiledHTML = mustache.render(
      this.layouts[options.layout], {
        header: options.header || this.sections.header,
        breadcrumbs: options.breadcrumbs || this.sections.breadcrumbs,
        sidenav: options.sidenav || this.sections.sidenav,
        footer: options.footer || this.sections.footer,
        main: mustache.render( content, options || {}),
        
        ...options
      }
    );

    fs.writeFileSync(`./dist/${options.outfile}`, compiledHTML);
    console.log(`Built template ./dist/${options.outfile}`);

  }
};


//Build a static content page with some components (card block and table)
ds.makeTemplate({
  layout      : "contentpage",
  content     : "main",
  outfile     : "index.html",
  PageHeading : "Register your vehicle or motorcycle",
  PageLead    : "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
  breadcrumbs : ds.makeComponent("breadcrumbs/breadcrumbs"),
    components  : {
    //name:      ds.makeComponent("folder/component")
    inpagenav   : ds.makeComponent("inpage-nav/inpage-nav"),
    accordion:  ds.makeComponent("accordion/accordion"),
    alert:      ds.makeComponent("alert/alert"), 
    button:     ds.makeComponent("button/button"),
    card:       ds.makeComponent("card/card"),
    cardblock:  ds.makeComponent("card/cardblock"),
    table:      ds.makeComponent("table/table"),
    callout:    ds.makeComponent("callout/callout", {
      "title": "This is a callout title",
      "description": "This is a callout description"
    }),
    blockquote: ds.makeComponent("blockquote/blockquote")
  }
});

//Build a static content page and apply a dark theme
// ds.makeTemplate({
//   layout      : "contentpage",
//   content     : "main",
//   outfile     : "index-dark.html",
//   PageHeading : "Register your vehicle or motorcycle",
//   PageLead    : "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
//   theme       : "dark",
//   components  : {
//     inpagenav:  ds.makeComponent("inpage-nav/inpage-nav"),
//     accordion:  ds.makeComponent("accordion/accordion"),
//     alert:      ds.makeComponent("alert/alert", {
//       classes: "alert-danger",
//       hlevel: function() { return "h2" },
//       title: "Road closure",
//       contnt: "The Bruce Highway is closed at <strong>Caloundara</strong> due to bushfire activity. <a href='#'>Find our more</a>."
//     }),
    
//     button: ds.makeComponent("button/button", {
//       class: "btn-outline-secondary",
//       isbutton: false,
//       islink: true,
//       href: "https://google.com",
//       label: "Call to action",
//       target: "_blank"
//     }),
    
//     cardblock: ds.makeComponent("card/cardblock"),
//     table: ds.makeComponent("table/table"),    
//     callout: ds.makeComponent("callout/callout", {
//       title: "This is a callout title",
//       description: "This is a callout description",
//     }),
    
//     blockquote: ds.makeComponent("blockquote/blockquote", {
//       title: "Custom blockquote title takes precenedce over data.json",
//       description: "Fees will increase from 1 July 2024. The new fees will be available on this page from 1 July 2024.",
//     }),

//     example: ds.makeComponent("_example/example")

//   }

// });

//Build a landing page with cards

// ds.makeTemplate({
//   layout      : "landingpage",
//   content     : "landing-with-cards",
//   outfile     : "landing.html",
//   components  : {
//     inpagenav:  ds.makeComponent("inpage-nav/inpage-nav"),
//     cardblock: ds.makeComponent("card/cardblock")
//   },
//   PageHeading : "Education and training",
//   PageLead    : "With dummy text you can view your website as it's supposed to look, without being distracted by familiar, readable text."
// })


//Build a landing page with cards with dark theme

// ds.makeTemplate({
//   layout      : "landingpage",
//   content     : "landing-with-cards",
//   outfile     : "landing-dark.html",
//   components  : {
//     inpagenav:  ds.makeComponent("inpage-nav/inpage-nav"),
//     cardblock: ds.makeComponent("card/cardblock", { 
//         cards: [{
//           "title" : "An article title takes precenedce over data.json",
//           "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
//           "image": "assets/img/ds-example-image-1.jpg",
//           "alt": "A photo of cliffs by the ocean with trees in the foreground",
//           "link": "https://web.dev",
//           "footer": "Updated 2 days ago"
//         },
//         {
//           "title" : "A longer article title",
//           "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
//           "image": "assets/img/ds-example-image-2.jpg",
//           "alt": "A photo of wheat in a field lit by soft sunlight",
//           "link": "https://web.dev",
//           "footer": "Updated 4 days ago"
//         },
//         {
//           "title" : "A topic headline",
//           "description": "This is a supporting text below.",
//           "image": "assets/img/ds-example-image-3.jpg",
//           "alt": "A photo of the base of Uluru at sunset",
//           "link": "https://web.dev",
//           "footer": "Updated last week"
//         }]
//     })
//   },
//   PageHeading : "Education and training",
//   PageLead    : "With dummy text you can view your website as it's supposed to look, without being distracted by familiar, readable text.",
//   theme       : "dark"
// })


//Build a landing page with cards with dark theme

// ds.makeTemplate({
//   layout      : "landingpage",
//   content     : "form-example",
//   outfile     : "form.html",
//   PageHeading : "Form or digital service example",
//   PageLead    : "Track the status of your permit application or renewal.",
//   components: {
//     inpagenav:  ds.makeComponent("inpage-nav/inpage-nav"),
//   }
// });


//Build a landing page with cards with dark theme
// ds.makeTemplate({
//   layout      : "contentpage",
//   content     : "components-all",
//   outfile     : "components.html",
//   PageHeading : "POC list of components",
//   PageLead    : "This page shows examples of all components.",
//   sidenav     : fs.readFileSync("./src/layout/content/sidenav-components.html", "utf8"),
//   inpagenav  : "",
//   components: {
//     cardblock: ds.makeComponent("card/cardblock"),
//     inpagenav:  ds.makeComponent("inpage-nav/inpage-nav"),
//   }
// });





// examplepages.map( ( obj ) => {
//   template.build(obj)
//   console.log( `./dist/${obj.outfile} built.`);
// });


console.log(`HTML template builds completed\n===============================\n`);