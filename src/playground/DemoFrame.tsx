import { ThemeProvider, BaseStyles } from '@primer/react';

function DemoFrame(props: any) {
  const { children, subtheme } = props;
  return (
    <ThemeProvider {...(subtheme ? { dayScheme: subtheme } : {})}>
      <BaseStyles>
        {children}
      </BaseStyles>
    </ThemeProvider>
  );
}

export default DemoFrame;
