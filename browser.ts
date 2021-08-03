export type BrowserIdentifier = "chrome" | "firefox";

export interface LaunchOptions {
  url?: string;
  browser: BrowserIdentifier;
  browserPath?: string;
  browserArgs?: string[];
  headless?: boolean;
}

export interface BrowserProcess {
  close(): void;
}

export function launch(options: LaunchOptions): BrowserProcess {
  return Deno.run({
    cmd: [
      browserPath(options),
      ...browserArgs(options),
    ],
    stdout: "null",
    stderr: "null",
  });
}

function browserPath(options: LaunchOptions): string {
  switch (options.browser) {
    case "chrome":
      return chromePath(options);

    case "firefox":
      return firefoxPath(options);
  }
}

function browserArgs(options: LaunchOptions): string[] {
  switch (options.browser) {
    case "chrome":
      return chromeArgs(options);

    case "firefox":
      return firefoxArgs(options);
  }
}

function chromePath(options: LaunchOptions): string {
  if (options.browserPath) {
    return options.browserPath;
  }

  switch (Deno.build.os) {
    case "darwin":
      return "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome";

    case "linux":
      return "/usr/bin/google-chrome";

    case "windows":
      return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  }
}

function chromeArgs(options: LaunchOptions): string[] {
  const args = [];

  args.push(
    "--disable-features=TranslateUI",
    "--disable-extensions",
    "--disable-component-extensions-with-background-pages",
    "--disable-background-networking",
    "--disable-sync",
    "--metrics-recording-only",
    "--disable-default-apps",
    "--mute-audio",
    "--no-default-browser-check",
    "--no-first-run",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-background-timer-throttling",
    "--force-fieldtrials=*BackgroundTracing/default/",
  );

  if (options.headless) {
    args.push(
      "--headless",
      "--remote-debugging-port=9292",
    );
  }

  if (options.url) {
    args.push(options.url);
  }

  return args;
}

function firefoxPath(options: LaunchOptions): string {
  if (options.browserPath) {
    return options.browserPath;
  }

  switch (Deno.build.os) {
    case "darwin":
      return "/Applications/Firefox.app/Contents/MacOS/firefox";

    case "linux":
      return "/usr/bin/firefox";

    case "windows":
      return "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
  }
}

function firefoxArgs(options: LaunchOptions): string[] {
  const args = [];

  if (options.headless) {
    args.push(
      "--headless",
    );
  }

  if (options.url) {
    args.push(options.url);
  }

  return args;
}
