export interface BrowseOptions {
  url: string;
  browser: "chrome";
  browserPath?: string;
  browserArgs?: string[];
  headless: boolean;
}

export function browse(options: BrowseOptions): Deno.Process {
  const browserPath = options.browserPath ?? chromePath();
  const browserArgs = options.browserArgs ?? chromeArgs(options);

  return Deno.run({
    cmd: [
      browserPath,
      ...browserArgs,
    ],
    stdout: "null",
    stderr: "null",
  });
}

function chromePath(): string {
  switch (Deno.build.os) {
    case "darwin":
      return "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome";

    case "linux":
      return "/usr/bin/google-chrome";

    case "windows":
      return "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
  }
}

function chromeArgs(options: BrowseOptions): string[] {
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

  args.push(options.url);

  return args;
}
