import fs from "fs";
import mustache from "mustache";

// Master templates
const ds = {
  
  layouts: {
    contentpage: fs.readFileSync("./src/global/layout/template/contentpage.mustache", "utf8"),
    landingpage: fs.readFileSync("./src/global/layout/template/landingpage.mustache", "utf8")
  },

  partials: {
    header: fs.readFileSync("./src/global/layout/header/header.mustache", "utf8"),
    footer: fs.readFileSync("./src/global/layout/footer/footer.mustache", "utf8"),
    breadcrumbs: fs.readFileSync("./src/components/breadcrumbs/breadcrumbs.mustache", "utf8"),
    sidenav: fs.readFileSync("./src/components/nav/sidenav.mustache", "utf8"),
    inpagenav: fs.readFileSync("./src/components/inpage-nav/inpagenav.mustache", "utf8"),
  },

  makeComponent: (path, data) => mustache.render(fs.readFileSync(`./src/components/${path}`, "utf8"), data),

  makeTemplate: function(options) {
  
    let content = fs.readFileSync(`./src/global/layout/content/${options.content}.mustache`, "UTF-8");

    let compiledHTML = mustache.render(
      this.layouts[options.layout], {
        header: options.header || this.partials.header,
        breadcrumbs: options.breadcrumbs || this.partials.breadcrumbs,
        sidenav: options.sidenav || this.partials.sidenav,
        inpagenav: options.inpagenav || this.partials.inpagenav,
        footer: options.footer || this.partials.footer,
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
  components  : {
    cardblock: ds.makeComponent("cards/cards-block.mustache", { 
        cards: [{
          "title" : "An article title",
          "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
          "image": "assets/img/ds-example-image-1.jpg",
          "alt": "A photo of cliffs by the ocean with trees in the foreground",
          "link": "https://web.dev",
          "footer": false
        },
        {
            "title" : "A longer article title",
            "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
            "image": "assets/img/ds-example-image-2.jpg",
            "alt": "A photo of wheat in a field lit by soft sunlight",
            "link": "https://web.dev",
            "footer": false
        },
        {
            "title" : "A topic headline",
            "description": "This is a supporting text below.",
            "image": "assets/img/ds-example-image-3.jpg",
            "alt": "A photo of the base of Uluru at sunset",
            "link": "https://web.dev",
            "footer": false
        }]
    }),
    table: ds.makeComponent("tables/table.mustache", {}),
    callout: ds.makeComponent("callout/callout.mustache", {
      title: "This is a callout title",
      description: "This is a callout description",
    }),
    blockquote: ds.makeComponent("blockquote/blockquote.mustache", {
      title: "Blockquote title",
      description: "Fees will increase from 1 July 2024. The new fees will be available on this page from 1 July 2024.",
    })
  }
});

//Build a static content page and apply a dark theme
ds.makeTemplate({
  layout      : "contentpage",
  content     : "main",
  outfile     : "index-dark.html",
  PageHeading : "Register your vehicle or motorcycle",
  PageLead    : "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
  theme       : "dark",
  components  : {
    cardblock: ds.makeComponent("cards/cards-block.mustache", { 
        cards: [{
          "title" : "An article title",
          "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
          "image": "assets/img/ds-example-image-1.jpg",
          "alt": "A photo of cliffs by the ocean with trees in the foreground",
          "link": "https://google.com",
          "footer": false
        },
        {
            "title" : "A longer article title",
            "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
            "image": "assets/img/ds-example-image-2.jpg",
            "alt": "A photo of wheat in a field lit by soft sunlight",
            "link": "https://web.dev",
            "footer": false
        },
        {
            "title" : "A topic headline",
            "description": "This is a supporting text below.",
            "image": "assets/img/ds-example-image-3.jpg",
            "alt": "A photo of the base of Uluru at sunset",
            "link": "https://web.dev",
            "footer": false
        }]
    }),
    table: ds.makeComponent("tables/table.mustache", {})
  }
});

//Build a landing page with cards
ds.makeTemplate({
  layout      : "landingpage",
  content     : "landing-with-cards",
  outfile     : "landing.html",
  components  : {
    cardblock: ds.makeComponent("cards/cards-block.mustache", { 
        cards: [{
          "title" : "An article title",
          "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
          "image": "assets/img/ds-example-image-1.jpg",
          "alt": "A photo of cliffs by the ocean with trees in the foreground",
          "link": "https://web.dev",
          "footer": "Updated 2 days ago"
        },
        {
            "title" : "A longer article title",
            "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
            "image": "assets/img/ds-example-image-2.jpg",
            "alt": "A photo of wheat in a field lit by soft sunlight",
            "link": "https://web.dev",
            "footer": "Updated 4 days ago"
        },
        {
            "title" : "A topic headline",
            "description": "This is a supporting text below.",
            "image": "assets/img/ds-example-image-3.jpg",
            "alt": "A photo of the base of Uluru at sunset",
            "link": "https://web.dev",
            "footer": "Updated last week"
        }]
    })
  },
  PageHeading : "Education and training",
  PageLead    : "With dummy text you can view your website as it's supposed to look, without being distracted by familiar, readable text."
})


//Build a landing page with cards with dark theme
ds.makeTemplate({
  layout      : "landingpage",
  content     : "landing-with-cards",
  outfile     : "landing-dark.html",
  components  : {
    cardblock: ds.makeComponent("cards/cards-block.mustache", { 
        cards: [{
          "title" : "An article title",
          "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
          "image": "assets/img/ds-example-image-1.jpg",
          "alt": "A photo of cliffs by the ocean with trees in the foreground",
          "link": "https://web.dev",
          "footer": "Updated 2 days ago"
        },
        {
            "title" : "A longer article title",
            "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
            "image": "assets/img/ds-example-image-2.jpg",
            "alt": "A photo of wheat in a field lit by soft sunlight",
            "link": "https://web.dev",
            "footer": "Updated 4 days ago"
        },
        {
            "title" : "A topic headline",
            "description": "This is a supporting text below.",
            "image": "assets/img/ds-example-image-3.jpg",
            "alt": "A photo of the base of Uluru at sunset",
            "link": "https://web.dev",
            "footer": "Updated last week"
        }]
    })
  },
  PageHeading : "Education and training",
  PageLead    : "With dummy text you can view your website as it's supposed to look, without being distracted by familiar, readable text.",
  theme       : "dark"
})


const examplepages = [
    // {
    //   layout      : "contentpage",
	  //   content     : "main",
	  //   outfile     : "index.html",
	  //   PageHeading : "Register your vehicle or motorcycle",
	  //   PageLead    : "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
    //   viewdata: {
    //     cards:[
    //       {
    //           "title" : "An article title",
    //           "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //           "image": "https://picsum.photos/id/98/450/254",
    //           "alt": "A photo of wheat in a field lit by soft sunlight" 
    //       },
    //       {
    //           "title" : "A longer article title that wraps over two lines",
    //           "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //           "image": "https://picsum.photos/id/112/450/254",
    //           "alt": "A photo of wheat in a field lit by soft sunlight"
    //       },
    //       {
    //           "title" : "A topic headline",
    //           "description": "This is a supporting text below.",
    //           "image": "https://picsum.photos/id/139/450/254",
    //           "alt": "A photo of wheat in a field lit by soft sunlight" 
    //       }
    //     ]
    //   },
    // },
    {
      layout      : "contentpage",
      content     : "main",
	    outfile     : "index-dark.html",
	    PageHeading : "Register your vehicle or motorcycle",
	    PageLead    : "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
      theme       : "dark"
    },
    {
      layout      : "landingpage",
      content     : "landing-with-cards",
      outfile     : "landing.html",
      cards: [
          {
              "title" : "An article title",
              "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
              "image": "https://picsum.photos/id/98/450/254",
              "alt": "A photo of wheat in a field lit by soft sunlight" 
          },
          {
              "title" : "A longer article title that wraps over two lines",
              "description": "This is a wider card with supporting text below as a natural lead-in to additional content.",
              "image": "https://picsum.photos/id/112/450/254",
              "alt": "A photo of wheat in a field lit by soft sunlight"
          },
          {
              "title" : "A topic headline",
              "description": "This is a supporting text below.",
              "image": "https://picsum.photos/id/139/450/254",
              "alt": "A photo of wheat in a field lit by soft sunlight" 
          }
      ],
	    PageHeading : "Education and training",
	    PageLead    : "With dummy text you can view your website as it's supposed to look, without being distracted by familiar, readable text."
    }
];


// examplepages.map( ( obj ) => {
//   template.build(obj)
//   console.log( `./dist/${obj.outfile} built.`);
// });


console.log(`HTML template builds completed\n===============================\n`);
