import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {
  renderHook as renderHookRTL,
  render as renderRTL,
  RenderOptions as RTLRenderOptions,
  RenderResult as RTLRenderResult,
  RenderHookResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface RenderConfiguration {
  renderOptions?: RTLRenderOptions;
  userEventOptions?: Parameters<typeof userEvent.setup>[0];
}

export type RenderOptions = Partial<RenderConfiguration>;

export interface RenderResult extends RTLRenderResult {
  user: ReturnType<typeof userEvent.setup>;
}

export interface RenderToStringResult {
  container: HTMLElement;
  hydrate(): RenderResult;
}

interface ProvidersProps {
  children: React.ReactNode;
}

// (e.g: React Query provider, Redux, IntlProvider, etc)
function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function render(
  element: React.ReactElement,
  options: RenderOptions = {},
): RenderResult {
  const { renderOptions, userEventOptions } = options;
  const { wrapper, ...localRenderOptions } = renderOptions ?? {};

  const testingLibraryRenderResult = renderRTL(element, {
    ...localRenderOptions,
    wrapper,
  });

  const result: RenderResult = {
    ...testingLibraryRenderResult,
    user: userEvent.setup(userEventOptions),
  };

  return result;
}

interface ServerRenderConfiguration extends RenderConfiguration {
  container: HTMLElement;
}
function renderToString(
  element: React.ReactElement,
  configuration: ServerRenderConfiguration,
): RenderToStringResult {
  const { container, renderOptions } = configuration;
  const { wrapper: Wrapper = React.Fragment, ...localRenderOptions } =
    renderOptions ?? {};

  container.innerHTML = ReactDOMServer.renderToString(
    <Wrapper>{element}</Wrapper>,
  );

  return {
    container,
    hydrate() {
      return render(element, {
        renderOptions: {
          ...localRenderOptions,
          hydrate: true,
        },
      });
    },
  };
}

function renderHook<Result, Props>(
  hook: (initialProps: Props) => Result,
  options: RenderOptions = {},
): RenderHookResult<Result, Props> {
  const { renderOptions } = options;
  const { wrapper, ...localRenderOptions } = renderOptions ?? {};

  return renderHookRTL(hook, {
    ...localRenderOptions,
    wrapper,
  });
}

interface Renderer {
  render(element: React.ReactElement, options?: RenderOptions): RenderResult;
  renderToString(
    element: React.ReactElement,
    options?: RenderOptions,
  ): RenderToStringResult;
  renderHook<Result, Props>(
    hook: (initialProps: Props) => Result,
    options?: RenderOptions,
  ): RenderHookResult<Result, Props>;
}

export function createRenderer(): Renderer {
  let prepared = false;
  let serverContainer: HTMLElement;

  beforeEach(() => {
    serverContainer = document.createElement("div");
    document.body.appendChild(serverContainer);

    prepared = true;
  });

  afterEach(() => {
    serverContainer.remove();
    serverContainer = null!;
  });

  function createWrapper(options: RenderOptions) {
    const { wrapper: InnerWrapper = React.Fragment } =
      options.renderOptions ?? {};

    return function Wrapper({ children }: { children?: React.ReactNode }) {
      return (
        <Providers>
          <InnerWrapper>{children}</InnerWrapper>
        </Providers>
      );
    };
  }

  return {
    render(element, options = {}) {
      if (!prepared) {
        throw new Error(
          "Unable to finish setup before `render()` was called. " +
            "This usually indicates that `render()` was called in a `before()` or `beforeEach` hook. " +
            "Move the call into each `it()`. Otherwise you cannot run a specific test and we cannot isolate each test.",
        );
      }

      return render(element, {
        ...options,
        renderOptions: {
          ...options.renderOptions,
          wrapper: createWrapper(options),
        },
      });
    },
    renderToString(element, options = {}) {
      if (!prepared) {
        throw new Error(
          "Unable to finish setup before `render()` was called. " +
            "This usually indicates that `render()` was called in a `before()` or `beforeEach` hook. " +
            "Move the call into each `it()`. Otherwise you cannot run a specific test and we cannot isolate each test.",
        );
      }

      return renderToString(element, {
        ...options,
        container: serverContainer,
        renderOptions: {
          ...options.renderOptions,
          wrapper: createWrapper(options),
        },
      });
    },
    renderHook(hook, options = {}) {
      if (!prepared) {
        throw new Error(
          "Unable to finish setup before `render()` was called. " +
            "This usually indicates that `render()` was called in a `before()` or `beforeEach` hook. " +
            "Move the call into each `it()`. Otherwise you cannot run a specific test and we cannot isolate each test.",
        );
      }

      return renderHook(hook, {
        ...options,
        renderOptions: {
          ...options.renderOptions,
          wrapper: createWrapper(options),
        },
      });
    },
  };
}
