import React, { Component, ErrorInfo } from "react";
import * as Sentry from "@sentry/react";
import Alert from "../../atoms/Alert/Alert";
import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { getLocalStorageToken } from "../../../services/token.service";

export interface IErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  eventId?: string;
}

export class ErrorBoundary<P extends Record<string, any>> extends Component<
  P,
  IErrorBoundaryState
> {
  constructor(props: P) {
    super(props);
    this.state = { hasError: false };
  }
  token = getLocalStorageToken();

  public static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: any, info: ErrorInfo) {
    // try {
    //   Sentry.withScope((scope: Sentry.Scope) => {
    //     const eventId = Sentry.captureException(error);
    //     scope.setExtra(`error id ${eventId}`, error);
    //   });
    // } catch (error) {
    //   console.log(`Something went wrong: ${error} (${info})`);
    // }
    // TODO: Add error reporting here
    // eslint-disable-next-line no-console
    console.log(`Something went wrong: ${error} (${info})`);
  }

  public render() {
    if (this.state.hasError) {
      if (this.token) {
        if (window.location.pathname.startsWith("/dashboard")) {
          return (
            <AuthLayout>
              <Alert message="Oops! Something Went Wrong" type="DANGER" />
            </AuthLayout>
          );
        }
      }
      return (
        <DefaultLayout>
          <Alert message="Oops! Something Went Wrong" type="DANGER" />
        </DefaultLayout>
      );
    }

    return this.props.children;
  }
}
