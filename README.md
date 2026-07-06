# Firefly

This project represents way more than a decade's worth of work in collaboration with [David Beaton](https://github.com/davidbeaton). It started with a brainstorm when we both originally worked at [Paychex](https://www.paychex.com/) in Rochester New York. We had an idea for a better way to discover local activities and events. It started and stopped over the years, but we did create an LLC called Theory Network, and finally released the 1.0 prototype after many years of tech churn and feature refactoring.

Although it eventually was abandoned due to lack of resources, it was a huge learning experience for me. I was involved and led many aspects of the business including the Front End development, [Sketch](https://www.sketch.com/) design, [Firebase](https://firebase.google.com) database design and workflows, as well as the business administration of the company.

## Vision

The initial vision was to provide location based alerts for local events and activities which included using a combination of Geolocation and Bluetooth Beacons. The scale of what we were trying to accomplish at the time, led us to later reduce scope to providing traditional event discovery. We also were focused on adding subscriptions to local curated event lists. This feature is very similar to what X years later introduced with its' Lists feature.

As was mentioned, the ability to scale with limited cash and developer resources ultimately doomed the project. With modern AI tools at our disposal we might've been able to scale the company a bit easier, but we were probably a decade too early.

Later features included adding social features, adding back the geolocation and beacon location based alerting, 3D maps, and also an events reward system. The code base itself is the sign of the times. Ultimately many of the tech choices have been superceded by better technologies, but we dug deep into the frameworks that were available to us.

## Architecture

Probably the main thing I learned over the decade working on this was how to migrate and refactor code into new frameworks. There was so much exciting tech introduced at this time and it was hard not to want to try the newest thing. And although it taught me a lot, it probably was one of the main reasons the project ultimately failed and why we were unable to succeed. As Guy Kawasaki said famously, "real entreprenuers ship".

The project originally started as a native app for both Apple and Android where we hit some bottlenecks with our knowledge base. Later we found the [Cordova](https://cordova.apache.org/) framework for Hybrid web development which matched both of our skillsets better. Before there were any great mobile web frameworks, I built a pixel perfect iOS clone using standard [jQuery](https://jquery.com/).

Just as I was finishing the [jQuery](https://jquery.com/) POC, [AngularJS](https://angularjs.org/) was released. We quickly abandoned the [jQuery](https://jquery.com/) framework as soon Ionic released their first version of the [Ionic Framework](https://ionicframework.com/) for hybrid mobile development. We then continued to follow the [Ionic Framework] through all it's iterations, including its' migration to the current [Angular](https://angular.dev/) framework, and [Capacitor](https://capacitorjs.com/) which was their homegrown [Cordova](https://cordova.apache.org/) replacement.

On the data side we jumped into Google's [Firebase](https://firebase.google.com) platform which provided real time updates from their document database to our [Angular](https://angular.dev/) hybrid application. We also followed the migration over to [Firestore](https://firebase.google.com/docs/firestore) and [Firebase Cloud Functions](https://firebase.google.com/docs/functions) for database write triggers on the backend.

For the front end architecture we originally build the [Angular](https://angular.dev/) side with the CLI, until [Nrwl Nx](https://nx.dev/) released their new at the time Google style mono repo framework. On top of the core [Nx](https://nx.dev/) workspace and [Angular](https://angular.dev/) front end, we leverated [NGXS](https://www.ngxs.io/) for state management. And although we started with [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview) for our mapping framework, we eventually moved over to the [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/guides/) SDK.

Finally before we released our final and only iOS 1.0 prototype release, I build a small landing page for the app using [Angular](https://angular.dev/) and the [Tailwind](https://tailwindcss.com/) framework.

## Final State

Although [David Beaton](https://github.com/davidbeaton) later left the project, I continued to work on my 2.0 vision for the product which included the event Lists feature. The project is still runnable using the standard [Node](https://nodejs.org) tools, and was deployable to devices via the scripts available in `package.json`. Though I have removed all of the API keys and security files before making the repo public, so those will have to be replaced.

It sadly never reached the vision we originally had hoped for, but it does represent my skillset for adapting quickly to new technologies. If the business case was still valid, leveraging modern AI tooling would've made scaling this project much easier. As I mentioned, we were a decade too early.

## Demo

Before the 1.0 prototype release, I recorded a demo of the app which can be seen [here](https://www.youtube.com/watch?v=waRJzdoUkHg). Since there won't be any future development, this is probably the best way to see the start of our vision that was sadly never fulfilled.
