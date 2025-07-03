# Angular/Nx Upgrade Process

1. [Find](https://www.npmjs.com/package/@nrwl/workspace?activeTab=versions) next major version of `@nrwl/workspace`
2. Run migrate command `npx nx migrate @nrwl/workspace@<version>` in the project folder
3. Review `package.json` changes for accuracy
4. Run `npm install` to install the newest libraries
5. Resolve `npm install` issues
6. Run migrations `npx nx migrate --run-migrations=migrations.json`
7. Delete successful tasks from `migrations.json` and debug failed tasks
8. Delete `migrations.json` after resolving all migrations
9. Review 3rd party library `CHANGELOG.md` to find compatible `npm` versions
10. Run `npm install` for 3rd party libraries and resolve issues
11. Test for errors in standard nx commands
    - `npx nx serve <app>`
    - `npx nx build <app>`
    - `npx nx test <app>`
    - `npx nx e2e <app>-e2e`
12. Manually regression test app features using `npx nx serve <app>
