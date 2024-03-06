import {GecutLogger} from '@gecut/logger';
import {cancelNextIdleCallback, nextIdleCallback} from '@gecut/utilities/wait/polyfill.js';
import {Router} from '@vaadin/router';

import type {IndexedParams, Params, Route, RouterLocation} from '@vaadin/router';

export class VaadinRouterHelper {
  /**
   * The constructor sets up routes for a TypeScript application, including a redirect to remove
   * trailing slashes from URLs.
   * @param {Array<Route>} routes - The `routes` parameter is an array of `Route` objects. Each `Route` object
   * represents a specific route in your application. It typically contains properties such as `path`,
   * `component`, and `exact`. These properties define the URL path, the component to render when the
   * route is matched,
   */
  constructor(routes: Route[]) {
    this.engine.setRoutes([
      // Redirect to URL without trailing slash
      {
        path: '(.*)/',
        action(context, commands) {
          const newPath = context.pathname.slice(0, -1);

          return commands.redirect(newPath);
        },
      },
      ...routes,
    ]);
  }

  /* The line `engine = new Router();` is creating a new instance of the `Router` class and assigning
  it to the `engine` property of the `VaadinRouterHelper` class. This `engine` object is responsible
  for handling the routing functionality in the application. It is used to set up routes, navigate
  to different routes, and manage the current location and parameters. */
  engine = new Router();

  private routerMoveDebounce: number | null = null;
  private logger = new GecutLogger('router');

  /**
   * The `link` function generates a URL for a given name and optional parameters, and logs the method
   * call and result. If the name is not found, it logs a warning and returns an empty string.
   * @param {string} name - The `name` parameter is a string that represents the name of the link. It
   * is used to identify the specific link that needs to be generated.
   * @param {Params} [params] - The `params` parameter is an optional object that contains additional
   * parameters to be included in the URL. It is used to provide dynamic values for placeholders in the
   * URL.
   * @return {string} a string.
   */
  link(name: string, params?: Params): string {
    try {
      const path = this.engine.urlForName(name, params);

      this.logger.methodFull?.('link', {name, params}, path);

      if (path.endsWith('/')) {
        return path.slice(0, -1);
      }

      return path;
    }
    catch (error) {
      this.logger.warning('link', `${name}-not-found`, `this name ('${name}') not have exists`, error);
    }

    return '';
  }

  /**
   * The `go` function in TypeScript is used to navigate to a specific path using the `Router.go`
   * method, with an optional debounce mechanism.
   * @param {string} name - A string representing the name of the route to navigate to.
   * @param {Params} [params] - The `params` parameter is an optional object that contains additional
   * parameters for constructing the URL path. It is of type `Params`.
   * @return {string} the value of the `path` variable.
   */
  go(name: string, params?: Params): string {
    const path = this.link(name, params);

    this.logger.methodArgs?.('go', {path});

    if (this.routerMoveDebounce != null) {
      cancelNextIdleCallback(this.routerMoveDebounce);
    }

    this.routerMoveDebounce = nextIdleCallback(() => Router.go(path));

    return path;
  }

  /**
   * The function sets the outlet element for the logger and engine if the outlet is not null and has a
   * role of 'main'.
   * @param {HTMLElement | null} _outlet - The `_outlet` parameter is of type `HTMLElement | null`.
   * This means it can accept either an `HTMLElement` object or `null` as its value.
   */
  set outlet(_outlet: HTMLElement | null) {
    if (_outlet != null && _outlet.role === 'main') {
      this.logger.methodArgs?.('outlet', {
        _outlet,
        isNode: _outlet instanceof Node,
      });

      this.engine.setOutlet(_outlet);

      this.engine.render(this.location.pathname, true);
    }
  }

  /**
   * The function returns the parameters from the location of the engine.
   * @return {IndexedParams} The `params` property of the `location` object of the `engine` object.
   */
  get params(): IndexedParams {
    return this.engine.location.params;
  }

  /**
   * The function returns the location of the engine.
   * @return {RouterLocation} The location of the engine.
   */
  get location(): RouterLocation {
    return this.engine.location;
  }
}
