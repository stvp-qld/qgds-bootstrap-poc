/// DEV NOTE
/// This build file is used for the demo/POC template rendering only
/// Full templating system to be planned and implemented in the future

import fs from "fs";
import mustache from "mustache";

import QGDSTemplate from "./src/js/qgds-template.js";
import QGDSComponent from "./src/js/qgds-component.js";

//Build a static content page with some components
QGDSTemplate.make({
	
  layout: "contentpage",
	content: "main",
	outfile: "index.html",
	theme: "",

  PageHeading: "Register your vehicle or motorcycle",
	
  PageLead:
		"Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
	
  breadcrumbs: QGDSComponent.make("breadcrumbs"),
  
  components: {
		inpagenav: QGDSComponent.make("inpagenav"),
		accordion: QGDSComponent.make("accordion"),
		
    //4 different ways to load an alert
    alerts: {
      closure: QGDSComponent.make("alert"),
      receipt: QGDSComponent.make("alert", {
			  data: {
				  classes: "alert-success",
				  title: "Your transaction is complete",
          content: "<p>You're reference number is ATMR-1234-456. <a href='#'>Download a receipt</a></p>"
			  },
		  }),
      reminder: QGDSComponent.make("alert", {
			  datafile: "./src/components/alert/service-unavailable.json"
      }),
    },
		button: QGDSComponent.make("button"),
		card: QGDSComponent.make("card"),
		table: QGDSComponent.make("table"),
		blockquote: QGDSComponent.make("blockquote"),
		callout: QGDSComponent.make("callout", {
			data: {
				title: "This is a callout title",
				content: "This is a callout description",
        classes: "mb-5"
			},
		}),
		cardblock: QGDSComponent.make("cardblock", {
			path: "./src/components/card/cardblock.bs5.html",
			datafile: "./src/components/card/cardblock.data.json",
		}),
	},
});

console.log(
	`HTML template builds completed\n===============================\n`
);
