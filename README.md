## Website with audio and writing exercises for practicing Spanish and Portuguese languages

The link to use the app is https://dictadoespresso.netlify.app 

The webpage was designed using Angular, leveraging components for modular UI structure and services for shared logic and data management. 

### Components
Components encapsulate specific parts of the user interface, each with its own template, styles, and TypeScript logic.

In this webpage components were used for:
- navigation bar
- header top of the page
- aside
- footer
- display audio files
- capture user answer
- special character keyboard in each language
- display the feedback to the user
- show the performance board

### Services

The services manage cross-cutting issues such as the handling of the data obtained, promoting reuse and the separation of functions. 

In this webpage services were used for:

- choose the lyrics from the selected audio
- choose the correct verb conjugation for the selected tense and subject
- logic to compare user response with expected correct response
- save and prepare data for the performance board

### Pipes
In this project I use a custom Pipe with PipeTransform for filter and sum fields in the performance board. The integration was via template syntax (|) and data binding.

### Routing

This project uses standalone components with Angular Router, enabling modular, module-free routing.  All route configurations are defined in app.routes.ts . The RouterOutlet directive was imported directly in the app component, and navigation was handled using routerLink without requiring RouterModule in every component.