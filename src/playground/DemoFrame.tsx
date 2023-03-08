import { useState, useRef, useCallback, cloneElement } from "react";
import { ThemeProvider, BaseStyles } from '@primer/react';
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { create } from "jss";
import { jssPreset } from "@mui/styles";
import Frame from "react-frame-component";

/*
Adapted from https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/DemoSandboxed.js

The MIT License (MIT)

Copyright (c) 2014 Call-Em-All

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function DemoFrame(props: any) {
  const { children, classes, theme, ...other } = props;
  const [state, setState] = useState<any>({
    ready: false,
  });
  const instanceRef = useRef<any>();

  const handleRef = useCallback((ref: any) => {
    instanceRef.current = {
      contentDocument: ref ? ref.contentDocument : null,
      contentWindow: ref ? ref.contentWindow : null,
    };
  }, []);

  const onContentDidMount = () => {
    setState({
      ready: true,
      jss: create({
        plugins: jssPreset().plugins,
        insertionPoint: instanceRef.current.contentWindow["demo-frame-jss"],
      }),
      sheetsManager: new Map(),
      emotionCache: createCache({
        key: "css",
        prepend: true,
        container: instanceRef.current.contentWindow["demo-frame-jss"],
      }),
      container: instanceRef.current.contentDocument.body,
      window: () => instanceRef.current.contentWindow,
    });
  };
  let body = children;
  if (theme === "material-ui-5") {
    body = state.ready ? (
      <ThemeProvider>
        <BaseStyles>
          <CacheProvider value={state.emotionCache}>
            <CssBaseline />
              {cloneElement(children, {
                container: state.container,
                window: state.window,
              })}
          </CacheProvider>
        </BaseStyles>
      </ThemeProvider>
    ) : null;
  }
  if (theme === "primer") {
    body = state.ready ? (
      <ThemeProvider>
        <BaseStyles>
          {cloneElement(children, {
            container: state.container,
            window: state.window,
          })}
        </BaseStyles>
      </ThemeProvider>
    ) : null;
    console.log('---', theme, body);
  }
  return (
    <ThemeProvider>
      <BaseStyles>
          {children}
      </BaseStyles>
    </ThemeProvider>
  );
}

export default DemoFrame;
