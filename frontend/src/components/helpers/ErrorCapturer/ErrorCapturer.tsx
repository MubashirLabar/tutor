import React, { useState, FC } from "react";
import * as Sentry from "@sentry/browser";
// import StackTrace from 'stacktrace-js';

export const ErrorCapturer: FC = () => {
  const [eventId] = useState<string | undefined>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, max-params
  window.onerror = (
    event: Event | string,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ) => {
    // StackTrace.fromError(err).then(frames => {
    // 	err.stack = frames.map(frame => frame.toString()).join();

    // 	Sentry.withScope(scope => {
    // 		scope.setExtras({ event, src, line, col });
    // 		const errorId = Sentry.captureException(err);
    // 		setEventId(errorId);
    // 	});
    // });

    return false;
  };

  if (!eventId) {
    return null;
  }

  return (
    <button onClick={() => Sentry.showReportDialog({ eventId })}>
      Report Error
    </button>
  );
};
