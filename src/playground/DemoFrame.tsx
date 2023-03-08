import { ThemeProvider, BaseStyles } from '@primer/react';

function DemoFrame(props: any) {
  const { children, classes, theme, ...other } = props;
  return (
    <ThemeProvider>
      <BaseStyles>
        {children}
      </BaseStyles>
    </ThemeProvider>
  );
}

export default DemoFrame;
