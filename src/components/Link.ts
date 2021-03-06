import { h } from "hyperapp";
import PreventDefault from "../actions/PreventDefault";
import navigate from "../effects/navigate";
import { PathInfo, State, ViewContext } from '../types';

interface LinkProps {
  href: string;
  [x: string]: any;
}

/**
 * Link component to import in user code.
 *
 * Handles navigation, preloading and
 * offers info about targeted paths.
 *
 */
const Link = ({ href, ...rest }: LinkProps, children) => ({
  state,
  options,
  getLocation,
  PreloadPage,
}: ViewContext) => {
  const location = getLocation(href);
  const { route, path } = location;
  const status = state.paths[path] ?? "iddle";
  const active = state.location.path === path;
  const navigateEventName = options.fastClicks ? "onmousedown" : "onclick";
  const renderChildren = (child) => {
    if (typeof child === "function") {
      const info: PathInfo = {
        ...location,
        status,
        active,
      };
      return child(info);
    }
    return child;
  };

  if (!route) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Invalid link pointing to ${href} will 404.`);
    }
    const DumbNavigate = (state: State, ev) => {
      ev.preventDefault();
      return [state, navigate(href)];
    };
    return h(
      "a",
      {
        href,
        onclick: PreventDefault,
        [navigateEventName]: DumbNavigate,
        "aria-current": active,
        ...rest,
      },
      renderChildren(children)
    );
  }

  // @ts-expect-error
  if (window.registerPath) {
    // @ts-expect-error
    window.registerPath(path);
  }

  const RequestNavigation = (state: State, ev) => {
    ev.preventDefault();
    const action = PreloadPage(state, href);
    if (Array.isArray(action)) {
      action.push(navigate(href));
      return action;
    }
    return [action, navigate(href)];
  };

  const PreloadPageHandler = (state: State, _ev) => {
    return PreloadPage(state, href);
  };

  return h(
    "a",
    {
      href,
      onclick: PreventDefault,
      [navigateEventName]: RequestNavigation,
      onmouseover: PreloadPageHandler,
      onfocus: PreloadPageHandler,
      "data-path": path,
      "data-status": status,
      "aria-current": active,
      ...rest,
    },
    renderChildren(children)
  );
};

export default Link;
