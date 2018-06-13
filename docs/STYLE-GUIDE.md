# Style Guide

Apply the single responsibility principle (SRP) to all components, services, and other symbols. This helps make the app cleaner, easier to read and maintain, and more testable.

## Naming

Naming conventions are hugely important to maintainability and readability. This guide recommends naming conventions for the file name and the symbol name.

### General Naming Guidelines

Do use consistent names for all symbols.

Do follow a pattern that describes the symbol's feature then its type. The recommended pattern is `feature.type.ts`

**Why?** Naming conventions help provide a consistent way to find content at a glance. Consistency within the project is vital. Consistency with a team is important. Consistency across a company provides tremendous efficiency.

**Why?** The naming conventions should simply help find desired code faster and make it easier to understand.

**Why?** Names of folders and files should clearly convey their intent. For example, `app/heroes/hero-list.component.ts` may contain a component that manages a list of heroes.

### Separate file names with dots and dashes

Do **use dashes to separate words** in the descriptive name.

Do **use dots to separate the descriptive name** from the type.

Do use consistent type names for all components following a pattern that describes the component's feature then its type. A recommended pattern is feature.type.ts.

Do use conventional type names including:

* .service,
* .component,
* .module,
* .dux, // one file that contains all epics/actions/reducers/selectors -> you may creat `/dux` folder with all redux files per module
* .epics,
* .actions,
* .reducers,
* .selectors,
* .links,
* .routing,

Invent additional type names if you must but take care not to create too many.

**Why?** Type names provide a consistent way to quickly identify what is in the file.

**Why?** Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.

**Why?** Unabbreviated type names such as .service are descriptive and unambiguous. Abbreviations such as .srv, .svc, and .serv can be confusing.

**Why?** Type names provide pattern matching for any automated tasks.

### Symbols and file names

Do use consistent names for all assets named after what they represent.

Do use upper camel case for class names.

Do match the name of the symbol to the name of the file.

Do append the symbol name with the conventional if it makes sense suffix (such as Service) for a thing of that type.

Do give the filename the conventional suffix (such as .component.ts, .module.ts, .state.ts, or .service.ts) for a file of that type.

**Why?** Consistent conventions make it easy to quickly identify and reference assets of different types.

| Symbol Name                           | File Name                                   |
| ------------------------------------- | ------------------------------------------- |
| export class App { }                  | app.component.tsx / app.tsx                 |
| export class HeroList { }             | hero-list.component.tsx / hero-list.tsx     |
| export const HeroDetail = () => { }   | hero-detail.component.tsx / hero-detail.tsx |
| export class PersonProfileService { } | person-profile.service.ts                   |

### Unit test file names

Do name test specification files the same as the component they test.

Do name test specification files with a suffix of `.spec` or `.test` -> **be consistent! don't use both**

**Why?** Provides a consistent way to quickly identify tests.

### End-to-End (E2E) test file names

Do name end-to-end test specification files after the feature they test with a suffix of `.e2e-spec` or `e2e-test`. -> **be consistent! don't use both**

Do name test Page Object files with a suffix of `.po`

**Why?** Provides a consistent way to quickly identify end-to-end tests.

**Why?** Provides pattern matching for test runners and build automation.

**Example:**

```sh
heroes.po.ts

app.e2e-spec.ts
heroes.e2e-spec.ts
```

## Coding conventions

Most of coding conventions are sanitized/checked via prettier and tslint, following rules cannot be automated yet, so please follow them:

### Rule of One

Do define one thing, such as a service or component, per file.

Consider limiting files to `300 lines` of code.

**Why?** One component per file makes it far easier to read, maintain, and avoid collisions with teams in source control.

**Why?** One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.

**Why?** A single component can be the default export for its file which facilitates lazy loading with the router.

The key is to make the code more reusable, easier to read, and less mistake prone.

_As the app grows, this rule becomes even more important!_

### Classes

Do use classes only for services, components and models

**Why?** A class can act as an interface (use implements instead of extends) so this can be referenced further.

Never use prototypical class inheritance for extending Components (preffer composition over inheritance always !!!)

**Why?** It may look familiar to Java/.Net developer that `extends` in javascript doest the same as in other languages. That assumption is wrong. React uses functional approach and gives us better patterns for exentsibility.

* Use High Order Component ( to decorate existing one with added behaviour ) or Children Render Function Component

### Interfaces / Type aliases

Do name an interface using upper camel case.

Do use `type` for **Props/State**

```ts
type Props = {}
type State = {}

class App extends Component<Props,State> {
  ...
}
```

Do use `interface` for **Store state**. Otherwise interfaces are used rarely

```ts
// layout.reducers.ts

export interface State {
  showSidenav: boolean
}

const initialState: State = {
  showSidenav: false,
}

export function reducer(
  state: State = initialState,
  action: LayoutActions
): State { ... }
```

### Properties and methods

Do use lower camel case to name properties and methods.

Avoid prefixing private properties and methods with an underscore.

Never use `public` for defining class properties or methods, this is not `.NET` , all members are `public` by default!

**Why?** Follows conventional thinking for properties and methods.

**Why?** JavaScript lacks a true private property or method.

**Why?** TypeScript tooling makes it easy to identify private vs. public properties and methods.

### Import line spacing

Leave one empty line between third party imports/ custom `module/*` and application imports.

**Why?** The empty line separates your stuff from their stuff.

### Small functions

Do define small functions

Consider limiting to no more than `60 lines`.

**Why?** Small functions are easier to test, especially when they do one thing and serve one purpose.

**Why?** Small functions promote reuse.

**Why?** Small functions are easier to read.

**Why?** Small functions are easier to maintain.

**Why?** Small functions help avoid hidden bugs that come with large functions that share variables with external scope, create unwanted closures, or unwanted coupling with dependencies.

## Components

### Pure

// @TODO

### Connected to Store/DI

// @TODO

### HOC

// @TODO

### Children Function/Render prop

// @TODO

### Component Lifecycle hooks

Use Lifecycle hooks to tap into important events exposed by React.

Do use `componentDidMount()` for dispatch actions which may invoke initialization logic like XHR calls etc

## Redux

// @TODO

### Actions and Action Creators

// @TODO

### Reducers

// @TODO

### Selectors

// @TODO

## Epics

> based on [Victor Savkin's blog post about ngRx](https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5)

Epics have three roles:

* They decide on how to process actions
* They transform actions into other actions
* They perform side effects

It’s a good idea to keep these roles in mind when implementing epics. And, of course, it’s even better to express them in the code.

We have following building blocks used to implement application logic using epics and Redux-observable:

* Action Deciders
* Action Transformers

### Action Deciders

An action decider determines if an epic should process a particular action. A decider can also map an action to a different action.

These are the most common deciders:

* A filtering decider uses the action type to filter actions.
* A content-based decider uses the action payload to map an action to a different action.
* A context-based decider uses some injected object to map an action to another one.
* A splitter maps an action to an array of actions.
* A aggregator maps an array of actions to a single action.

#### Filtering Decider

The most basic decider we all familiar with is the filtering decider. It is so common that ReduxObservable comes with an operator implementing it: `ofType`.

```ts
const addTodoEpic: Epic<AllActions, State, Providers> = (actions$, _, { httpClient }) =>
  actions$.pipe(
    ofType('ADD_TOn DO'),
    switchMap(({ payload: todo }) => httpClient.post('...', todo)),
    map((todo) => ({ type: 'TODO_ADDED', payload: todo }))
  )
```

#### Content-Based Decider

A content-based decider uses the payload of an action to map it to a different action.

In the following example, we are mapping _ADD_TODO_ to ether _APPEND_TODO_ or _INSERT_TODO_, depending on the content of the payload.

```ts
const addTodoEpic: Epic<AllActions, State, Providers> = (actions$) =>
  actions$.pipe(
    ofType('ADD_TODO'),
    map(({ payload }) => {
      if (payload.addLast) {
        return { type: 'APPEND_TODO', payload }
      } else {
        return { type: 'INSERT_TODO', payload }
      }
    })
  )
```

By using content-based deciders we introduce another level of indirection, which can be useful for several reasons. For instance, it allows us to change how certain actions are handled and what data they need, without affecting the component dispatching them.

#### Context-Based Decider

A context-based decider uses some information from the environment to map an action to a different action. Using it allows us to have distinct workflows the component dispatching the action is not aware of.

```ts
const addTodoEpic: Epic<AllActions, State, Providers> = (actions$, _, { env }) =>
  actions$.pipe(
    typeOf('ADD_TODO'),
    map(({ payload }) => {
      if (env.confirmationIsOn) {
        return { type: 'ADD_TODO_WITH_CONFIRMATION', payload }
      } else {
        return { type: 'ADD_TODO_WITHOUT_CONFIRMATION', payload }
      }
    })
  )
```

#### Splitter

A splitter maps one action to an array of actions, i.e., it splits an action.

```ts
const addTodoEpic: Epic<AllActions, State, Providers> = (actions$, _, { env }) =>
  actions$.pipe(
    typeOf('REQUEST_ADD_TODO'),
    flatMap(({ payload }) => [
      { type: 'ADD_TODO', payload },
      { type: 'LOG_OPERATION', payload: { loggedAction: 'ADD_TODO', payload } },
    ])
  )
```

This is useful for exactly the same reasons as splitting a method into multiple methods: we can test, decorate, monitor every action independently.

#### Aggregator

An aggregator maps an array of actions to a single action.

```ts
const aggregator: Epic<AllActions, State, Providers> = (actions$) =>
  actions$.pipe(
    ofType(‘ADD_TODO’),
    flatMap((action) =>
      zip(
        // note how we use a correlation id to select the right action
        actions$.filter(a => a.type == 'TODO_ADDED' && a.payload.id === action.payload.id).first(),
        actions$.filter(a => a.type == 'LOGGED' && a.payload.id === action.payload.id).first()
      )
    ),
    map((pair) => ({
      type: 'ADD_TODO_COMPLETED',
      payload: {id: pair[0].payload.id, log: pair[1].payload}
    })
  )
```

Aggregator are not as common as say splitters, so RxJs does not come with an operator implementing it. That’s why we had to add some boilerplate to do it ourselves. But could always introduce a custom RxJS operator to help with that.

```ts
const aggregator = (actions$) =>
  actions$.pipe(
    ofType(‘ADD_TODO’),
    aggregate(['TODO_ADDED', 'OPERATION_ADDED'], (a, t) => t.payload.id === a.payload.id),
    map(pair => ({type: 'ADD_TODO_COMPLETED', payload: {id: pair[0].id}}))
  )
```

### Action Transformers

These are the most common deciders:

* Enricher
* Normalizer

#### Content Enricher

A content enricher adds some information to an action’s payload.

```ts
const addTodoEpic$: Epic<AllActions, State, Providers> = (actions$) =>
  actions$.pipe(
    ofType('ADD_TODO'),
    map((add) => ({
      action: 'ADD_TODO_BY_USER',
      payload: { ...add.payload, user: this.currentUser },
    }))
  )
```

This example is very basic: we merely add the already available current user to the payload. In a more interesting example we would fetch data from the backend and add it to the payload.

#### Normalizer & Canonical Actions

A normalizer maps a few similar actions to the same (canonical) action.

```ts
const insertTodoEpic: Epic<AllActions, State, Providers> = (actions$) =>
  actions$.pipe(
    ofType('INSERT_TODO'),
    map((insert) => ({
      action: 'ADD_TODO',
      payload: { ...insert.payload, append: false },
    }))
  )

const appendTodoEpic: Epic<AllActions, State, Providers> = (actions$) =>
  actions$.pipe(
    ofType('APPEND_TODO'),
    map((insert) => ({
      action: 'ADD_TODO',
      payload: { ...insert.payload, append: true },
    }))
  )
```

## Services

> Services are singletons !

Service is a class, that needs to be manually instantiated within a `*.module.ts` file + registered within `injector` to be available via `inject()` + or within epics.

Do use services as singletons within the same module. Use them for sharing data and functionality.

**Why?** Services are ideal for sharing methods across a feature area or an app.

**Why?** Services are ideal for sharing stateful in-memory data. -> **This is mostly false when redux is used**

```ts
export class HeroService {
  constructor(private httpClient: HttpClient) {}

  getHeroes(): Promise<Hero[]> {
    return this.httpClient.get<Array<Hero>>('heroes').then((response) => response.data)
  }

  getHero(id: number): Promise<Hero> {
    return this.httpClient.get(`heroes/${id}`).then((response) => response.data)
  }
  updatetHero(id: number, payload: Hero): Promise<Hero> {
    return this.httpClient.put(`heroes/${id}`, payload).then((response) => response.data)
  }
}
```

### Single responsibility

Do create services with a single responsibility that is encapsulated by its context.

Do create a new service once the service begins to exceed that singular purpose.

**Why?** When a service has multiple responsibilities, it becomes difficult to test.

**Why?** When a service has multiple responsibilities, every component or service that injects it now carries the weight of them all.

### Providing a service

Do provide services to the React/Reux-Observable injector at the top-most module where they will be shared.

**Why?** Our custom React injector is hierarchical. ReduxObservable is extendable singleton, but it's good practice to have it at top

**Why?** When providing the service to a top level module, that instance is shared and available to all child modules/components of that top level component.

**Why?** This is ideal when a service is sharing methods or state.

**Why?** This is not ideal when two different components need different instances of a service. In this scenario it would be better to provide the service at the module/component level that needs the new and separate instance.

```ts
// ./app/app.module.ts

import { Component } from 'react'

import { HeroService } from './heroes'

export const providers = {
  heroService: new HeroService(),
}
```

```ts
// ./index.ts
import React from 'react'
import { render } from 'react-dom'

import { providers } from './app/app.module'
import { App } from './app

render(
  <Provider injectables={providers}>
    <App/>
  </Providers>
)
```

```ts
// ./app/heroes/hero-list/hero-list.component.tsx
import React, { Component } from 'react';

import { inject } from 'modules/di'

import { Hero, HeroService } from '../shared'
import { Providers } from '../app.module'

type Props = {
  heroService: HeroService
}
type State = {
  heroes: Hero[]
}

export class HeroList extends Component<Props,Component> {

  state = {
    heroes = [];
  }

  render(){
    return <div>{JSON.stringify(this.state.heroes)}</div>
  }

  componentDidMount() {
    const { heroService } = this.props

    heroService.getHeroes().then(heroes => this.setState({heroes});
  }
}

export default const EnhancedHeroList = inject<Providers>(({heroService})=>({heroService}))(HeroList)
```

### Data Services

**Talk to the server through a service !!!**

Do refactor logic for making data operations and interacting with data to a service.

Do make data services responsible for XHR calls, local storage, stashing in memory, or any other data operations.

> **NOTE:** with redux, service methods are solely called from within epics provided by `redux-observable`

**Why?** The component's responsibility is for the presentation and gathering of information for the view. It should not care how it gets the data, just that it knows who to ask for it. Separating the data services moves the logic on how to get it to the data service, and lets the component be simpler and more focused on the view.

**Why?** This makes it easier to test (mock or real) the data calls when testing a component that uses a data service.

**Why?** The details of data management, such as headers, HTTP methods, caching, error handling, and retry logic, are irrelevant to components and other data consumers.

A data service encapsulates these details. It's easier to evolve these details inside the service without affecting its consumers. And it's easier to test the consumers with mock service implementations.

## Application structure

Have a near-term view of implementation and a long-term vision. Start small but keep in mind where the app is heading down the road.

All of the app's code goes in a folder named `src`. All feature areas are in their own folder, with their own `.module`/`index.ts` files if applicable.

To be more precise all application code is stored within `src/app/` folder

All content is one asset per file. Each component, service, redux stuff is in its own file.

All third party scripts/utils that are generic are stored within `src/modules/` folder and are **imported by absolute path** similar to all 3rd party modulse installed by npm.

`import { injector } from 'modules/di'

### LIFT

Do structure the app such that you can Locate code quickly, Identify the code at a glance, keep the Flattest structure you can, and Try to be DRY.

Do define the structure to follow these four basic guidelines, listed in order of importance.

**Why?** LIFT Provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly. To confirm your intuition about a particular structure, ask: can I quickly open and start work in all of the related files for this feature?

#### Locate

Do make locating code intuitive, simple and fast.

**Why?** To work efficiently you must be able to find files quickly, especially when you do not know (or do not remember) the file names. Keeping related files near each other in an intuitive location saves time. A descriptive folder structure makes a world of difference to you and the people who come after you.

#### Identify

Do name the file such that you instantly know what it contains and represents.

Do be descriptive with file names and keep the contents of the file to exactly one component.

Avoid files with multiple components, multiple services, or a mixture.

**Why?** Spend less time hunting and pecking for code, and become more efficient. Longer file names are far better than short-but-obscure abbreviated names.

#### Flat

Do keep a flat folder structure as long as possible.

Consider creating sub-folders when a folder reaches **7 or more files**.

> Consider configuring the IDE to hide distracting, irrelevant files such as generated .js and .js.map files.

**Why?** No one wants to search for a file through seven levels of folders. A flat structure is easy to scan.

> On the other hand, psychologists believe that humans start to struggle when the number of adjacent interesting things exceeds nine. So when a folder has ten or more files, it may be time to create subfolders.

Base your decision on your comfort level. Use a flatter structure until there is an obvious value to creating a new folder.

#### T-DRY (Try to be DRY)

Do be DRY (Don't Repeat Yourself).

Avoid being so DRY that you sacrifice readability.

**Why?** Being DRY is important, but not crucial if it sacrifices the other elements of LIFT. That's why it's called T-DRY. For example, it's redundant to name a component hero-view.component.tsx because with the .tsx extension, it may be obviously a component cause it uses JSX. But if something is not obvious or departs from a convention, then spell it out.

### Overall structural guidelines

Do start small but keep in mind where the app is heading down the road.

Do have a near term view of implementation and a long term vision.

Do put all of the app's code in a folder named src.

Consider creating a folder for a component when it has multiple accompanying files (.ts, .tsx, .css and .spec).

**Why?** Helps keep the app structure small and easy to maintain in the early stages, while being easy to evolve as the app grows.

**Why?** Components may have few files (e.g. _.tsx, _.css, _.ts, and _.spec.tsx, \*.spec.ts) and can clutter a folder quickly.

Here is a compliant folder and file structure:

```
<project root>
|- node_modules/
|- public/
|   |- index.html
|- src/
|   |- app/
|   |   |- core/
|   |   |   |- services/
|   |   |   |- components/
|   |   |   |- core.module.ts
|   |   |   |- index.ts
|   |   |- shared/
|   |   |   |- components/
|   |   |   |   |- text-filter.tsx
|   |   |   |- index.ts
|   |   |   |- utils.ts
|   |   |- heroes/
|   |   |   |- index.ts
|   |   |- villains/
|   |   |   |- index.ts
|   |   |   |- villain.tsx
|   |   |   |- villain-list.tsx
|   |   |   |- villains.tsx
|   |   |- app.tsx
|   |   |- app.css
|   |   |- app.spec.tsx
|   |   |- app.module.ts
|   |   |- index.ts
|   |- modules/
|   |   |- di/
|   |   |- react-ts-utils/
|   |- index.tsx
|   |- index.css
|   |- environment.ts
|   |- types.ts
|   |- globals.d.ts
|
|
|
```

### Folders-by-feature structure

Do create folders named for the feature area they represent.

**Why?** A developer can locate the code and identify what each file represents at a glance. The structure is as flat as it can be and there are no repetitive or redundant names.

**Why?** The LIFT guidelines are all covered.

**Why?** Helps reduce the app from becoming cluttered through organizing the content and keeping them aligned with the LIFT guidelines.

**Why?** When there are a lot of files, for example 10+, locating them is easier with a consistent folder structure and more difficult in a flat structure.

Do create an `feature.module.ts` with `index.ts` barrel file for each feature area.

**Why?** modules make it easy to lazy load routable features.

**Why?** modules make it easier to isolate, test, and re-use features.

### App root module

Do create an Module in the app's root folder, for example, in `/src/app`.

**Why?** app requires one root module which will contain all shareable instances + setup for creating store/middlewares etc

Consider naming the root module `app.module.ts`.

**Why?** Makes it easier to locate and identify the root module.

### Feature modules

Do create an Module for all distinct features in an application; for example, a Heroes feature.

Do place the feature module in the same named folder as the feature area; for example, in `app/heroes`.

Do name the feature module file reflecting the name of the feature area and folder; for example, `app/heroes/heroes.module.ts`.

**Why?** A feature module can expose or hide its implementation from other modules.

**Why?** A feature module identifies distinct sets of related components that comprise the feature area.

**Why?** A feature module can easily be routed to both eagerly and lazily.

**Why?** A feature module defines clear boundaries between specific functionality and other application features.

**Why?** A feature module helps clarify and make it easier to assign development responsibilities to different teams.

**Why?** A feature module can easily be isolated for testing.

### Shared feature module

Do create a feature module in a shared folder; for example, `app/shared/index.ts` + `app/shared/shared.module.ts` if it provides some service instances.

Do declare components, utils, pipes/fiters in a shared module when those items will be re-used and referenced by the components declared in other feature modules.

Avoid providing services in shared modules. Services are usually singletons that are provided once for the entire application or in a particular feature module.

Do export all symbols from the Shared Module that other feature modules need to use.

**Why?** Shared Module exists to make commonly used components, pipes/filters, utils available for use in components/epics/reducers in many other modules.

### Core feature module

Consider collecting numerous, auxiliary, single-use classes inside a core module to simplify the apparent structure of a feature module.

Importing Core Module into the root App Module reduces its complexity and emphasizes its role as orchestrator of the application as a whole.

Do create a feature module named CoreModule in a core folder (e.g. `app/core/core.module.ts` defines Core Module shareables).

Do put a singleton service whose instance will be shared throughout the application in the Core Module (e.g. ExceptionService and LoggerService).

**Why?** Core Module provides one or more singleton services class implementations. We register the providers with the app root injector by manually creating instances within app.module.ts, making a singleton instance of each service available to any component that needs them, whether that component is eagerly or lazily loaded.

Do gather application-wide, single use components in the Core Module. Import it once (in the App Module) when the app starts and never import it anywhere else. (e.g. NavComponent and SpinnerComponent).

**Why?** Real world apps can have several single-use components (e.g., spinners, message toasts, and modal dialogs) that appear only in the `app.tsx` . They are not imported elsewhere so they're not shared in that sense. Yet they're too big and messy to leave loose in the root folder.

> Avoid importing the CoreModule anywhere except in the App Module !

**Do export all symbols from the Core Module that the App Module will import and make available for other feature modules to use.**

**Why?** Core Module exists to make commonly used singleton services available for use in the many other modules.

**Why?** You want the entire app to use the one, singleton instance. You don't want each module to have its own separate instance of singleton services. Yet there is a real danger of that happening accidentally if the Core Module provides a service.

#### Prevent re-import of the core module

Only the root app.module should import core module exports and provide shareable instances to rest of the app tree if needed
