import * as React from "react";
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
  renderHook<Result, Props>(
    hook: (initialProps: Props) => Result,
    options?: RenderOptions,
  ): RenderHookResult<Result, Props>;
}

export function createRenderer(): Renderer {
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
      return render(element, {
        ...options,
        renderOptions: {
          ...options.renderOptions,
          wrapper: createWrapper(options),
        },
      });
    },
    renderHook(hook, options = {}) {
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
