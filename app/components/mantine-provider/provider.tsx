import React from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MantineProvider forceColorScheme="dark">
      <Notifications />
      {children}
    </MantineProvider>
  );
}

export default Provider;
