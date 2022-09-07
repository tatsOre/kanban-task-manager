# Welcome to Kanban task management web app

Hello! I am working on this app to put my front-end skills on fire!
I went for the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB) since I wanted to put extra attention to the web development process, architecture, and set up instead of graphic design and product ideas.

Throughout this project, I have been thinking and pretending to be a one-woman company and created a schedule of planning, implementation, review, introspection, and refactoring.

### Built with 💙 and:

- Semantic HTML5 markup
- CSS custom properties
- SASS
- React
- React Router
- UI development, testing, and documentation with Storybook

### Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes

### Expected Behaviour

- Boards
  - [x] Clicking different boards in the sidebar will change to the selected board.
  - [x] Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - [x] Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details can be changed.
  - [x] Columns are added and removed for the Add/Edit Board modals.
  - [x] Deleting a board deletes all columns and tasks and requires confirmation.
- Columns
  - [x] A board needs at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled.
  - [x] Clicking "Add New Column" opens the "Edit Board" modal where columns are added.
- Tasks
  - [x] Adding a new task adds it to the bottom of the relevant column.
  - [ ] Updating a task's status will move the task to the relevant column.
  - [ ] Deleting a task with all subtasks

### Continued development

- Transform every UI piece into common reusable UI components whenever possible
- Unit and integration testing with Jest and React Testing Library
- Allow users to drag and drop tasks to change their status and re-order them in a column
- Keep track of any changes with a backend service (`localStorage` and `sessionStorage` are being used in the meantime)
- Build features and tests for keyboard and screen reader to be fully accessible

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run storybook`

Start the component explorer on port 6006

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
